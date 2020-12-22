import mongoose, { Schema } from 'mongoose';

const DailyStandStandSchema = new Schema({
    fecha: {
        type: Date
    },
    users:  [{ 
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    name: {
        type: String
    },
    linkMeet: {
        type: String
    }
})

const DailyStand = mongoose.model('DailyStand', DailyStandStandSchema);

export default DailyStand;