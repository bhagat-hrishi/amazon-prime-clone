const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')

const mongoose = require('mongoose');
// Importing order model
const User = require('../models/user')


const {errorMessage , warningMessage , sucessMessage } = require('../helper/consoleMessage')

router.post('/',(req,res)=>{
    const {email,password} = req.body;

    console.log(email,password);
    User.findOne({email:email})
    .then( user =>{
        if(!user){
            console.log(errorMessage(`User ${email} not found`))
            return res.status(404).json({
                message : 'User not found',
                sucess : false
            });
        
        }else{
            bcrypt.compare(password, user.password)
            .then(isMatched =>{
                    if(!isMatched){
                        console.log(warningMessage(`Password for user ${email} incorrect`))
                        res.status(400).json({
                            message : 'incorrect password',
                            sucess : false
                        })
                    }
                    else{
                        console.log(sucessMessage(`User ${email} login sucess`))
                        res.status(200).json({
                                message : 'Login sucess',
                                sucess : true,
                                createdUser  : {
                                    name : user.name ,
                                    _id : user._id
                                }
                        })
                    }
            });
        }
    })
    

})

module.exports  = router;