
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
const User=require('./userModel');
require( 'dotenv/config')
const LocalStrategy = require("passport-local").Strategy;


const app = express ();
const { MONGO_USER,MONGO_PASSWORD,MONGO_PATH } = process.env
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,{
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) throw err;
        console.log("Connected To Mongo")
      })




app.use(passport.initialize());
app.use(passport.session());
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: "https://localhost:3000",
  credentials : true
}))
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser())
// app.use(cookieParser("secretcode"))
passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"},( email, password, done ) => {
  User.findOne({ email }, (err ,user) => {
      
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

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user)  => {
      const userInformation = {
          id: user._id,
          email: user.email,
          phone: user.phone,
          name: user.name,
          // role: user.role,
          address: user.address
      }
      cb(err, userInformation)
  })
})


const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

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
      service: "gmail",
      auth: {
        user: 'achraf.bencheikhladhari@polytechnicien.tn',
        pass: 'Polyte2022',
      },
      });

    var mailOptions = {
      from: 'achraf.bencheikhladhari@polytechnicien.tn',
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
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(404).json({ email: verify.email, status: "Not Verified!!!!" });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});


//Routes

// Login Status 200 Done
app.post("/api/user/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({success: true, data: req.user})
        console.log(req.user);
      });
    }
  })(req, res, next);
});


//Register Status 200 Done
app.post('/api/user/register', async ( req, res ) => {

  const { email, password } = req?.body

  User.findOne({ email } , async (err,doc) => {
      if(err) throw err
      if(doc) res.status(400).send("User Already Exists")
      if(!doc) {
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new User({
              ...req?.body,
              password: hashedPassword,
          })
          await newUser.save()
          res.status(200).json({ success: true, data: newUser })
          console.log(req.body);
      }
  })
  
})

app.listen(process.env.PORT, () => {
  console.log('Server listening on port',process.env.PORT)})




















// const express = require("express")
// // import express, { Request,Response } from 'express'
// // import mongoose from 'mongoose'
// // import cors from 'cors'
// // import cookieParser from 'cookie-parser'
// // import session from 'express-session'
// require( 'dotenv/config')
// const mongoose = require('mongoose')
// // import bodyParser from 'body-parser';



//     const { MONGO_USER,MONGO_PASSWORD,MONGO_PATH } = process.env

//     mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,{
//         // useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       }, (err) => {
//         if (err) throw err;
//         console.log("Connected To Mongo")
//       })

//     //Middleware
//     const app = express()
//     app.use(express.json())
//     // app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
//     // app.use(session({
//     //     secret: "secretcode",
//     //     resave: true,
//     //     saveUninitialized: true
//     // }))
//     // app.use(cookieParser())
//     // app.use(bodyParser.json()); // support json encoded bodies
//     // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
//     // app.use(cors())
//     // app.use(express.json({ limit: '50mb' }))

//     app.post('/api/upload',
//     //  async ( req: Request, res: Response ) => {
//         // try {
//         //     const file: string = req.body.data
            
//         //     const uploadedResponse = await cloudinary.uploader.upload(file, { upload_preset: process.env.CLOUDINARY_PRESET_NAME })

//         //     res.json({ imagePublicId: uploadedResponse })
//         // } catch (error) {

//         //     console.error(error)
//         // }
//     // }
//     )


//     app.listen(process.env.PORT, () => {
//     console.log('Server listening on port',process.env.PORT)})
