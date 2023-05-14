
const jwt=require("jsonwebtoken");
var nodemailer = require("nodemailer");
const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const passport=require("passport");
const cookieParser=require("cookie-parser");
const bcrypt=require("bcryptjs");
const session = require("express-session");
const bodyParser=require("body-parser");
const User = require('./user/UserModel');
const Fundraiser = require('./fundraiser/FundraiserModel');
require( 'dotenv/config')
const LocalStrategy = require("passport-local").Strategy;
var cloudinary = require('cloudinary').v2;
const { register } = require('./user/UserService')
const { createFundraiser } = require('./fundraiser/FundraiserService')
const compression = require('compression')


 
let userId;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


const { MONGO_USER,MONGO_PASSWORD,MONGO_PATH } = process.env
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,{
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Connected To Mongo")
})

const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(cors({
  origin: "https://localhost:3000",
  credentials : true
}))
app.use(cookieParser())
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(compression())


passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"},( email, password, done ) => {
  User.findOne({ email }, (err, user ) => {
      
      if(err) throw err
      if(!user) return done(null,false)
      bcrypt.compare(password, user.password, (err, result) => {
          if(err) throw err
          if(result === true) {
              return done(null,user)
          }else{
              return done(null,false)
          }
      })
  })
}))

passport.serializeUser(( user, cb ) => {
  cb(null, user._id)
})

passport.deserializeUser(( id, cb ) => {
  User.findOne({ _id: id }, ( err, user )  => {
      const userInformation = {
          _id: user._id,
          email: user.email,
          phone: user.phone,
          name: user.name,
          role: user.role,
          address: user.address,
          sokcetId:user.socketId
      }
      cb(err, userInformation)
  })
})


//Routes

//user

app.post("/api/user/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {return next(err)}
    if (!user) res.status(404).send("No User Exists");

    else {
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.status(200).json({ success: true, user: user })
        userId = req.user._id;
        userId= userId.toString();
      });
    }

  })(req, res, next);
});


app.post('/api/user/register', async ( req, res ) => {

  try {
    const { email, password, name, phone } = req?.body
    socketId=""
    const newUser = await register(email, password, name, phone, socketId)
    
    res.status(200).json({ success: true, user: newUser })
    
  } catch (error) {
    
    res.status(400).json({ success: false })
  }
  
})

  app.get('/api/user/logout', async ( req, res, done ) => {

    try {
      
      req.logout(done)
  
      res.status(204).json({ success: true })
      
    } catch (error) {
    
      res.status(400).json({ success: false })
    }

  })

  app.get('/api/user', ( req, res ) => {

    if(req.isAuthenticated())

    {
      res.status(200).json({success: true, user: req.user })
        userId = req.user._id;
        userId= userId.toString();
    }

    else{ 
      res.status(401).json({ success: false })}

})
app.post("/api/user/password-reset", async (req, res) => {

  const { email } = req.body;

  try {

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ status: "User Not Exists!!" });
    }

    const secret = JWT_SECRET + oldUser.password;

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });


    const link = `http://localhost:3000/password-reset/${oldUser._id}/${token}`;

    var transporter = nodemailer.createTransport(
      {
      secure:true,
      service: "gmail",
      auth: {
        user: '3aweni.tn@gmail.com',
        pass: '3awenitn123',
      },
      });

    var mailOptions = {
      from: '3aweni.tn@gmail.com',
      to: email,
      subject: 'Password_Reset_3aweni',
      text: "Someone has requested a password reset for the following account:\n \n Site Name: 3aweni.tn\n \n Username: "+oldUser.name+"\n \n Click the link below to reset your password:\n"+link+"\n \nIf this was a mistake, just igonore this email and nothing will happen.",
    };

    transporter.sendMail(mailOptions);
     
    
  } catch (error) {

      res.status(400).json({ success: false })

  }});

app.get("/password-reset/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(404).json({ email: verify.email, status: "Not Verified!!!!" });
  } catch (error) {
    
    res.send("Not Verified");
  }
});

app.post("/password-reset/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    
    res.json({ status: "Something Went Wrong" });
  }
});


app.get('/api/user/fundraisers', async (req, res) => {
  try {

    const fundraiser = await Fundraiser.find({ user: req.user._id })

    res.status(200).json({ success: true, fundraisers: fundraiser })

  } catch (error) {
    
  }
})

// cloudinary 

app.post('/api/upload', async ( req, res ) => {
  try {
      const file = req.body.data
      
      const uploadedResponse = await cloudinary.uploader.upload(file, { upload_preset: process.env.CLOUDINARY_PRESET_NAME })

      res.json({ imagePublicId: uploadedResponse })
  } catch (error) {

      console.error(error)
  }
})

app.post('/api/delete-image', async ( req, res ) => {
  try {
      const { publicId } = req.body
      
      cloudinary.uploader.destroy(publicId, function(error,result) {
          if(result){

              res.status(204).json({ success: true, data: result.result })

          }else{

              res.status(400).json({ success: false })
              
          }
          
          
              
      });
  } catch (error) {

      console.error(error)
  }
})

// fundraisers

