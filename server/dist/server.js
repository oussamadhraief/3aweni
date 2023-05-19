const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv/config");
const LocalStrategy = require("passport-local").Strategy;
var cloudinary = require("cloudinary").v2;
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
  fetchFundraisersCreatedCountByDate
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
const axios = require('axios');
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
app.use(cookieParser());
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(helmet());
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (email, password, done) => {
  User.findOne({
    email
  }, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({
    _id: id
  }, (err, user) => {
    const userInformation = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      image: user.image,
      role: user.role,
      sokcetId: user.socketId
    };
    cb(err, userInformation);
  });
});

//Routes

app.get('/hello', (_, res) => {
  res.send('working...');
});

//user

app.post("/api/user/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) res.status(404).send("No User Exists");else {
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          success: true,
          user: user
        });
      });
    }
  })(req, res, next);
});
app.post("/api/user/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phone
    } = req?.body;
    const newUser = await register(email, password, name, phone, "");
    res.status(200).json({
      success: true,
      user: newUser
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
});
app.patch("/api/user/image", async (req, res) => {
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
app.get("/api/user/logout", async (req, res, done) => {
  try {
    req.logout(done);
    res.status(204).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
});
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false
    });
  }
});
app.get("/api/received-messages/:page", async (req, res) => {
  try {
    const {
      page
    } = req.params;
    const messages = await ContactUser.find({
      recipientId: req.user._id
    }).skip(page).limit(page * 10).populate("senderId recipientId");
    res.status(200).json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false
    });
  }
});
app.post("/api/user/password-reset", async (req, res) => {
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
app.get("/password-reset/:id/:token", async (req, res) => {
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
app.post("/password-reset/:id/:token", async (req, res) => {
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
app.get("/api/user/fundraisers", async (req, res) => {
  try {
    const fundraiser = await Fundraiser.find({
      user: req.user._id
    });
    res.status(200).json({
      success: true,
      fundraisers: fundraiser
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
        totalDonations: -1
      }
    }, {
      $limit: 5
    }, {
      $project: {
        _id: '$fundraiserData._id',
        name: '$fundraiserData.name',
        image: '$fundraiserData.image',
        state: '$fundraiserData.state',
        title: '$fundraiserData.title'
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
app.post("/api/create-fundraiser/loggedin", async (req, res) => {
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
app.post("/api/create-fundraiser", async (req, res) => {
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
app.get("/api/user-donations", async (req, res) => {
  try {
    const donations = await Donation.find({
      user: req.user._id
    }).limit(10).populate("fundraiser user");
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

//fundraisers by categorie

app.get("/api/fundraisers/category/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const fundraisers = await Fundraiser.find({
      category: id
    });
    res.status(200).json({
      success: true,
      fundraisers: fundraisers
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
app.post('/api/konnect-gateway/:id', async (req, res) => {
  try {
    const {
      donation
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
      amount: donation * 1000,
      type: "immediate",
      description: "donation for " + fund.title,
      lifespan: 10,
      feesIncluded: true,
      firstName: "Ammar",
      lastName: "Halloul",
      phoneNumber: "54827070",
      email: "ammarhalloul7@gmail.com",
      orderId: id,
      webhook: `${BASE_URL}api/create-donation/${id}`,
      silentWebhook: true,
      successUrl: `${BASE_URL}fundraisers/${id}`,
      failUrl: `${BASE_URL}donate/${id}`,
      checkoutForm: true,
      acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR", "flouci"]
    };
    const response = await axios.post("https://api.preprod.konnect.network/api/v2/payments/init-payment", JSON.stringify(paymentInfo), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '6466799e1874253b580aac43:HBuk5KIy9Fy2JaEqII4mxyBG7Rx2INQb'
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
app.get('/api/create-donation/:id', async (req, res) => {
  try {
    console.log(1);
    const {
      id
    } = req.params;
    const {
      payment_ref
    } = req.query.params;
    const response = await axios.get(`https://api.preprod.konnect.network/api/v2/payments/${payment_ref}`);
    const {
      data: {
        payment: {
          amount
        }
      }
    } = response;
    await Donation.create({
      user: req.user._id,
      fundraiser: id,
      amount
    });
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
app.get("/api/user-stats", async (req, res) => {
  try {
    const thisWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const WeekThree = new Date(thisWeek - 7 * 24 * 60 * 60 * 1000);
    const WeekTwo = new Date(WeekThree - 7 * 24 * 60 * 60 * 1000);
    const WeekOne = new Date(WeekTwo - 7 * 24 * 60 * 60 * 1000);
    const WeekZero = new Date(WeekOne - 7 * 24 * 60 * 60 * 1000);
    const [last7, third7, second7, first7, before7, totalDonations, totalFundraisers, totalMoneySent, totalMoneyReceived, messages] = await Promise.all([Fundraiser.find({
      createdAt: {
        $gte: thisWeek
      }
    }).count(), fetchFundraisersCreatedCountByDate(WeekThree, thisWeek), fetchFundraisersCreatedCountByDate(WeekTwo, WeekThree), fetchFundraisersCreatedCountByDate(WeekOne, WeekTwo), fetchFundraisersCreatedCountByDate(WeekZero, WeekOne), fetchUserTotalDonations(req.user._id), fetchUserTotalFundraisers(req.user._id), fetchUserTotalMoneySent(req.user._id), fetchUserTotalMoneyReceived(req.user._id), ContactUser.find({
      recipientId: req.user._id
    }).limit(5).populate("senderId recipientId")]);
    res.status(200).json({
      success: true,
      data: [before7, first7, second7, third7, last7],
      totalDonations,
      totalFundraisers,
      totalMoneySent,
      totalMoneyReceived,
      messages
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
      id
    } = req.body;
    if (req.isAuthenticated()) {
      contact = {
        senderId: req.user._id,
        recipientId: id,
        name: req.user.name,
        email: req.user.email,
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