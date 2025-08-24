const mongoose = require('mongoose');

const enroladoSchema = new mongoose.Schema({
    usuarioId: {
        type: String,
        ref: 'Usuario',
        required: true
    },
    asignaturaId: {
        type: String,
        ref: 'Asignatura',
        required: true
    },
    claseId: {
        type: String,
        ref: 'Clase',
        required: true
    },
    equipoId: {
        type: String,
        ref: 'Equipo',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enrolado', enroladoSchema, 'enrolado');