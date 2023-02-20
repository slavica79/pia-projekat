import express from "express";
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

// hvata sve na putanji /users

userRouter.route('/getUserImage').get(
    (req, res)=>new UserController().getUserImage(req, res)
);

userRouter.route('/getUser').get(
    (req, res)=>new UserController().getUser(req, res)
);

userRouter.route('/getUserByMail').get(
    (req, res)=>new UserController().getUserByMail(req, res)
);

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
);

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/update').post(
    (req, res)=>new UserController().update(req, res)
);

// actions

userRouter.route('/getAllLikesForUser').get(
    (req, res)=>new UserController().getAllLikesForUser(req, res)
);

userRouter.route('/getAllCommentsForUser').get(
    (req, res)=>new UserController().getAllCommentsForUser(req, res)
);

export default userRouter;