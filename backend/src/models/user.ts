import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type:String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    valid_pass: {
        type: Number
    },
    type: {
        type: Number
    },
    status: {
        type: String
    },
    org_adress: {
        type: String
    },
    org_name: {
        type: String
    },
    org_number: {
        type: String
    },
    likes: {
        type: Array // niz lajkovanih radionica
    },
    studios: {
        type: Array // niz radionica za koje je prijavljen
    }
});

export default mongoose.model('User', User, 'users');