import express from "express";
import { CommentController } from "../controllers/comments.controller";
const commentRouter = express.Router();

// hvata sve na putanji /comments

commentRouter.route('/getAllCommentsForStudio').get(
    (req, res)=>new CommentController().getAllCommentsForStudio(req, res)
);

commentRouter.route('/getAllCommentsForUser').get(
    (req, res)=>new CommentController().getAllCommentsForUser(req, res)
);

commentRouter.route('/addComment').post(
    (req, res)=>new CommentController().addComment(req, res)
);

commentRouter.route('/deleteComment').post(
    (req, res)=>new CommentController().deleteComment(req, res)
);

commentRouter.route('/updateComment').post(
    (req, res)=>new CommentController().updateComment(req, res)
);


export default commentRouter;
