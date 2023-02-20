import express from "express";
import { UserController } from "../controllers/user.controller";
const emailRouter = express.Router();

// hvata sve na putanji /forgotPassword

var nodemailer = require('nodemailer');

emailRouter.route('/').post((req, res)=> {
    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'slavica2023@outlook.com',
            pass: 'Zapiaprojekat2023'!
        },
        logger: true  
    });

    var mailOptions = {
        from: 'slavica2023@outlook.com',
        to: req.body.email,
        subject: 'Your new temporary password for app!',
        text: 'YOUR NEW PASSWORD IS: ' + req.body.randomstring + " . It is valid next 30 minutes!"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    new UserController().forgotPassword(req, res); // postavlja u bazi novu sifru
}
);

export default emailRouter;