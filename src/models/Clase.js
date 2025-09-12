const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    claseNombre: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    asignaturaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Clase', claseSchema, 'clase');