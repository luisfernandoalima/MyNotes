import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name_user: {
        type: String,
        required: true
    },
    email_user: {
        type: String,
        unique: true,
        required: true
    },
    password_user:{
        type: String,
        required: true
    }, 
    admin:{
        type: Boolean,
        required: true,
        default: false
    },
    image_user:{
        type: String,
        required: true,
        default: 'user0.png'
    }
})

export const User = mongoose.model('user', UserSchema)