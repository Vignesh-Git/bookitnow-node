'use strict';

const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send(`${process.env.APP_NAME} Version 19 is running in Port ${process.env.PORT_NAME}`)
})

module.exports = app