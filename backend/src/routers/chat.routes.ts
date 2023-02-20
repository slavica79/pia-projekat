import express from "express";
import { ChatController } from "../controllers/chat.controller";
const chatRouter = express.Router();

// hvata sve na putanji /chats

chatRouter.route('/getAllChatsForUser').get(
    (req, res)=>new ChatController().getAllChatsForUser(req, res)
);

chatRouter.route('/getChatsForStudio').get(
    (req, res)=>new ChatController().getChatsForStudio(req, res)
);

chatRouter.route('/getChatForStudioForUser').get(
    (req, res)=>new ChatController().getChatForStudioForUser(req, res)
)

chatRouter.route('/sendMsg').post(
    (req, res)=>new ChatController().sendMsg(req, res)
);


export default chatRouter;