const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const cloudinary = require("cloudinary").v2;
const compression = require("compression");
const multer = require("multer");
const User = require("./user/UserModel");
const Fundraiser = require("./fundraiser/FundraiserModel");
const Donation = require("./donation/DonationModel");
const ContactUser = require("./contact-user/ContactUserModel");
const {
  createFundraiser,
  fetchFundraiser,
  fetchFundraiserCollectedAmount,
  fetchFundraiserTopDonation,
  fetchFundraiserMostRecentDonation,
  fetchFundraiserFirstDonation,
  fetchFundraiserTotalDonations,
  fetchMoneyReceivedByDate
} = require("./fundraiser/FundraiserService");
const {
  register,
  fetchUserTotalDonations,
  fetchUserTotalFundraisers,
  fetchUserTotalMoneySent,
  fetchUserTotalMoneyReceived
} = require("./user/UserService");
const fs = require("fs");
const helmet = require("helmet");
const {
  promisify
} = require("util");
const axios = require("axios");
const port = process.env.PORT || 5000;
const BASE_URL = process.env.CORS_ORIGIN_URL || "http://localhost:3000/";
const storage = multer.memoryStorage();
const upload = multer({
  storage
});
const writeFile = promisify(fs.writeFile);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH
} = process.env;
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log("Connected To Mongo");
});
const app = express();
app.use(express.json({
  limit: "50mb"
}));
app.use(cors({
  origin: BASE_URL,
  credentials: true
}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));

// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(compression());
// app.use(helmet());

//Routes

