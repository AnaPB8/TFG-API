const mongoose = require('mongoose');

const enroladoSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    equipoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    }
}, {
    timestamps: true
});

enroladoSchema.index(
    { estudianteId: 1, claseId: 1, equipoId: 1 },
    { unique: true }
);

module.exports = mongoose.model('Enrolado', enroladoSchema, 'enrolado');