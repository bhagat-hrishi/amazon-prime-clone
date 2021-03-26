// express
const express = require('express');
const router = express.Router();
// import model
const User = require('../models/user')
// .env
require('dotenv').config();
// nodemailer
const nodemailer = require('nodemailer')
// crypto for generting unique hash (https://nodejs.org/api/crypto.html#crypto_crypto)
const crypto = require('crypto');

const bcrypt = require('bcrypt');
const { fail } = require('assert');

const BCRYPT_SALT_ROUNDS  = 12;

// to update password of user after checking wheather token is valid or not
router.put('/',(req,res)=>{
    
    const {name,newpassword } = req.body;
    User.findOne({
            "name": name
    }).then(user =>{
        if(user!=null){
            console.log(`${name} exist db and updating password`);
            bcrypt.hash(newpassword,BCRYPT_SALT_ROUNDS)
            .then(hashedPasswrod =>{
                user.updateOne({
                    'password' : hashedPasswrod,
                    'resetPasswordToken' : null,
                    'resetPasswordExpires' : null
                }).then((result)=>{
                    console.log(JSON.stringify(result));
                    console.log(`password of ${name} is updated `);
                    res.status(200).json({
                        sucess : true,
                        message : 'password updated'
                    })
                }).catch((err)=>{
                    res.json({
                        sucess:false,
                        message :'error in update'
                    })
                })
            })
            .catch((err)=>{
                res.json({
                    sucess:false,
                    message :'no user exist in db to update'
                })
            })
            
        }else{
            console.log('no user exist in db to upadte');
            res.status(404).json({
                sucess : false,
                message : 'no user exist in db to update'
            })
        }
    })

    // res.json({
    //     sucess : false,
    //     message : 'nothing matched'
    // })
})

module.exports = router;