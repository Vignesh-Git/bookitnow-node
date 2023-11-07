'use strict';

const mongoose = require("mongoose");

/**
 * 
 * @param {method} callback 
 */
const connectDB = async (callback) => {
    try {
        console.log("Creating connection with MongoDB...")
        const conn = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        callback()
    } catch (error) {
        callback(error.message);
    }
}

module.exports = connectDB

