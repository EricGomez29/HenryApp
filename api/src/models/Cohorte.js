import mongoose, { Schema } from 'mongoose';

const CohorteSchema = new Schema({
    Number: {
        type: Number,
        unique: true,
        required: true
    },
    Users: {
        type: Array
    },
    Modules: {
        type: Array
    }
})

const Cohorte = mongoose.model('Cohorte', CohorteSchema);

export default Cohorte;