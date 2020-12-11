import moongose, { Schema } from 'mongoose';

const moduloSchema = new Schema = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    topic: [
        { name: String }
    ]
}

const Modulo = moongose.model("Modelo", ModeloSchema);
