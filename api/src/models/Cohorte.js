import mongoose, { Schema } from 'mongoose';

const CohorteSchema = new Schema({
    number: {
        type: Number,
        unique: true,
        required: true,
    },
    users: [{ 
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    modules: {
        type: Schema.Types.ObjectId, ref: "Modules"
    },
    instructor:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    date: {
        type: String
    }
})

const Cohorte = mongoose.model('Cohorte', CohorteSchema);

export default Cohorte;