//auth

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
app.post("/api/user/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      email
    });

    // If user exists, return error
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
      name
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});
app.post("/api/user/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Find user by email
    const user = await User.findOne({
      email
    });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // User authenticated successfully
    // Generate a JWT token
    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    const resUser = {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: user.image
    };
    res.json({
      success: true,
      token,
      user: resUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.json({
      user
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({
      message: "An error occurred while retrieving user information"
    });
  }
});
app.patch("/api/user/image", authenticateToken, async (req, res) => {
  try {
    const {
      image
    } = req?.body;
    await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      image
    }, {
      new: true
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
});
app.patch("/api/user/email", authenticateToken, async (req, res) => {
  try {
    const {
      email
    } = req?.body;
    await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      email
    }, {
      new: true
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
});
app.patch("/api/user/info", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      phone
    } = req?.body;
    await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      name,
      phone
    }, {
      new: true
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
});
app.patch("/api/user/password", authenticateToken, async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirmation
    } = req?.body;
    const user = await User.findOne({
      _id: req.user._id
    });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch || newPassword != newPasswordConfirmation) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      password: hashedPassword
    }, {
      new: true
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
});
app.get("/api/received-messages", authenticateToken, async (req, res) => {
  try {
    const {
      page
    } = req.query;
    const pageNumber = parseInt(page);
    const [messages, count] = await Promise.all([ContactUser.find({
      recipientId: req.user._id
    }).skip((pageNumber - 1) * 10).limit(12).populate("senderId recipientId").sort({
      createdAt: -1,
      _id: -1
    }), ContactUser.find({
      recipientId: req.user._id
    }).count()]);
    res.status(200).json({
      success: true,
      messages,
      count: count
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false
    });
  }
});
app.patch("/api/user-message/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await ContactUser.findOneAndUpdate({
      _id: id
    }, {
      seen: true
    }, {
      new: true
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false
    });
  }
});
app.post("/api/user/password-reset", authenticateToken, async (req, res) => {
  const {
    email
  } = req.body;
  try {
    const oldUser = await User.findOne({
      email
    });
    if (!oldUser) {
      return res.status(404).json({
        status: "User Not Exists!!"
      });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({
      email: oldUser.email,
      id: oldUser._id
    }, secret, {
      expiresIn: "5m"
    });
    const link = `${BASE_URL}password-reset/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      secure: true,
      service: "gmail",
      auth: {
        user: "3aweni.tn@gmail.com",
        pass: "3awenitn123"
      }
    });
    var mailOptions = {
      from: "3aweni.tn@gmail.com",
      to: email,
      subject: "Password_Reset_3aweni",
      text: "Someone has requested a password reset for the following account:\n \n Site Name: 3aweni.tn\n \n Username: " + oldUser.name + "\n \n Click the link below to reset your password:\n" + link + "\n \nIf this was a mistake, just igonore this email and nothing will happen."
    };
    transporter.sendMail(mailOptions);
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
});
app.get("/password-reset/:id/:token", authenticateToken, async (req, res) => {
  const {
    id,
    token
  } = req.params;
  const oldUser = await User.findOne({
    _id: id
  });
  if (!oldUser) {
    return res.status(404).json({
      status: "User Not Exists!!"
    });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(404).json({
      email: verify.email,
      status: "Not Verified!!!!"
    });
  } catch (error) {
    res.send("Not Verified");
  }
});
app.post("/password-reset/:id/:token", authenticateToken, async (req, res) => {
  const {
    id,
    token
  } = req.params;
  const {
    password
  } = req.body;
  const oldUser = await User.findOne({
    _id: id
  });
  if (!oldUser) {
    return res.status(404).json({
      status: "User Not Exists!!"
    });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({
      _id: id
    }, {
      $set: {
        password: encryptedPassword
      }
    });
    res.render("index", {
      email: verify.email,
      status: "verified"
    });
  } catch (error) {
    res.json({
      status: "Something Went Wrong"
    });
  }
});
app.get("/api/user/fundraisers", authenticateToken, async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({
      user: req.user._id
    });
    const fundraisersWithAmount = await Promise.all(fundraisers.map(async fundraiser => {
      const collectedAmount = await fetchFundraiserCollectedAmount(fundraiser._id);
      const mostRecentDonation = await Donation.findOne({
        fundraiser: fundraiser._id
      }).sort({
        createdAt: -1,
        _id: -1
      }).select("createdAt");
      const lastDonationCreatedAt = mostRecentDonation ? mostRecentDonation.createdAt : null;
      return {
        ...fundraiser._doc,
        collectedAmount,
        lastDonationCreatedAt
      };
    }));
    res.status(200).json({
      success: true,
      fundraisers: fundraisersWithAmount
    });
  } catch (error) {}
});
app.get("/api/trending-fundraisers", async (req, res) => {
  try {
    const lastWeekStartDate = new Date();
    lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
    const trendingFundraisers = await Donation.aggregate([{
      $match: {
        createdAt: {
          $gte: lastWeekStartDate
        }
      }
    }, {
      $group: {
        _id: "$fundraiser",
        totalDonations: {
          $sum: 1
        }
      }
    }, {
      $lookup: {
        from: "fundraisers",
        localField: "_id",
        foreignField: "_id",
        as: "fundraiserData"
      }
    }, {
      $unwind: "$fundraiserData"
    }, {
      $sort: {
        totalDonations: -1,
        _id: -1
      }
    }, {
      $limit: 5
    }, {
      $project: {
        _id: "$fundraiserData._id",
        name: "$fundraiserData.name",
        image: "$fundraiserData.image",
        state: "$fundraiserData.state",
        title: "$fundraiserData.title"
        // Add other fields you want to include
      }
    }]);

    res.status(200).json({
      success: true,
      fundraisers: trendingFundraisers
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      error
    });
  }
});
app.post("/api/close-fundraisers", async (req, res) => {
  try {
    const {
      city
    } = req.body;
    if (city) {
      const fundraisers = await Fundraiser.aggregate([{
        $match: {
          state: city
        }
      }, {
        $sort: {
          createdAt: -1,
          _id: -1
        }
      }, {
        $limit: 5
      }, {
        $project: {
          _id: 1,
          image: 1,
          title: 1
        }
      }]);
      res.status(200).json({
        success: true,
        fundraisers
      });
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      error
    });
  }
});
app.post("/api/search", async (req, res) => {
  const {
    s,
    c,
    n,
    g,
    state
  } = req.body;
  try {
    const query = {};
    if (s) {
      const regex = new RegExp(s, "i");
      query.$or = [{
        title: regex
      }, {
        description: regex
      }, {
        _id: regex
      }, {
        category: regex
      }, {
        state: regex
      }];
    }
    if (c) {
      if (Array.isArray(c) && c.length > 0) {
        query.category = {
          $in: c
        };
      } else if (typeof c === "string") {
        query.category = c;
      }
    }
    if (n) {
      if (n === "1") {
        query.state = state;
      }
    }
    const fundraisers = await Fundraiser.aggregate([{
      $match: query
    }, {
      $lookup: {
        from: "donations",
        localField: "_id",
        foreignField: "fundraiser",
        as: "donations"
      }
    }, {
      $unwind: "$donations"
    }, {
      $group: {
        _id: "$_id",
        title: {
          $first: "$title"
        },
        image: {
          $first: "$image"
        },
        state: {
          $first: "$state"
        },
        goal: {
          $first: "$goal"
        },
        description: {
          $first: "$description"
        },
        collectedAmount: {
          $sum: "$donations.amount"
        },
        lastDonationCreatedAt: {
          $max: "$donations.createdAt"
        }
      }
    }, {
      $project: {
        _id: 0,
        _id: "$_id",
        title: 1,
        image: 1,
        state: 1,
        description: 1,
        goal: 1,
        collectedAmount: 1,
        lastDonationCreatedAt: 1,
        isCloseToGoal: {
          $lte: [{
            $subtract: ["$goal", 50]
          }, "$collectedAmount"]
        }
      }
    }]);
    if (g && g === "1") {
      let filteredFundraisers = fundraisers.filter(fundraiser => fundraiser.isCloseToGoal === true);
      filteredFundraisers.forEach(fundraiser => delete fundraiser.isCloseToGoal);
      res.json({
        success: true,
        fundraisers: filteredFundraisers
      });
    } else {
      res.json({
        success: true,
        fundraisers
      });
    }
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({
      error: "An error occurred while performing the search"
    });
  }
});

// cloudinary

app.post("/api/upload", async (req, res) => {
  try {
    const file = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      upload_preset: process.env.CLOUDINARY_PRESET_NAME
    });
    res.json({
      imagePublicId: uploadedResponse.public_id
    });
  } catch (error) {
    console.error(error);
  }
});
app.post("/api/upload-video", upload.single("video"), async (req, res) => {
  try {
    const {
      buffer
    } = req.file;
    await writeFile("video.mp4", buffer);
    const uploadedResponse = await cloudinary.uploader.upload("video.mp4", {
      resource_type: "video",
      eager_async: true,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
    });
    res.json({
      videoPublicId: uploadedResponse.public_id
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});
app.post("/api/delete-image", async (req, res) => {
  try {
    const {
      publicId
    } = req.body;
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (result) {
        res.status(204).json({
          success: true,
          data: result.result
        });
      } else {
        res.status(400).json({
          success: false
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

// fundraisers

app.post("/api/create-fundraiser/register", async (req, res) => {
  try {
    const {
      email,
      password,
      category,
      state,
      zipCode,
      type,
      title,
      goal,
      name,
      phone
    } = req?.body;
    const newUser = await register(email, password, name, phone);
    const newFundraiser = await createFundraiser(newUser._id, category, state, zipCode, type, title, goal);
    res.status(201).json({
      success: true,
      fundraiser: newFundraiser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
});
app.post("/api/create-fundraiser", authenticateToken, async (req, res) => {
  try {
    const {
      category,
      state,
      zipCode,
      type,
      title,
      goal
    } = req?.body;
    const newFundraiser = await createFundraiser(req.user._id, category, state, zipCode, type, title, goal);
    res.status(201).json({
      success: true,
      fundraiser: newFundraiser
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
});
app.get("/api/fundraiser/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const fundraiser = await fetchFundraiser(id);
    res.status(200).json({
      success: true,
      fundraiser: fundraiser
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/single-fundraiser/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const [fundraiser, collectedAmount, totalDonations, topDonation, mostRecentDonation, firstDonation] = await Promise.all([fetchFundraiser(id), fetchFundraiserCollectedAmount(id), fetchFundraiserTotalDonations(id), fetchFundraiserTopDonation(id), fetchFundraiserMostRecentDonation(id), fetchFundraiserFirstDonation(id)]);
    res.status(200).json({
      success: true,
      fundraiser,
      collectedAmount,
      totalDonations,
      topDonation,
      mostRecentDonation,
      firstDonation
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/fundraiser-donations/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      page
    } = req.query;
    const donations = await Donation.find({
      fundraiser: id
    }).skip(page * 10).limit(10).populate("user").sort({
      createdAt: -1,
      _id: -1
    });
    res.status(200).json({
      success: true,
      donations: donations
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/fundraiser-support/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      page
    } = req.query;
    const donations = await Donation.find({
      fundraiser: id,
      message: {
        $ne: ""
      },
      incognito: false
    }).skip(page * 10).limit(10).populate("user");
    res.status(200).json({
      success: true,
      donations: donations
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/sent-donations", authenticateToken, async (req, res) => {
  try {
    const {
      page
    } = req.query;
    const pageNumber = parseInt(page);
    const [donations, totalDocuments] = await Promise.all([Donation.find({
      user: req.user._id
    }).skip((pageNumber - 1) * 10).limit(10).populate({
      path: "fundraiser",
      populate: {
        path: "user",
        model: "User"
      }
    }).populate("user").sort({
      createdAt: -1,
      _id: -1
    }), Donation.find({
      user: req.user._id
    }).count()]);
    res.status(200).json({
      success: true,
      donations,
      count: totalDocuments
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/received-donations", authenticateToken, async (req, res) => {
  try {
    const {
      page
    } = req.query;
    const pageNumber = parseInt(page);
    const fundraisers = await Fundraiser.find({
      user: req.user._id
    }, "_id");
    const [donations, totalDocuments] = await Promise.all([Donation.aggregate([{
      $match: {
        fundraiser: {
          $in: fundraisers.map(fundraiser => fundraiser._id)
        }
      }
    }, {
      $lookup: {
        from: "fundraisers",
        localField: "fundraiser",
        foreignField: "_id",
        as: "fundraiser"
      }
    }, {
      $unwind: "$fundraiser"
    }, {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    }, {
      $unwind: "$user"
    }, {
      $addFields: {
        user: {
          $cond: {
            if: "$incognito",
            then: "$user",
            else: null
          }
        }
      }
    }, {
      $sort: {
        createdAt: -1,
        _id: -1
      }
    }, {
      $skip: (pageNumber - 1) * 10
    }, {
      $limit: 10
    }, {
      $project: {
        _id: 1,
        user: 1,
        fundraiser: 1,
        amount: 1,
        tip: 1,
        incognito: 1,
        message: 1,
        createdAt: 1
      }
    }]), Donation.aggregate([{
      $match: {
        fundraiser: {
          $in: fundraisers.map(fundraiser => fundraiser._id)
        }
      }
    }, {
      $lookup: {
        from: "fundraisers",
        localField: "fundraiser",
        foreignField: "_id",
        as: "fundraiser"
      }
    }, {
      $unwind: "$fundraiser"
    }, {
      $count: "totalDocuments"
    }])]);
    res.status(200).json({
      success: true,
      donations,
      count: totalDocuments[0].totalDocuments
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

//fundraisers by categorie

app.get("/api/fundraisers/category/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const fundraisers = await Fundraiser.find({
      category: id
    });
    const fundraisersWithAmount = await Promise.all(fundraisers.map(async fundraiser => {
      const collectedAmount = await fetchFundraiserCollectedAmount(fundraiser._id);
      const mostRecentDonation = await Donation.findOne({
        fundraiser: fundraiser._id
      }).sort({
        createdAt: -1,
        _id: -1
      }).select("createdAt");
      const lastDonationCreatedAt = mostRecentDonation ? mostRecentDonation.createdAt : null;
      return {
        ...fundraiser._doc,
        collectedAmount,
        lastDonationCreatedAt
      };
    }));
    res.status(200).json({
      success: true,
      fundraisers: fundraisersWithAmount
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.patch("/api/fundraiser/image/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      image
    } = req.body;
    const fundraiser = await Fundraiser.findOneAndUpdate({
      _id: id
    }, {
      image
    }, {
      new: true
    });
    res.status(204).json({
      success: true,
      fundraiser: fundraiser
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.patch("/api/fundraiser/secondary-images/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      secondaryImages
    } = req.body;
    const fundraiser = await Fundraiser.findOneAndUpdate({
      _id: id
    }, {
      secondaryImages
    }, {
      new: true
    });
    res.status(204).json({
      success: true,
      fundraiser: fundraiser
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.patch("/api/fundraiser/secondary-videos/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      secondaryVideos
    } = req.body;
    const fundraiser = await Fundraiser.findOneAndUpdate({
      _id: id
    }, {
      secondaryVideos
    }, {
      new: true
    });
    res.status(204).json({
      success: true,
      fundraiser: fundraiser
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.patch("/api/fundraiser/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      category,
      state,
      zipCode,
      title,
      type,
      goal,
      description
    } = req.body;
    const fundraiser = await Fundraiser.findOneAndUpdate({
      _id: id
    }, {
      category,
      state,
      zipCode,
      description,
      title,
      type,
      goal
    }, {
      new: true
    });
    res.status(204).json({
      success: true,
      fundraiser: fundraiser
    });
  } catch (error) {
    res.status(404).json({
      success: false
    });
  }
});
app.post("/api/konnect-gateway/:id", authenticateToken, async (req, res) => {
  try {
    const {
      amount,
      tip,
      incognito,
      message
    } = req.body;
    const {
      id
    } = req.params;
    const fund = await Fundraiser.findOne({
      _id: id
    });
    const paymentInfo = {
      receiverWalletId: "6466799e1874253b580aac46",
      token: "TND",
      amount: amount * 1000,
      type: "immediate",
      description: "donation for " + fund.title,
      lifespan: 20,
      feesIncluded: true,
      firstName: req.user._id,
      lastName: "",
      phoneNumber: req.user.phone,
      email: req.user.email,
      orderId: id,
      webhook: `${process.env.API_BASE_URL}/api/create-donation/${id}/${req.user._id}/${tip}/${incognito}/${message}`,
      silentWebhook: true,
      successUrl: `${BASE_URL}/fundraisers/${id}`,
      failUrl: `${BASE_URL}/donate/${id}`,
      checkoutForm: true,
      acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR", "flouci"]
    };
    const response = await axios.post("https://api.preprod.konnect.network/api/v2/payments/init-payment", JSON.stringify(paymentInfo), {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "6466799e1874253b580aac43:HBuk5KIy9Fy2JaEqII4mxyBG7Rx2INQb"
      }
    });
    res.status(200).json({
      success: true,
      response: response.data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error
    });
  }
});
app.get("/api/create-donation/:id/:userId/:tip/:incognito/:message", async (req, res) => {
  try {
    const {
      id,
      userId,
      tip,
      incognito,
      message
    } = req.params;
    const {
      payment_ref
    } = req.query;
    const response = await axios.get(`https://api.preprod.konnect.network/api/v2/payments/${payment_ref}`);
    const {
      data: {
        payment: {
          amount
        }
      }
    } = response;
    let donation = {
      user: userId,
      fundraiser: id,
      amount: amount / 1000
    };
    if (tip) donation = {
      ...donation,
      tip
    };
    if (incognito == "1") donation = {
      ...donation,
      incognito: true
    };
    if (message) donation = {
      ...donation,
      message
    };
    await Donation.create(donation);
    res.status(201).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error
    });
  }
});
app.get("/api/user-stats", authenticateToken, async (req, res) => {
  try {
    const thisWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const WeekThree = new Date(thisWeek - 7 * 24 * 60 * 60 * 1000);
    const WeekTwo = new Date(WeekThree - 7 * 24 * 60 * 60 * 1000);
    const WeekOne = new Date(WeekTwo - 7 * 24 * 60 * 60 * 1000);
    const WeekZero = new Date(WeekOne - 7 * 24 * 60 * 60 * 1000);
    const fundraisers = await Fundraiser.find({
      user: req.user._id
    }, "_id");
    const [last7, third7, second7, first7, before7, totalDonations, totalFundraisers, totalMoneySent, totalMoneyReceived, messages, lastFiveDonationsReceived] = await Promise.all([Fundraiser.aggregate([{
      $match: {
        user: mongoose.Types.ObjectId(req.user._id)
      }
    }, {
      $lookup: {
        from: "donations",
        let: {
          fundraiserId: "$_id"
        },
        pipeline: [{
          $match: {
            $expr: {
              $and: [{
                $eq: ["$fundraiser", "$$fundraiserId"]
              }, {
                $gte: ["$createdAt", thisWeek]
              }]
            }
          }
        }, {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount"
            }
          }
        }],
        as: "donations"
      }
    }, {
      $project: {
        totalAmount: {
          $arrayElemAt: ["$donations.totalAmount", 0]
        }
      }
    }, {
      $match: {
        totalAmount: {
          $ne: null,
          $ne: undefined
        }
      }
    }]), fetchMoneyReceivedByDate(WeekThree, thisWeek, req.user._id), fetchMoneyReceivedByDate(WeekTwo, WeekThree, req.user._id), fetchMoneyReceivedByDate(WeekOne, WeekTwo, req.user._id), fetchMoneyReceivedByDate(WeekZero, WeekOne, req.user._id), fetchUserTotalDonations(req.user._id), fetchUserTotalFundraisers(req.user._id), fetchUserTotalMoneySent(req.user._id), fetchUserTotalMoneyReceived(req.user._id), ContactUser.find({
      recipientId: req.user._id
    }).limit(5).populate("senderId recipientId"), Donation.aggregate([{
      $match: {
        fundraiser: {
          $in: fundraisers.map(fundraiser => fundraiser._id)
        }
      }
    }, {
      $lookup: {
        from: "fundraisers",
        localField: "fundraiser",
        foreignField: "_id",
        as: "fundraiser"
      }
    }, {
      $unwind: "$fundraiser"
    }, {
      $lookup: {
        from: "users",
        localField: "fundraiser.user",
        foreignField: "_id",
        as: "fundraiser.user"
      }
    }, {
      $unwind: "$fundraiser.user"
    }, {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    }, {
      $unwind: "$user"
    }, {
      $sort: {
        createdAt: -1,
        _id: -1
      }
    }, {
      $limit: 5
    }])]);
    res.status(200).json({
      success: true,
      data: [before7, first7, second7, third7, last7.length > 0 ? last7.map(donation => donation.totalAmount).reduce((sum, amount) => sum + amount, 0) : 0],
      totalDonations,
      totalFundraisers,
      totalMoneySent,
      totalMoneyReceived,
      messages,
      lastFiveDonationsReceived
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false
    });
  }
});
app.get("/api/unread-messages", authenticateToken, async (req, res) => {
  try {
    const number = await ContactUser.find({
      recipientId: req.user._id,
      seen: false
    }).count();
    res.status(200).json({
      success: true,
      number
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false
    });
  }
});

