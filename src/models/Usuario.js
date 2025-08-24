const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    usuarioId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['ESTUDIANTE', 'PROFESOR'],
        required: true
    },
    modeloId: {
        type: String,
        ref: 'Modelos'
    },
    monedas: {
        type: Number,
        default: 0
    },
    verificado: {
        type: Boolean,
        default: false
    },
    idioma: {
        type: String,
        default: 'es'
    },
    uo: String
}, {
    timestamps: true
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usuarioSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuario');