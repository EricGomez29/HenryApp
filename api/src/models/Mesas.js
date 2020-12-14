import mongoose, { Schema } from 'mongoose';

const MesasSchema = new Schema({
    users:  [{ 
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    
    linkMeet: {
        type: String
    },
    
    
})

const Mesas = mongoose.model('Mesas', MesasSchema);

export default Mesas;