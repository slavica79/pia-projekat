import * as express from 'express';
import User from '../models/user';
import Studio from '../models/studio';
import { base64_to_image, delete_folder } from '../images';

export class AdminController {
    
    // admin login sa posebne stranice
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({
            'username': username, 'password': password, 'type': 2}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    // koji cekaju na odobrenje
    allNotApprovedReq = (req: express.Request, res: express.Response)=>{
        User.find({'status': ""}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users);
        })
    }

    // svi aktivni
    allUsers = (req: express.Request, res: express.Response)=>{
        User.find({'status': "aktivan", 'type': {$ne: 2}}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    // odobriti korisniku registraciju
    approveRegistration = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOneAndUpdate({ 'username': username }, { $set: { 'status': 'aktivan'} }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    // odbiti korisniku registraciju
    refuseRegistration = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOneAndUpdate({ 'username': username }, { $set: { 'status': 'neaktivan'} }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    // obrisati korisnika
    deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOneAndDelete({"username": username}, (err, user)=>{
            if(err) console.log(err)
            else res.status(200).json({ 
                message: 'User deleted'
            });
        })
    }

    // dodaje novog korisnika u sistem; isto kao register sve
    newUser = (req: express.Request, res: express.Response) => {

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

    //*** STUDIOS

    // sve radionice
    allStudios = (req: express.Request, res: express.Response)=>{
        Studio.find({'approved': true}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    // obrisati radionicu
    deleteStudio = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;

        Studio.findOneAndDelete({"name": name}, (err, user)=>{
            if(err) console.log(err)
            else res.status(200).json({ 
                message: 'Studio deleted'
            });
        });
        delete_folder(req.body.name);
    }

    // svi predlozi za radionice
    allStudioSuggestions = (req: express.Request, res: express.Response)=>{
        Studio.find({'approved': false}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users);
        })
    }

    // odobriti predlog za radionicu i ucesnika azurirati da bude organizator
    approveStudio  = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let name = req.body.name;

        Studio.findOneAndUpdate({ 'name': name }, { $set: { 'approved': 'true'} }, (err, user) => {
            if (err) console.log(err);
            else {
                User.findOneAndUpdate({ 'username': username }, { $set: { 'type': 1} }, (err, user) => {
                    if (err) console.log(err);
                    else res.json({ message: "success" });
                })
            }
        })
    }

}