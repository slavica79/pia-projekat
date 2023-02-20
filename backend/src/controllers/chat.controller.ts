import * as express from 'express';
import Chat from '../models/chat';

export class ChatController {
    
    getAllChatsForUser = (req: express.Request, res: express.Response) => {

        Chat.find({'participant': req.query.username}, (err, chats) => {
            if (err) console.log(err);
            else res.json(chats);
        })
    }

    getChatForStudioForUser = (req: express.Request, res: express.Response) => {

        Chat.findOne({'participant': req.query.username, 'studio': req.query.studio}, (err, chat) => {
            if (err) console.log(err);
            else res.json(chat);
        })
    }

    getChatsForStudio = (req: express.Request, res: express.Response) => {

        Chat.find({'studio': req.query.studio}, (err, chat) => {
            if (err) console.log(err);
            else res.json(chat);
        })
    }

    sendMsg = (req: express.Request, res: express.Response) => {
        let from = req.body.from;
        let participant = req.body.participant;
        let organizer = req.body.organizer;
        let msg = req.body.msg;
        let date = req.body.date;
        let studio = req.body.studio; // jedan chat za jedan studio

        Chat.findOne({studio: studio, participant: participant}, (err, chat) => {
            if(chat) {
                // dodajemo u postojeci
                Chat.updateOne({studio: studio, participant: participant}, {$push: {
                    "messages": {
                        "from": from,
                        "message": msg,
                        "date": date
                    }
                }}, (err, data) => {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({ 'message': 'success' });
                    }
                }
                )
            }
            else {
                // pravimo novi
                let newChat = new Chat({
                    "studio": studio,
                    "participant": participant,
                    "organizer": organizer,
                    "messages": [{
                        "from": from,
                        "message": msg,
                        "date": date
                    }]
                });

                newChat.save().then(user => {
                    res.status(200).json({ 'message': 'success' });
                }).catch(err => {
                    res.status(400).json({ 'message': 'error' })
                });
            }
        })
    }

}