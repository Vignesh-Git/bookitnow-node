'use strict'

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const modelHelpers = require("../utils/modelHelpers/sportModelHelpers")
const APISchemas = require("../apiSchemaValidators/schemas")
const validateApiSchema = require("../apiSchemaValidators/validator");
const { default: mongoose } = require("mongoose");


app.post("/api/sport/add", validateApiSchema(APISchemas.addSportSchema), async (req, res) => {
    try {
        res.send(await modelHelpers.create(req.body));
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.delete("/api/sport/:id", async (req, res) => {
    try {
        if(req.params.id){
            res.send(await modelHelpers.deleteDocumentById(req.params.id));
        } else {
            res.status(500).send("Sport ID is required")
        }
        
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/sport/get_all", async(req, res) => {
    try{
        res.send(await modelHelpers.fetchAll())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/sport/:id", async(req, res) => {
    try{
        if(req.params.id){
            const _id = new mongoose.Types.ObjectId(req.params.id);
            res.send(await modelHelpers.fetchByFilter({_id}))
        } else {
            res.status(500).send("Sport ID is required")
        }
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
    
})

app.put("/api/sport/:id", async (req, res) => {
    try {
        if(req.params.id){
            res.send(await modelHelpers.updateDocument(req.params.id, req.body));
        } else {
            res.status(500).send("Sport ID is required")
        }
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

module.exports = app