app.post('/api/create-fundraiser/register', async (req, res) => {

  try {
    const { email, password, category, state, zipCode, type, title, goal, name, phone } = req?.body
  
    const newUser = await register(email, password, name, phone)
    
    const newFundraiser = await createFundraiser(newUser._id, category, state, zipCode, type, title, goal)
    
    res.status(201).json({ success: true, fundraiser: newFundraiser })
    
  } catch (error) {
    
    res.status(400).json({ success: false, error: error })
  }

})

app.post('/api/create-fundraiser/loggedin', async (req, res) => {

  try {
    const { category, state, zipCode, type, title, goal } = req?.body

    const newFundraiser = await createFundraiser(req.user._id, category, state, zipCode, type, title, goal)
    
    res.status(201).json({ success: true, fundraiser: newFundraiser })
    
  } catch (error) {
    
    res.status(400).json({ success: false })
  }

})


app.post('/api/create-fundraiser', async (req, res) => {

  try {
    const { category, state, zipCode, type, title, goal } = req?.body

    const newFundraiser = await createFundraiser(req?.user?._id, category, state, zipCode, type, title, goal)
    
    res.status(201).json({ success: true, fundraiser: newFundraiser })
    
  } catch (error) {
    
    res.status(400).json({ success: false })
  }

})

app.get('/api/fundraiser/:id', async (req, res) => {
  try {
    const { id } = req.params

    const fundraiser = await Fundraiser.findOne({ _id: id })

    res.status(200).json({ success: true, fundraiser: fundraiser })
  } catch (error) {
    
    res.status(404).json({ success: false })
  }
})

app.patch('/api/fundraiser/image/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { image } = req.body
    
    const fundraiser = await Fundraiser.findOneAndUpdate({ _id: id},{
      image
    },{
      new: true 
    })
    
    res.status(204).json({ success: true, fundraiser: fundraiser })
    
  } catch (error) {
    
    res.status(404).json({ success: false })
    
  }
})


app.patch('/api/fundraiser/secondary-images/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { secondaryImages } = req.body
    
    const fundraiser = await Fundraiser.findOneAndUpdate({ _id: id},{
      secondaryImages
    },{
      new: true 
    })

    console.log(fundraiser);
    
    res.status(204).json({ success: true, fundraiser: fundraiser })
    
  } catch (error) {
    
    res.status(404).json({ success: false })
    
  }
})

app.patch('/api/fundraiser/secondary-videos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { secondaryVideos } = req.body
    
    const fundraiser = await Fundraiser.findOneAndUpdate({ _id: id},{
      secondaryVideos
    },{
      new: true 
    })

    console.log(fundraiser);
    
    res.status(204).json({ success: true, fundraiser: fundraiser })
    
  } catch (error) {
    
    res.status(404).json({ success: false })
    
  }
})

app.patch('/api/fundraiser/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { category, state, zipCode, title, type, goal } = req.body
    
    const fundraiser = await Fundraiser.findOneAndUpdate({ _id: id},{
      category,
      state,
      zipCode,
      // description,
      title,
      type,
      goal
    },{
      new: true 
    })
    
    res.status(204).json({ success: true, fundraiser: fundraiser })

  } catch (error) {
    
    res.status(404).json({ success: false })
    
  }
})


app.get('/api/chart-fundraisers', async (req, res) => {

  try {

    const thisWeek = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
    const WeekThree = new Date((thisWeek - (7 * 24 * 60 * 60 * 1000)))
    const WeekTwo = new Date((WeekThree - (7 * 24 * 60 * 60 * 1000)))
    const WeekOne = new Date((WeekTwo - (7 * 24 * 60 * 60 * 1000)))
    const WeekZero = new Date((WeekOne - (7 * 24 * 60 * 60 * 1000)))

    Promise.all([
      Fundraiser.find({
        createdAt: 
        {
            $gte: thisWeek
        }
      }
      ).count(),
      Fundraiser.find({
        createdAt: 
        {
            $gte: WeekThree,
            $lt: thisWeek
        }
    }
    ).count(),
      Fundraiser.find({
        createdAt: 
        {
            $gte: WeekTwo,
            $lt: WeekThree
        }
    }
    ).count(),
    Fundraiser.find({
      createdAt: 
      {
          $gte: WeekOne,
          $lt: WeekTwo
      }
    }
    ).count(),
    Fundraiser.find({
      createdAt: 
      {
          $gte: WeekZero,
          $lt: WeekOne
      }
  }
  ).count(),
    ]).then( ([ last7, third7, second7, first7, before7 ]) => {
      res.status(200).json({ success: true, data: [before7, first7, second7, third7, last7] })
    });


  } catch (error) {
    
    res.status(404).json({ success: false })
  }
})





//socket IO
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const Donation = require('./donations/DonationModel');
server.listen(process.env.PORT, () => {
  console.log("server is running");
});

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

    io.on('connection', (socket) => {
      
    console.log(`User Connected: ${socket.id}`);
    sok=socket.id;
    User.updateOne({ _id: userId }, { socketId: socket.id }).exec();
    socket.on('donate', (data) => {
      const { senderId = userId , recipientId, amount } = data;
  
      const donation = new Donation({
        senderId: senderId,
        recipientId: recipientId,
        amount: amount,
      });
      donation.save();
  
      User.findOne({ _id: recipientId }, (err, user) => {
        if (!user) {
          return;
        }
        const socketId = user.socketId;
        io.to(socketId).emit('donation', { amount: amount });
      });
    });
  });