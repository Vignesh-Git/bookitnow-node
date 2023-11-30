'use strict'

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const modelHelpers = require("../utils/modelHelpers/bookingModelHelpers")
const { default: mongoose } = require("mongoose");

// need to implement API schema validation

app.post("/api/booking/add", async (req, res) => {
    try {
        res.send(await modelHelpers.create(req.body));
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/booking/get_all", async(req, res) => {
    try{
        res.send(await modelHelpers.fetchAll())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/booking/get_featured_venues", async(req, res) => {
    try{
        res.send(await modelHelpers.fetchAllFeaturedVenues())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.delete("/api/booking/:id", async (req, res) => {
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

app.put("/api/booking/:id", async (req, res) => {
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

app.get("/api/booking/:id", async(req, res) => {
    try{
        if(req.params.id){
            const _id = new mongoose.Types.ObjectId(req.params.id);
            res.send(await modelHelpers.fetchByFilter({_id}))
        } else {
            res.status(500).send("Venue ID is required")
        }
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/booking/get_by_user_id/:userId", async(req, res) => {
    try{
        if(req.params.userId){
            const user_id = new mongoose.Types.ObjectId(req.params.userId);
            res.send(await modelHelpers.fetchByFilter({user_id}))
        } else {
            res.status(500).send("Venue ID is required")
        }
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
    
})

module.exports = app