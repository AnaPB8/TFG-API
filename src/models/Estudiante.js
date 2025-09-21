const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uo: {
        type: String,
        unique: true
    },
    modeloActualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modelos',
        required: true
    },
    monedas: {
        type: Number,
        default: 0
    },
    idioma: {
        type: String,
        default: 'es'
    }
}, {
    timestamps: true
});

estudianteSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

estudianteSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Estudiante', estudianteSchema, 'estudiante');
