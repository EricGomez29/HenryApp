import mongoose, { Schema } from 'mongoose';

const PPSchema = new Schema({
    horaDeInicio:  { 
        type: Date,
        default: Date.now
    },
    horaDeCierre: {
        type: Date,
        default: () => Date.now() + 2*60*60*1000 // Valido por 2 horas
    },
    dia: {
        type: Date,
        default: Date.now("DD/MM/YYYY")
    },
    mesas: {
        type: Array,
    },
    cohorte: {
        type: Number,
    },
    
})

const PairProgramming = mongoose.model('PairProgramming', PPSchema);

export default PairProgramming;
