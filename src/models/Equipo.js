const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    equipoId: {
        type: String,
        required: true,
        unique: true
    },
    claseId: {
        type: String,
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
    imagen: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipo', equipoSchema, 'equipo');