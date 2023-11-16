const model = require("../../models/venues")
const { default: mongoose } = require("mongoose");

const helpers = {

    create : async (data) => {
        const user = new model(data);
        return await user.save();
    },
   
    fetchAll : async () => {
        return await model.find().populate('courts.court_id').exec()
    },

    fetchAllFeaturedVenues : async () => {
        return await model.find({is_featured : true, enabled : true}).populate('courts.court_id').exec()
    },
   
    fetchByFilter : async (filterData) => {
        return await model.findOne(
            {
                enabled : true,
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
    }
}

module.exports = helpers