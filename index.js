'use strict';

require('dotenv').config(); //.env config
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require("./config/db") // importing DB connection script
const errorHandler = require("./utils/errorHandling")

const corsOptions = {
    "origin": "*", // All domains
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

app.use(cors(corsOptions))
app.use(express.json()) // body parser

// Assigning All routes
const routes = require("./routes")
app.use(routes)

// Connecting to DB
connectDB((err)=>{
    if(err){
        // If not connected, end the process
        errorHandler(err)
        process.exit(1);
    }

    // If connection is success, start listening
    app.listen(process.env.PORT_NAME, ()=>{
        console.log(`${process.env.APP_NAME} Version ${process.env.APP_VERSION} is up and running in Port ${process.env.PORT_NAME}`)
    })
})

