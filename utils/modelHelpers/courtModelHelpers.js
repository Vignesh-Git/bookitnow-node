const { default: mongoose } = require("mongoose");
const model = require("../../models/court")

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