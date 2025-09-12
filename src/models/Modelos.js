const mongoose = require('mongoose');

const modelosSchema = new mongoose.Schema({
    modeloId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    modeloNombre: {
        es: { type: String, required: true },
        en: { type: String, required: true }
    },
    nombreObj: {
        type: String
    },
    imagen: {
        type:String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Modelos', modelosSchema, 'modelos');