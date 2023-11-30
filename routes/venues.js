'use strict'

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const modelHelpers = require("../utils/modelHelpers/venueModelHelpers")
const bookingModelHelpers = require("../utils/modelHelpers/bookingModelHelpers")
const { default: mongoose } = require("mongoose");
const daysIndex = require("../enums/daysIndex")

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
    try{
        res.send(await modelHelpers.fetchAll())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/venue/get_featured_venues", async(req, res) => {
    try{
        res.send(await modelHelpers.fetchAllFeaturedVenues())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.get("/api/venue/get_locations", async(req, res) => {
    try{
        res.send(await modelHelpers.getUniqueLocations())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
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

app.get("/api/venue/:id", async(req, res) => {
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

app.post("/api/venue/search_for_booking", async(req, res) => {
    try{

        
        let searchDate = new Date(req.body.date)
        searchDate = new Date(searchDate.getTime() - searchDate.getTimezoneOffset() * -60000 )
        // get all venues based on location, available days
        let filteredVenues = []
        filteredVenues = await modelHelpers.searchForBooking({
            ...req.body,
            selectedDay : daysIndex[searchDate.getDay()]
        });

        // remove extra courts from filtered venue
        filteredVenues = filteredVenues.map((oneVenue) => {
            let courts = oneVenue.courts.filter((oneCourt)=>oneCourt.sport_id == req.body.sport.id)
            oneVenue.courts = courts;
            return oneVenue;
        })   

        res.send(filteredVenues)
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/venue/get_available_timings", async (req, res) => {
    try{
        res.send(await modelHelpers.frameAvailableTimings(req.body.venueId, req.body.sportId, req.body.date))
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/venue/get_durations", async (req, res) => {
    try{
        res.send(await modelHelpers.frameDurations(req.body.venueId, req.body.sportId, req.body.date, req.body.start_time))
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/venue/get_live_availabilty", async (req, res) => {
    try{
        res.send(await modelHelpers.frameAvailableTimingsGroupByCourt(req.body.venueId, req.body.date))
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

module.exports = app