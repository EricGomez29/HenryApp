import mongoose, { Schema } from 'mongoose';

const StandUpSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    PM: [ {
        type: Schema.Types.ObjectId, ref: 'User',
    }],
    users: [ {
        type: Schema.Types.ObjectId, ref: 'User',
    }],
    cohorte: {
        type: Number
    }
})

const StandUp = mongoose.model('StandUp', StandUpSchema);

export default StandUp;

