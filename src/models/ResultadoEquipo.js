const mongoose = require('mongoose');

const resultadoEquipoSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
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
    },
    nombreObj: {
        type: String
    },
    imagen: {
        type:String
    }
}, {
    timestamps: true
});

resultadoEquipoSchema.index(
    { testId: 1, claseId: 1, equipoId: 1 },
    { unique: true }
);

module.exports = mongoose.model('ResultadoEquipo', resultadoEquipoSchema, 'resultadoEquipo');