const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    preguntaId: {
        type: String,
        required: true,
        unique: true
    },
    testId: {
        type: String,
        ref: 'Test',
        required: true
    },
    solucion: {
        type: String,
        required: true
    },
    incorrectas: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Pregunta', preguntaSchema, 'pregunta');