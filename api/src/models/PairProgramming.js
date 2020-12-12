import mongoose, { Schema } from 'mongoose';

const PPSchema = new Schema({
    horaDeInicio:  { 
        type: Date,
        default: "15:00:00"
    },
    horaDeCierre: {
        type: Date,
        required: "17:00:00"
    },
    dia: {
        type: Date,
        default: Date.now
    },
    mesas: {
        type: Array,
        default: null
    },
    cohorte: {
        type: Number,
    },
    
})

const PairProgramming = mongoose.model('PairProgramming', PPSchema);

export default PairProgramming;
