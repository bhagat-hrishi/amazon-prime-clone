const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// local file
const consoleMessage = require('./helper/consoleMessage')

const checktokenRoutes = require('./routes/checktoken');
const feedbackRoutes = require('./routes/feedback');
const forgotpasswordRoutes = require('./routes/forgotpassword')
const signInRoutes  = require('./routes/signin');
const signUpRoutes = require('./routes/signup');
const updatepasswordRoutes = require('./routes/updatepassword')
const watchlistRoutes = require('./routes/watchlist')
const userRoutesHandler = require('./routes/users')


//middlewares
app.use(bodyParser.json());

// app.use(cors({ origin: 'https://myprimeclone.netlify.app/' }));//this will allow request from any port number or domain

// to handle cors error 
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
  


// connection with db  
let port = process.env.PORT ||  3709;

const DB_URL = process.env.DB_URL;


mongoose.connect(
    DB_URL,
    {useNewUrlParser:true , useUnifiedTopology: true } 
).then((result)=>{
    // we listen on port only when connection to Db done
    
    app.listen(port ,()=>{
        console.log(consoleMessage.sucessMessage(`Connected do DB \nServer Started at port: ${port}`))
    })
}).catch((error)=>{
    console.log(consoleMessage.errorMessage(`Error in DB conneciton ${error}`))
})



  
app.use('/signin',signInRoutes);
app.use('/signup',signUpRoutes);
app.use('/forgotpassword',forgotpasswordRoutes);
app.use('/checktoken',checktokenRoutes)
app.use('/updatepassword',updatepasswordRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/watchlist',watchlistRoutes);
app.use('/users',userRoutesHandler);




app.use('/',(req,res)=>{
  res.send(`<h1>BackEnd for prime clone (No route matched)</h1>`)
})



