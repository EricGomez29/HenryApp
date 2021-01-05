import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const PPSchema = new Schema({
    dia: {
        type: String,
        default: () => moment(moment.now()).format("DD/MM/YYYY")
    },
    cohorte: {
        type: Number
    },
    users: [{
        type : Schema.Types.ObjectId, ref: 'User' 
    }],
    linkMeet: {
        type: String
    }
    
})

const PairProgramming = mongoose.model('PairProgramming', PPSchema);

export default PairProgramming;
