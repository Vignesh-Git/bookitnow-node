const userModel = require("../../models/users")

const helpers = {
   
    fetchUserFilter : async (filterData) => {
        return await userModel.findOne(
            {
                ...filterData
            })
    },

    deleteDocument : async (filterData) => {
        return await userModel.deleteOne({
            ...filterData
        })
    }
}

module.exports = helpers