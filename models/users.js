'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim: true,
    },
    role : {
        type: String,
        required: true,
        enum: roleEnum,
        trim: true,
        default : "customer"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model(process.env.USER_COLLECTION_NAME, schema);

module.exports = model;