'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const bookingSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: process.env.USERS_COLLECTION_NAME
    },
    venue_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: process.env.VENUES_COLLECTION_NAME
    },
    court_id : {
        type:mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: process.env.OURTS_COLLECTION_NAME
    },
    date: {
        type: Date,
        required : true,
    },
    start_time: {
        type: Date,
        required : true,
    },
    duration: {
        type: String,
        required : true,
    },
    status: {
        type: String,
        enum : ['pending', 'approved', 'rejected'],
        required : true,
    },
    amount_paid : {
        type : Number,
        required : true,
    },
    no_of_courts : {
        type : Number,
        required : true,
    },
    createdOn : {
        type : Date,
        default : Date.now
    }

});

const bookingModel = mongoose.model(process.env.BOOKING_COLLECTION_NAME, bookingSchema);

module.exports = bookingModel;