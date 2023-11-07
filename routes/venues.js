'use strict'

const express = require("express");
const venuesModel = require("../models/venues");
const app = express();
const errorhandler = require("../utils/errorHandling")


app.post("/api/venue/add", async (req, res) => {
    try {
        // Creating user model
        const venue = new venuesModel(req.body)

        // Saving it 
        await venue.save();
        res.send(venue);
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

module.exports = app