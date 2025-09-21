const mongoose = require('mongoose');

const desbloqueadosSchema = new mongoose.Schema({
    modeloId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modelos',
        required: true
    },
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    }
}, {
    timestamps: true
});

desbloqueadosSchema.index(
    { modeloId: 1, estudianteId: 1 },
    { unique: true }
);

module.exports = mongoose.model('Desbloqueados', desbloqueadosSchema, 'desbloqueados');