import moongose, { Schema } from 'moongose';

const MesasSchema = new Schema ({
    dia: {
        type: Date,
        required:true
    },
    mesas:{
        type: Array
    }

})