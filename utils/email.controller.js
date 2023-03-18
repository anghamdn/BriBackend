const {resetPassword,confirmationEmail} = require("./email.service")
const express = require('express')
const router = express.Router()



module.exports = {
    ResetPassword : (req,res)=>{
        const body = req.body
        console.log(body)
        resetPassword (body.email,"reset password","heyy you")
        const characters= "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOQPRSTUVWXYZ"
        let activateCode = "";
        for (let i = 0; i < 10; i++) {
            activateCode += characters[Math.floor(Math.random() * characters.length)]
            
        }
        console.log(activateCode)
    },
    resetPassword : (req,res)=>{
        const body = req.body
        console.log(body)
        resetPassword(body,(err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                data : results
            })
        });
    },
    confirmationEmail : (req,res)=>{
        const body = req.body
        console.log(body)
        confirmationEmail(body,(err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                data : results
            })
        });
    }
}