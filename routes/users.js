'use strict';

const express = require("express");
const userModel = require("../models/users");
const app = express();
const errorhandler = require("../utils/errorHandling")
const userModelHelpers = require("../utils/modelHelpers/userModelHelpers")
const APISchemas = require("../apiSchemaValidators/schemas")
const validateApiSchema = require("../apiSchemaValidators/validator")
const jwt = require('jsonwebtoken');

app.post("/api/user/signup",validateApiSchema(APISchemas.signupSchema), async (req, res) => {
    try {
        // Creating user model
        const user = new userModel(req.body)

        // Saving it 
        await user.save();
        res.send(user);
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/user/login", validateApiSchema(APISchemas.loginSchema), async (req, res)=>{
    try{

        let userObject = await userModelHelpers.fetchUserFilter({
            email:req.body.email
        })
    
        if(userObject){
            if(userObject.password == req.body.password){
                // generating token
                let payLoad = {
                    id : userObject._id,
                    email : userObject.email,
                    role : userObject.role
                }
                const token = jwt.sign(payLoad, process.env.SECRET_KEY, { expiresIn: '1d' });
                res.send({
                    isLoggedIn : true,
                    token : token
                })
            } else {
                res.status(500).send("Invalid Password");
            }
        } else {
            res.status(500).send("Invalid email");
        }

    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/user/deleteAccount", validateApiSchema(APISchemas.deleteAccountSchema), async (req, res)=>{
    try{

        let userObject = await userModelHelpers.fetchUserFilter({
            email:req.body.email,
            password : req.body.password
        })
    
        if(userObject){
            await userModelHelpers.deleteDocument({
                email:req.body.email,
                password : req.body.password
            })
            res.send("success")
        } else {
            res.status(500).send("Invalid email");
        }

    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})



module.exports = app