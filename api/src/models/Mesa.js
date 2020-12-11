import mongoose, { Schema } from 'mongoose';

const MesaSchema = new Schema({
    alumnos: {
        type: Array
    }
})

const User = mongoose.model('User', UserSchema);

export default User;
