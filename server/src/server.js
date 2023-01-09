const express = require("express")
// import express, { Request,Response } from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import session from 'express-session'
require( 'dotenv/config')
const mongoose = require('mongoose')
// import bodyParser from 'body-parser';



    const { MONGO_USER,MONGO_PASSWORD,MONGO_PATH } = process.env

    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,{
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) throw err;
        console.log("Connected To Mongo")
      })

    //Middleware
    const app = express()
    app.use(express.json())
    // app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
    // app.use(session({
    //     secret: "secretcode",
    //     resave: true,
    //     saveUninitialized: true
    // }))
    // app.use(cookieParser())
    // app.use(bodyParser.json()); // support json encoded bodies
    // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    // app.use(cors())
    // app.use(express.json({ limit: '50mb' }))

    app.post('/api/upload',
    //  async ( req: Request, res: Response ) => {
        // try {
        //     const file: string = req.body.data
            
        //     const uploadedResponse = await cloudinary.uploader.upload(file, { upload_preset: process.env.CLOUDINARY_PRESET_NAME })

        //     res.json({ imagePublicId: uploadedResponse })
        // } catch (error) {

        //     console.error(error)
        // }
    // }
    )


    app.listen(process.env.PORT, () => {
    console.log('Server listening on port',process.env.PORT)})
