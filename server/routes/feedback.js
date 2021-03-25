const express = require('express');
const router = express.Router();
require('dotenv').config();
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
    
    const {personcontact , message } = req.body

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
                to: `${process.env.FEEDBACK_GMAIL}`,//this is receivers email address
                subject:'Feedback for Prime project',
                // text:emailmeassage,
                html: `
                <html>
                    <body>
                        <div style="background: #2980B9;  /* fallback for old browsers */
                            background: -webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); 
                            background: linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); 
                            height: 50vh;
                            width: 80vw;
                            margin: auto;
                            padding: 1rem;
                        ">
                            <h2 style="text-align: center;padding-bottom: 1rem;">Feedback For Prime Video Clone</h2>
                            <p style="font-size:larger;">FROM : <strong>${personcontact}</strong></p>
                            <h2 style="font-weight: bolder;">Message</h2>
                            <p style="font-size: large;font-weight: bold;">${message}</p>
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
        // console.log(JSON.stringify(result))
        console.log(sucessMessage(`feedback from ${personcontact} sucessfully received`))
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
    
    
})
module.exports  = router;