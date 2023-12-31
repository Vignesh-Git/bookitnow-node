const model = require("../../models/booking")
const { default: mongoose } = require("mongoose");

const helpers = {

    create : async (data) => {
        const user = new model(data);
        return await user.save();
    },
   
    fetchAll : async () => {
        return await model.find({}).populate("venue_id").exec()
    },

   
    fetchByFilter : async (filterData) => {
        return await model.find(
            {
                ...filterData
            }).populate("venue_id").exec()
    },

    fetchByFilterWithoutPopulate : async (filterData) => {
        return await model.find(
            {
                ...filterData
            })
    },

    deleteDocumentById : async (id) => {
        const _id = new mongoose.Types.ObjectId(id);
        return await model.deleteOne({
            _id
        })
    },

    updateDocument : async (id, data) => {
        const _id = new mongoose.Types.ObjectId(id);
        return await model.updateOne({
            _id
        }, data)
    },

 
}

module.exports = helpers