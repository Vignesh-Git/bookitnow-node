const Joi = require('joi');
const roleEnums = require("../enums/role")


const signupSchema = Joi.object({
    email : Joi.string().required().email(),
    password : Joi.string().required(),
    role : Joi.string().valid(...Object.values(roleEnums)),
})

const loginSchema = Joi.object({
    email : Joi.string().required().email(),
    password : Joi.string().required(),
})

const deleteAccountSchema = Joi.object({
    email : Joi.string().required().email(),
    password : Joi.string().required(),
})

const addCourtSchema = Joi.object({
    name : Joi.string().required(),
    hero_image : Joi.string().required(),
})



module.exports = {
    signupSchema,
    loginSchema,
    deleteAccountSchema,
    addCourtSchema
}