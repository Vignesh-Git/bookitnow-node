'use strict';

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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

const model = mongoose.model(process.env.SPORTS_COLLECTION_NAME, schema);

module.exports = model;