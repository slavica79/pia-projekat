import * as express from 'express';
import { delete_folder, image_to_base64_studio } from '../images';
import { images_to_base64_studio } from '../images';
import { base64_to_images_studio } from '../images';
import { base64_to_image_studio } from '../images';
import Studio from '../models/studio';
import User from '../models/user';

export class StudioController {

    // sve aktuelne radionice; datum danasnji ili kasnije
    allCurrentStudios = (req: express.Request, res: express.Response) => {
        Studio.find({ 'date': { $gte: Date.now() }, 'approved': true }, (err, studios) => {
            if (err) console.log(err)
            else res.json(studios)
        })
    }

    getAllStudiosForOrganizer = (req: express.Request, res: express.Response) => {
        Studio.find({ 'user': req.query.user}, (err, studios) => {
            if (err) console.log(err)
            else res.json(studios)
        })
    }

    // stop 5 radionica po lajkovima
    top5Studios = (req: express.Request, res: express.Response) => {
        Studio.find({}).sort({ likes: -1 }).limit(5).exec(function (err, studios) {
            if (err) console.log(err)
            else {
                res.json(studios)
            }
        })
    }

    // pretraga radionica po nazivu
    searchStudiosName = (req: express.Request, res: express.Response) => {
        let searchParam1 = req.query.param1;

        Studio.find({ "name": { $regex: searchParam1 } }, (err, studios) => {
            if (err) {
                console.log(err);
            } else {
                res.json(studios);
            }
        });
    }

    // pretraga radionica po nazivu
    searchStudiosPlace = (req: express.Request, res: express.Response) => {
        let searchParam2 = req.query.param2;

        Studio.find({ "address": { $regex: searchParam2 } }, (err, studios) => {
            if (err) {
                console.log(err);
            } else {
                res.json(studios);
            }
        });
    }

    // pretraga radionica po imenu i nazivu
    searchStudiosNameAndPlace = (req: express.Request, res: express.Response) => {
        let searchParam1 = req.query.param1;
        let searchParam2 = req.query.param2;

        Studio.find({ "name": { $regex: searchParam1 }, "address": { $regex: searchParam2 } }, (err, studios) => {
            if (err) {
                console.log(err);
            } else {
                res.json(studios);
            }
        });
    }

    // dohvatanje studia po imenu
    getStudio = (req: express.Request, res: express.Response) => {
        let name = req.query.name;

        Studio.findOne({ "name": name }, (err, studio) => {
            if (err) {
                console.log(err);
            } else {
                res.json(studio);
            }
        });
    }

    // sve slike za radionicu
    getAllPicturesForStudio = (req: express.Request, res: express.Response) => {
        let studio = req.body.studio;
        //TODO
    }

    // lajkovanje radionice
    like = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let studio = req.body.studio;

        Studio.findOneAndUpdate({ 'name': studio }, { $inc: { likes: 1 } }, (err, user) => {
            if (err) console.log(err);
        })

        User.findOneAndUpdate({ 'username': username }, { $push: { likes: studio } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    // dislajkovanje
    dislike = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let studio = req.body.studio;

        Studio.findOneAndUpdate({ 'name': studio }, { $inc: { likes: -1 } }, (err, user) => {
            if (err) console.log(err);
        })

        User.findOneAndUpdate({ 'username': username }, { $pull: { likes: studio } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    // otkazivanje prijave za radionicu
    cancel = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let user_email = req.body.user_email;
        let studio = req.body.studio;

        Studio.findOneAndUpdate({ 'name': studio }, { $inc: { free_spaces: 1 } }, (err, user) => {
            if (err) console.log(err);
        })

        // korisnik nije vise registrovan
        Studio.findOneAndUpdate({ 'name': studio }, { $pull: { registered_users: user_email,  registration_requested: user_email} }, (err, user) => {
            if (err) console.log(err);
        })

        // izvuci studio iz liste studija kod user-a
        User.findOneAndUpdate({ 'username': username }, { $pull: { studios: studio } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })

        //TODO mail ucesnika koji cekaju na mesto poslati svima da se oslobodilo
    }

    apply = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let user_email = req.body.user_email;
        let studio = req.body.studio;

        Studio.findOneAndUpdate({ 'name': studio }, { $inc: { free_spaces: -1 } }, (err, user) => {
            if (err) console.log(err);
        })

        // korisnik postaje registrovan
        Studio.findOneAndUpdate({ 'name': studio }, { $push: { registered_users: user_email, registration_requested: user_email}}, (err, user) => {
            if (err) console.log(err);
        })

        // dodaje se u listu studija korisnika
        User.findOneAndUpdate({ 'username': username }, { $push: { studios: studio } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    approve = (req: express.Request, res: express.Response) => {
        let user_email = req.body.user_email;
        let studio = req.body.studio;

        // korisnik postaje registrovan
        Studio.findOneAndUpdate({ 'name': studio }, { $pull: { registration_requested: user_email}}, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    addToListOfWaitingUsers = (req: express.Request, res: express.Response) => {
        let user_email = req.body.user_email;
        let studio = req.body.studio;

        // korisnik se dodaje u listu
        Studio.findOneAndUpdate({ 'name': studio }, { $push: { waiting_users: user_email } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }

    create = (req: express.Request, res: express.Response) => {
        Studio.findOne({ 'name': req.body.name }, (err, studio) => {
            if (studio) res.status(200).json({ 'message': 'studio exists' });
            else {
                let newStudio = new Studio({
                    name: req.body.name,
                    date: req.body.date,
                    description: req.body.description,
                    full_description: req.body.full_description,
                    likes: 0,
                    approved: false,
                    user: req.body.user,
                    address: req.body.address,
                    free_spaces: req.body.free_spaces,
                    registered_users: new Array<String>,
                    waiting_users: new Array<String>,
                    registration_requested: new Array<String>
                });

                newStudio.save().then(user => {
                    res.status(200).json({ 'message': 'studio added' });
                    base64_to_image_studio(req.body.icon, req.body.name);
                    base64_to_images_studio(req.body.icons, req.body.name);
                }).catch(err => {
                    res.status(400).json({ 'message': 'error' })
                });
            }
        })
    }

    getStudioMainIcon = (req: express.Request, res: express.Response) => {
        let studio = req.query.studio;

        res.json({"image": "data:image/png;base64," + image_to_base64_studio(studio)}); // kad rucno unosimo
    }

    getStudioIcons = (req: express.Request, res: express.Response) => {
        let studio = req.query.studio;

        res.json({"images": images_to_base64_studio(studio)});
    }

    update = (req: express.Request, res: express.Response) => {

        Studio.findOneAndUpdate({'name': req.body.name},
        {
            date: req.body.date,
            description: req.body.description,
            full_description: req.body.full_description,
            address: req.body.address,
            free_spaces: req.body.free_spaces
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
        delete_folder(req.body.name);
        base64_to_image_studio(req.body.icon, req.body.name);
        base64_to_images_studio(req.body.icons, req.body.name);
    }

}