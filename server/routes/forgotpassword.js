const express = require('express');
const router = express.Router();
// import model
const User = require('../models/user')
// .env
require('dotenv').config();
const crypto = require('crypto');
const BCRYPT_SALT_ROUNDS  = 12;
const {errorMessage , sucessMessage } = require('../helper/consoleMessage')

const nodemailer = require('nodemailer');
const {google} = require('googleapis') 


const oAuth2Client = new google.auth.OAuth2(
                            process.env.CLIENT_ID,
                            process.env.CLIENT_SECRET,
                            process.env.REDIRECT_URI
                    )

oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

router.post('/',(req,res)=>{
    const {email} = req.body;
    console.log(email)

    User.findOne({'email':email})
    .then(user =>{
        if(user === null){
            res.status(403).json({
                message : 'Email not in db',
                sucess : false
            })
        }else{
            const token = crypto.randomBytes(BCRYPT_SALT_ROUNDS).toString('hex');
            console.log(`token for ${user.name} is ${token}`);
            user.updateOne({
                    resetPasswordToken : token,
                    resetPasswordExpires : Date.now()+900000
                },(err,result)=>{
                    if(err){
                        console.log(`error in setting hash for ${user.name}`)
                    }else{
                    
                        console.log(`token  for ${email} set `)
                    }
                }
            )

            console.log(`user after getting token : ${user}`);
            
            const link = 'https://myprimeclone.netlify.app/resetpassword/'+`${token}`;
            
            async function sendMail(){
                try{
            
                    const accessToken = await oAuth2Client.getAccessToken();
                    
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type : 'OAuth2',
                            user: `${process.env.FEEDBACK_GMAIL}`,
                            clientId :  process.env.CLIENT_ID,
                            clientSecret : process.env.CLIENT_SECRET,
                            refreshToken : process.env.REFRESH_TOKEN,
                            accessToken : accessToken 
                        }
                    })
            
                    const mailOption = {
                        from: `${process.env.FEEDBACK_GMAIL}`,
                        to: `${user.email}`,//this is receivers email address
                        subject:'Regarding Password Reset For Prime Clone Account',
                        // text:emailmeassage,
                        html: `
                        <html>
                            <body style="
                                background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
                                width:100%;
                            ">
                                <div style="
                                    text-align: justify; 
                                    padding: .5rem;
                                    width: 80%;
                                    margin: auto;
                                    font-size: 1rem;
                                    font-family: Georgia, serif;
                                "
                                >   
                                <h1 style="text-align: center;">Prime Video Clone</h1>
                                <h3>Hi ${user.name}</h3>
                                <p>
                                    You are recently requested to reset your password for Prime video Click button below to reset it
                                </p>
                                <a 
                                    href=${link}
                                    target="_blank" 
                                    style="
                                        padding: 1rem;
                                        background:#033d98;
                                        color: #fff;
                                        font-weight:bold;
                                        text-decoration: none;
                                        text-align: center;
                                        margin: 3rem;
                                        display: inline-block;
                                        width: auto;
                                        border-radius: .5rem;
                                    "
                                >
                                Reset your password
                                </a>
                                <p>
                                    If you did not request password reset please ignore this email or replay to let us know . 
                                    This password reset is only valid for next 15 minutes
                                </p>
                                <p>
                                    Thanks, 
                                </p>
                                <p >Prime Video Clone Team</p>
                                <p>
                                    if you have any problem trouble clicking password reset button , copy and paste URL in your web browser
                                    ${link} 
                                </p>
                                </div>
                            </body>
                        </html>`
                    }
                    const result = await transporter.sendMail(mailOption)
                    return result;
            
            
                }
                catch(error){
                    return error;
                }
            }
            
            sendMail()
            .then((result)=>{
                console.log(JSON.stringify(result))
                res.send({
                    message : 'Email send sucessfully',
                    sucess : true
                })
            }).catch((err)=>{
                console.log(errorMessage('Error in sending mail',err))
                res.status(200).send({
                    message : 'Error in sending email',
                    sucess : false
                })
            })
        }
    })

})

module.exports = router