//Contact User

app.post("/api/contact-user", async (req, res) => {
  try {
    let contact;
    const {
      message,
      id,
      recipientId
    } = req.body;
    let user;
    if (recipientId) user = await User.findOne({
      _id: recipientId
    });
    if (user) {
      contact = {
        senderId: user._id,
        recipientId: id,
        name: user.name,
        email: user.email,
        message
      };
    } else {
      contact = {
        senderId: null,
        recipientId: id,
        name: req.body.name,
        email: req.body.email,
        message
      };
    }
    await ContactUser.create(contact);
    res.status(201).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
});

//socket IO
const http = require("http");
const {
  Server
} = require("socket.io");
const {
  resolve
} = require("path");
const server = http.createServer(app);
app.listen(port, () => {
  console.log("server is running on port", port);
});

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

//   io.on('connection', (socket) => {

//   console.log(`User Connected: ${socket.id}`);
//   sok=socket.id;
//   User.updateOne({ _id: req.user._id }, { socketId: socket.id }).exec();
//   socket.on('donate', (data) => {
//     const { user = req.user._id , fundraiser, amount } = data;

//     const donation = new Donation({
//       user,
//       fundraiser,
//       amount,
//     });
//     donation.save();

//     User.findOne({ _id: fundraiser.user._id }, (err, user) => {
//       if (!user) {
//         return;
//       }
//       const socketId = user.socketId;
//       io.to(socketId).emit('donation', { amount: amount });
//     });
//   });
// });