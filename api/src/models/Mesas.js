import mongoose, { Schema } from 'mongoose';

const MesasSchema = new Schema({
    cohorte: {
        type: Number
    },
    users:  [{ 
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    linkMeet: {
        type: String
    }
})

const Mesas = mongoose.model('Mesas', MesasSchema);

export default Mesas;