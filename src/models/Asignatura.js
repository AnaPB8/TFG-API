const mongoose = require('mongoose');

const asignaturaSchema = new mongoose.Schema({
    asignaturaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    asignaturaNombre: {
        es: { type: String, required: true, unique: true },
        en: { type: String, unique: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Asignatura', asignaturaSchema, 'asignatura');