'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const userSchema = new mongoose.Schema({
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

const userModel = mongoose.model(process.env.USER_COLLECTION_NAME, userSchema);

module.exports = userModel;