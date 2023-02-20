import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Studio = new Schema({
    user: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: Date
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    full_description: {
        type: String
    },
    likes: {
        type: Number
    },
    free_spaces: {
        type: Number
    },
    registered_users: {
        type: Array // mail prijavljenih ucesnika, ili username 
    },
    waiting_users: {
        type: Array // mail ucesnika koji cekaju na mesto
    },
    registration_requested: {
        type: Array // mail ucesnika koji su zatrazili ucesce; ako prihvata samo ga brisemo odavde (vec postoji i u registered)
        // ako ne, brisemo odavde i iz registered i iz liste kod korisnika; kao kad povlaci prijavu
    },
    approved: {
        type: Boolean
    }
}); // slike u fs-u

export default mongoose.model('Studio', Studio, 'studios');