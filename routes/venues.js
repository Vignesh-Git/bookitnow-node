'use strict'

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const modelHelpers = require("../utils/modelHelpers/venueModelHelpers")

// need to implement API schema validation

app.post("/api/venue/add", async (req, res) => {
    try {
        res.send(await modelHelpers.create(req.body));
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/venue/get_all", async(req, res) => {
    res.send(await modelHelpers.fetchAll())
})

module.exports = app