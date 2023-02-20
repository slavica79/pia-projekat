import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Chat = new Schema({
    participant: {
        type: String
    },
    organizer: {
        type: String
    },
    messages: {
        type: Array
    },
    studio: {
        type: String
    }
});

export default mongoose.model('Chat', Chat, 'chats');