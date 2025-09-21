const mongoose = require('mongoose');

const logActividadSchema = new mongoose.Schema({
    logId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
    fechaYHora: {
        type: Date,
        default: Date.now
    },
    tipoAccion: {
        type: String,
        required: true
    },
    detalle: {
        type: String
    },
    profesorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesor',
        default: null
    },
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        default: null
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        default: null
    },
    equipoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        default: null
    },
    partidaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partida',
        default: null
    },
    preguntaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LogActividad', logActividadSchema, 'logactividad');
