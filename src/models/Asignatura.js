const mongoose = require('mongoose');

const asignaturaSchema = new mongoose.Schema({
    asignaturaId: {
        type: String,
        required: true,
        unique: true
    },
    asignaturaNombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Asignatura', asignaturaSchema, 'asignatura');