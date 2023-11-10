const model = require("../../models/venues")

const helpers = {

    create : async (data) => {
        const user = new model(data);
        return await user.save();
    },
   
    fetchAll : async () => {
        return await model.find()
    },
   
    fetchByFilter : async (filterData) => {
        return await model.findOne(
            {
                ...filterData
            })
    },

    deleteDocument : async (filterData) => {
        return await model.deleteOne({
            ...filterData
        })
    }
}

module.exports = helpers