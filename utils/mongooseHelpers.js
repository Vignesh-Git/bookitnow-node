const mongoose = require("mongoose")

const helpers = {
    /**
     * 
     * @param {string} idInStr 
     * @returns Mongoose.ObjectId
     */
    getObjectIdFromString : (idInStr)=>{
        if (typeof(idInStr) == String && idInStr.length){
            return mongoose.Types.ObjectId(idInStr);
        } else {
            throw "ID param is not a valid string"
        }
        
    }
}

module.exports = helpers