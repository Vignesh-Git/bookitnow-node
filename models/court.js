'use strict';

const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    hero_image: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    allowed_players : {
        type : Number,
        required : true,
    },
    
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const courtModel = mongoose.model(process.env.COURTS_COLLECTION_NAME, courtSchema);

module.exports = courtModel;