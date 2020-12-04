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
        required: true
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
})

const User = mongoose.model('User', UserSchema);

export default User;