'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const schema = new mongoose.Schema({
    user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: process.env.USER_COLLECTION_NAME
    },
    venue_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: process.env.VENUES_COLLECTION_NAME
    },
    court_id : {
        type:[mongoose.SchemaTypes.ObjectId],
        required : true,
    },
    date: {
        type: Date,
        required : true,
    },
    start_time: {
        type: Date,
        required : true,
    },
    end_time: {
        type: Date,
        required : true,
    },
    status: {
        type: String,
        enum : ['pending', 'approved', 'rejected', 'expired', 'cancelled'],
        required : true,
        default : 'pending'
    },
    remarks: {
        type: String,
    },
    amount_paid : {
        type : Number,
        required : true,
    },
    createdOn : {
        type : Date,
        default : Date.now
    }

});

const model = mongoose.model(process.env.BOOKING_COLLECTION_NAME, schema);

module.exports = model;