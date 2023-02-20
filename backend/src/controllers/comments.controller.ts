import * as express from 'express';
import Comment from '../models/comment';

export class CommentController {
    

    getAllCommentsForStudio = (req: express.Request, res: express.Response) => {

        Comment.find({'studio': req.query.studio}, (err, comments) => {
            if (err) console.log(err);
            else res.json(comments);
        })
    }

    getAllCommentsForUser = (req: express.Request, res: express.Response) => {

        Comment.find({'user': req.query.user}, (err, comments) => {
            if (err) console.log(err);
            else res.json(comments);
        })
    }

    addComment = (req: express.Request, res: express.Response) => {

        let newComment = new Comment({
            user: req.body.user,
            studio: req.body.studio,
            comment: req.body.comment,
            date: req.body.date
        })

        newComment.save().then(user => {
            res.status(200).json({ 'message': 'success' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' })
        });
    }

    deleteComment = (req: express.Request, res: express.Response) => {

        Comment.deleteOne({"_id": req.body.id}, (err, data) => {
            if(err) console.log(err)
            else res.status(200).json({ 
                message: 'Comment deleted'
            });
        })
    }

    updateComment = (req: express.Request, res: express.Response) => {

        Comment.findOneAndUpdate({"_id": req.body.id},
        {
            comment: req.body.comment,
            date: req.body.date
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ message: "success" });
        })
    }
}