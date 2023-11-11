'use strict';

const mongoose = require("mongoose");
const roleEnum = require("../enums/role")

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    geo_location: {
        type : {
            lat : {
                type : String,
                required: true,
                trim: true,
            },
            long : {
                type : String,
                required: true,
                trim: true,
            }
        },
    },
    
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const locationModel = mongoose.model(process.env.LOCATION_COLLECTION_NAME, locationSchema);

module.exports = locationModel;