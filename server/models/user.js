const mongoose = require('mongoose')

// define schema
const userSchema = mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId,
    name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpires :{
        type : String
    },
    movieWatchList : [{
            mediaId : {
                type : String
            },
            imgUrl : {
                type : String
            }
    }],
    tvWatchList: [{
            mediaId : {
                type : String
            },
            imgUrl : {
                type : String
            }
    }] 
    
    
})

module.exports = mongoose.model('User'/*model name*/,userSchema/*schema */)