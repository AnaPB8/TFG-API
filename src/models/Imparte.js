const mongoose = require('mongoose');

const imparteSchema = new mongoose.Schema({
    profesorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    }
}, {
    timestamps: true
});

imparteSchema.index(
    { profesorId: 1, claseId: 1 },
    { unique: true }
);

module.exports = mongoose.model('Imparte', imparteSchema, 'imparte');