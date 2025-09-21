const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    asignaturaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    estado: {
        type: String
    },
    fecha: {
        type: Date
    }
}, {
    timestamps: true
});

imparteSchema.index(
    { testId: 1, asignaturaId: 1, claseId: 1 },
    { unique: true }
);

module.exports = mongoose.model('Imparte', imparteSchema, 'imparte');