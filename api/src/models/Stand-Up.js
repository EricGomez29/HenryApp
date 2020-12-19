import mongoose, { Schema } from 'mongoose';

const StandUpSchema = new Schema({
    PM: [ {
        type: Schema.Types.ObjectId, ref: 'Users',
    }],
    users: [ {
        type: Schema.Types.ObjectId, ref: 'Users',
    }],
    cohorte: {
        type: Number
    }
})

const StandUp = mongoose.model('StandUp', StandUpSchema);

export default StandUp;

