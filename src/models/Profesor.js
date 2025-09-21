const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    profesorId: {
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
    verificado: {
        type: Boolean,
        default: false
    },
    modeloActualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modelos',
        required: true
    },
    idioma: {
        type: String,
        default: 'es'
    }
}, {
    timestamps: true
});

profesorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

profesorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('profesor', profesorSchema, 'profesor');
