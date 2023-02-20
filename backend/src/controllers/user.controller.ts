import * as express from 'express';
import User from '../models/user';
import Comment from '../models/comment';
import { base64_to_image, image_to_base64 } from '../images';

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({
            'username': username, 'password': password,
            $or: [{ 'valid_pass': 0 }, { 'valid_pass': { $gt: (Math.floor(Date.now() / 1000) - 1800) } }]
        }, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.query.username;

        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUserByMail = (req: express.Request, res: express.Response) => {
        let email = req.query.email;

        User.findOne({ 'email': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUserImage = (req: express.Request, res: express.Response) => {
        let username = req.query.username;

        res.json({"image": "data:image/png;base64," + image_to_base64(username)}); // kad rucno unosimo
        //res.json({"image": image_to_base64(username)});
    }

    register = (req: express.Request, res: express.Response) => {

        User.findOne({ 'email': req.body.email }, (err, user) => {
            if (user) res.status(200).json({ 'message': 'email exist' });
            else {
                User.findOne({ 'username': req.body.username }, (err, user) => {
                    if (user) res.status(200).json({ 'message': 'user exist' });
                    else {
                        let newUser = new User({
                            firstname: req.body.firstname, lastname: req.body.lastname,
                            username: req.body.username, password: req.body.password, contact: req.body.contact, email: req.body.email,
                            valid_pass: 0, type: req.body.type, status: req.body.status,
                            org_adress: req.body.org_adress, org_name: req.body.org_name, org_number: req.body.org_number
                        });
                        
                        // let newUser = new User(req.body); //spaja polja ako se sva isto zovu

                        newUser.save().then(user => {
                            res.status(200).json({ 'message': 'user added' });
                            if (req.body.icon != "") base64_to_image(req.body.icon, req.body.username);
                        }).catch(err => {
                            res.status(400).json({ 'message': 'error' })
                        });
                    }
                })
            }
        })
    }

    // moze i admin da poziva
    update = (req: express.Request, res: express.Response) => {
        // ne moze da menja username jer bi moralo svuda da se menja

        User.findOneAndUpdate({'username': req.body.username},
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contact: req.body.contact,
            email: req.body.email
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
        if(req.body.icon) {
            base64_to_image(req.body.username, req.body.icon)
        }
    }

    forgotPassword = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let tempPass = req.body.randomstring;

        // valid_pass 30 min
        User.findOneAndUpdate({ 'email': email }, { $set: { 'password': tempPass, 'valid_pass': Math.floor(Date.now() / 1000) + 1800 } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" })
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newPassword = req.body.newPassword;

        User.findOneAndUpdate({ 'username': username }, { $set: { 'password': newPassword, 'valid_pass': 0 } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    // actions

    getAllLikesForUser = (req: express.Request, res: express.Response)=>{
        User.find({'username': req.body.username}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users.likes)
        })
    }

    getAllCommentsForUser = (req: express.Request, res: express.Response)=>{
        Comment.find({'user': req.body.user}, (err, comments)=>{
            if(err) console.log(err)
            else res.json(comments)
        })
    }

}