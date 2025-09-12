const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    equipoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    nombreEquipo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#000000'
    },
    cerrado: {
        type: Boolean,
        default: false
    },
    imagen: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipo', equipoSchema, 'equipo');