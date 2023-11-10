'use strict'

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const venueModelHelpers = require("../utils/modelHelpers/venueModelHelpers")


app.post("/api/venue/add", async (req, res) => {
    try {
        res.send(await venueModelHelpers.create(req.body));
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/venue/get_all", async(req, res) => {
    res.send(await venueModelHelpers.fetchAll())
})

module.exports = app