const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


const mongoose = require('mongoose');
// Importing order model
const User = require('../models/user')

const BCRYPT_SALT_ROUNDS  = 12;

const {errorMessage , warningMessage , sucessMessage } = require('../helper/consoleMessage')

router.post('/',(req,res)=>{
    const {name , email, password } = req.body;

    
    User.findOne({'email': email})
    .then(user =>{
        if(user){
            console.log(warningMessage(`${email} User allready exist`));
            res.json({
                message : 'User all ready exist',
                sucess : false
            })
        }else{
            
            const userToAdd = new User({
                _id : new mongoose.Types.ObjectId(),
                name : name,
                email : email,
                password : password,
                resetPasswordToken : '',
                resetPasswordExpires : '',
                watchlist :{
                    movie:[],
                    tv:[]
                }
            })

            bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function(err, salt){
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err){
                        console.log(errorMessage('Error to generate hash'));
                        res.json({
                            message : 'error to generate hash',
                            sucess : false
                        })
                    }else{
                        // Store hash in your password DB.
                        userToAdd.password = hash;
                        userToAdd.save().
                        then(result =>{
                            console.log(sucessMessage(`${result.name} user saved to db`));
                            res.status(201).json({
                                message : 'User saved succesfully',
                                sucess : true,
                                createdUser  : {
                                    name : result.name ,
                                    _id : result._id
                                }
                            }) 
                        })//then end
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error : 'Error to save to DB',
                                sucess : false
                            })
                            console.log(errorMessage(`Error to save user ${email} to DB \n error : ${err}`))
                        }) //catch end
                    }
                    
                });
            }); //bcrypt end
        }//else end
    })
    

    


})
module.exports  = router;