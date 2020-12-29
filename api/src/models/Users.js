import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cohorte: {
        type: Number,
        default: null
    },
    adress: {
        type: String
    },
    nationality: {
        type: String
    },
    phone: {
        type: String
    },
    henryCoins: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        require: true
    },
    forgotPassword:{
        type: Number,
        default: 0
    },
    isInstructor:{
        type: Boolean,
        default: false
    },
    isPM:{
        type: Boolean,
        default: false,
    },
    listPM: [ 
        { type: String }
    ],
    standUp:{
        type: String,
    },
    image: {
        type: String,
    }
})

const User = mongoose.model('User', UserSchema);

export default User;
