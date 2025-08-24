const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
    claseId: {
        type: String,
        required: true,
        unique: true
    },
    curso: {
        type: String,
        required: true
    },
    asignaturaId: {
        type: String,
        ref: 'Asignatura',
        required: true
    },
    claseNombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Clase', claseSchema, 'clase');