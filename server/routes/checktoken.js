const express = require('express');
const router = express.Router();
const {errorMessage , warningMessage , sucessMessage } = require('../helper/consoleMessage')
const User = require('../models/user')

require('dotenv').config();

// nodemailer
const nodemailer = require('nodemailer')
// crypto for generting unique hash (https://nodejs.org/api/crypto.html#crypto_crypto)
const crypto = require('crypto');
const { use } = require('./updatepassword');




// to check if token is valid or not
router.get('/',(req,res)=>{
    console.log('checktoken',req.query);
    User.findOne(
        { "resetPasswordToken" : req.query.resetPasswordToken,
         "resetPasswordExpires" :
                                {
                                    $gt:Date.now()
                                }
        })
        .then((user)=>{
            if(user==null){
                console.log(warningMessage('password reset link is invalid or expired'));
                res.json({
                    sucess : false,
                    message : 'password reset link is invalid or expired'
                })
            }else{
                console.log(sucessMessage(`token found ${user.resetPasswordToken} for user ${user.name}`));
                res.status(200).json({
                    sucess : true,
                    user : user.name,
                    message : 'password reset link a-ok'
                })
            }
            
        })  
})


module.exports = router;