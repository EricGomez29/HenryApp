import mongoose, { Schema } from 'mongoose';

const Mesaschema = new Schema({
    users:  { 
        type: Array
    },
    estado: {
        type: String,
        enum: ['Empty', 'In Process', 'Full'],
        required: function() {
            var cantidad = this.users.length;
            if (cantidad === 0){
                return 'Empty'
            }else if(cantidad < 6){
                return 'In Process'
            }else{
                return 'Full'
            }
        }
    },
    linkMeet: {
        type: String
    },
    
    
})

const PairProgramming = mongoose.model('PairProgramming', PPSchema);

export default PairProgramming;