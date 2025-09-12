const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    preguntaId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    preguntaTexto: {
        es: { type: String },
        en: { type: String }
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    solucion: {
        es: { type: String },
        en: { type: String }
    },
    incorrectas: [{
        es: { type: String },
        en: { type: String }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Pregunta', preguntaSchema, 'pregunta');