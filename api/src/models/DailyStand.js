import mongoose, { Schema } from 'mongoose';

const DailyStandStandSchema = new Schema({
    fecha: {
        type: String
    },
    users:  [{ 
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    name: {
        type: String
    },
})

const DailyStand = mongoose.model('DailyStand', DailyStandStandSchema);

export default DailyStand;