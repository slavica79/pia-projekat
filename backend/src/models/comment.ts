import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    user: {
        type: String
    },
    studio: {
        type: String
    },
    comment: {
        type: String
    },
    date: {
        type: Date
    }
});

export default mongoose.model('Comment', Comment, 'comments');