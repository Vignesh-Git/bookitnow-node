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

app.get("/api/venue/get_featured_venues", async(req, res) => {
    res.send(await modelHelpers.fetchAllFeaturedVenues())
})

app.delete("/api/venue/:id", async (req, res) => {
    try {
        if(req.params.id){
            res.send(await modelHelpers.deleteDocumentById(req.params.id));
        } else {
            res.status(500).send("Venue ID is required")
        }
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.put("/api/venue/:id", async (req, res) => {
    try {
        if(req.params.id){
            res.send(await modelHelpers.updateDocument(req.params.id, req.body));
        } else {
            res.status(500).send("Venue ID is required")
        }
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/court/:id", async(req, res) => {
    if(req.params.id){
        const _id = new mongoose.Types.ObjectId(req.params.id);
        res.send(await modelHelpers.fetchByFilter({_id}))
    } else {
        res.status(500).send("Venue ID is required")
    }
    
})

module.exports = app