import mongoose, { Schema } from 'mongoose';

const MesasSchema = new Schema({
    users:  { 
        type: Array
    },
    estado: {
        type: String,
        default: "Empty"
    },
    linkMeet: {
        type: String
    },
    
    
})

const Mesas = mongoose.model('Mesas', MesasSchema);

export default Mesas;