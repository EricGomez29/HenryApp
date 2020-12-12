import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const PPSchema = new Schema({
    horaDeInicio:  { 
        type: String,
        default: "15:00:00"
    },
    horaDeCierre: {
        type: String,
        default: "17:00:00"
    },
    dia: {
        type: String,
        default: () => moment(moment.now()).format("DD/MM/YYYY")
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
