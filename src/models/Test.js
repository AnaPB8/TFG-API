const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testId: {
        type: String,
        required: true,
        unique: true
    },
    asignaturaId: {
        type: String,
        ref: 'Asignatura',
        required: true
    },
    ordenDelTest: {
        type: Number,
        required: true
    },
    totalPreguntas: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Test', testSchema, 'test');