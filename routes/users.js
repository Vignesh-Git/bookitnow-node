'use strict';

const express = require("express");
const app = express();
const errorhandler = require("../utils/errorHandling")
const modelHelpers = require("../utils/modelHelpers/userModelHelpers")
const APISchemas = require("../apiSchemaValidators/schemas")
const validateApiSchema = require("../apiSchemaValidators/validator")
const jwt = require('jsonwebtoken');

app.post("/api/user/signup",validateApiSchema(APISchemas.signupSchema), async (req, res) => {
    try {
        res.send(await modelHelpers.create(req.body));
    } catch (e) {
        errorhandler(e)
        res.status(500).send(e);
    }
})

app.post("/api/user/login", validateApiSchema(APISchemas.loginSchema), async (req, res)=>{
    try{

        let userObject = await modelHelpers.fetchByFilter({
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

        let userObject = await modelHelpers.fetchByFilter({
            email:req.body.email,
            password : req.body.password
        })
    
        if(userObject){
            await modelHelpers.deleteDocument({
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

app.get("/api/user/get_all", async(req, res) => {
    try{
        res.send(await modelHelpers.fetchAll())
    } catch(e){
        errorhandler(e)
        res.status(500).send(e);
    }
})



module.exports = app