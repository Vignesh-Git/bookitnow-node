'use strict';

const mongoose = require("mongoose");
const daysEnum = require("../enums/days")
const amenitiesEnum = require("../enums/amenitis")


const priceSchema = {
    time_from : {
        type : Date,
        required : true
    },
    time_to : {
        type : Date,
        required : true
    },
    amount : {
        type : Number,
        required : true
    }
}

const openingHrsSchema = {
    from : {
        type : Date,
        required : true
    },
    to : {
        type : Date,
        required : true
    }
}

const venuesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    social_media : {
        type:{
            facebook : {
                type : String,
            },
            instagram : {
                type : String,
            },
            whatsapp : {
                type : String,
            },
            twitter : {
                type : String,
            }
        }
    },
    website : {
        type : String,
    },
    phone_numbers : {
        type : [String],
        required : true
    },
    is_featured: {
        type: Boolean,
        default : false
    },
    address : {
        type : {
            street_name : {
                type : String,
                required: true,
                trim: true,
            },
            city : {
                type : String,
                required: true,
                trim: true,
            },
            state : {
                type : String,
                required: true,
                trim: true,
            },
            country : {
                type : String,
                required: true,
                trim: true,
            },
            pincode : {
                type : String,
                required: true,
                trim: true,
            },
            geo_location : {
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
                }
            }
        }
    },
    hero_image : {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type: String,
        required: true,
        trim: true,
    },
    enabled : {
        type: Boolean,
        required: true,
        default:true
    },
    extra_images : {
        type: [String],
        required: true,
        trim: true,
    },
    amenities : {
        type: [String],
        enum : amenitiesEnum,
        required: true,
        trim: true,
    },
    available_days : {
        type:[String],
        enum : daysEnum,
        required: true,
    },
    courts : {
        type:[{
            court_id : {
                type:mongoose.SchemaTypes.ObjectId,
                required : true,
                ref: process.env.COURTS_COLLECTION_NAME
            },
            hero_image : {
                type: String,
                required: true,
                trim: true,
            },
            opening_hours : {
                type : {
                    monday : {
                        type : [openingHrsSchema],
                    },
                    tuesday : {
                        type : [openingHrsSchema],
                        
                    },
                    wednesday : {
                        type : [openingHrsSchema],
                        
                    },
                    thursday : {
                        type : [openingHrsSchema],
                        
                    },
                    friday : {
                        type : [openingHrsSchema],
                        
                    },
                    saturday : {
                        type : [openingHrsSchema],
                        
                    },
                    sunday : {
                        type : [openingHrsSchema],
                    },
                },
                required : true
            },
            price : {
                type : {
                    monday : {
                        type : [priceSchema],
                        
                    },
                    tuesday : {
                        type : [priceSchema],
                        
                    },
                    wednesday : {
                        type : [priceSchema],
                        
                    },
                    thursday : {
                        type : [priceSchema],
                        
                    },
                    friday : {
                        type : [priceSchema],
                        
                    },
                    saturday : {
                        type : [priceSchema],
                        
                    },
                    sunday : {
                        type : [priceSchema],
                        
                    },
                    
                },
                required : true
            },
            description : {
                type: String,
                required: true,
                trim: true,
            },
            enabled : {
                type: Boolean,
                required: true,
                default:true
            },
            policy : {
                type: String,
                required: true,
            },
            extra_images : {
                type: [String],
                required: true,
                trim: true,
            },
            number_of_courts : {
                type : Number,
                required: true,
            }
        }]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const venuesModel = mongoose.model(process.env.VENUES_COLLECTION_NAME, venuesSchema);

module.exports = venuesModel;