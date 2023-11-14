'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const userSchema = new mongoose.Schema({
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
    endTime: {
        type: Date,
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

const userModel = mongoose.model(process.env.USER_COLLECTION_NAME, userSchema);

module.exports = userModel;