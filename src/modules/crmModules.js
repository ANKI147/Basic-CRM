import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstname:{
        type: String,
        required: 'Enter the first name'   
    },
    lastname:{
        type: String,
        required: 'Enter the last name'
    },
    email:{
        type: String,
        required: 'Enter the email address'
    },
    company:{
        type: String
    },
    phone:{
        type: Number
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});