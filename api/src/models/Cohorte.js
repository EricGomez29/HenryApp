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
    },
    instructor:{
        type: Schema.Types.ObjectId, ref: 'User'
    }

})

const Cohorte = mongoose.model('Cohorte', CohorteSchema);

export default Cohorte;