const express = require('express');
const router = express.Router();
const {errorMessage , warningMessage , sucessMessage } = require('../helper/consoleMessage')
require('dotenv').config();
const User = require('../models/user')
//below configuaration  email sending
const nodemailer=require('nodemailer');
const user = require('../models/user');
require('dotenv').config();
//for email sending end

router.post('/',(req,res)=>{
    
    const {personcontact , message } = req.body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.FEEDBACK_GMAIL}`,
            pass: `${process.env.GMAIL_PASS}` //Enter email password here 
        }
    })

    var mailOption = {
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
                    <h2 style="text-align: center;padding-bottom: 1rem;">Feedback For Prime Clone</h2>
                    <p style="font-size:larger;">FROM : <strong>${personcontact}</strong></p>
                    <h2 style="font-weight: bolder;">Message</h2>
                    <p style="font-size: large;font-weight: bold;">${message}</p>
                </div>
            </body>
        </html>`
    }


    transporter.sendMail(mailOption, function (err, data) {
        if (!err) {
            console.log(sucessMessage(`feedback from ${personcontact} sucessfully received`))

            res.send({
                message : 'Email send sucessfully',
                sucess : true
            })
        }
        else {
            console.log(errorMessage('Error in sending mail',err))
            res.status(200).send({
                message : 'Error in sending email',
                sucess : false
            })
        }
    })
})
module.exports  = router;