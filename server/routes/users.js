
const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/',(req,res)=>{
    User.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
        res.send({
            message : 'error in getting all users'
        })
    })
})

module.exports = router;