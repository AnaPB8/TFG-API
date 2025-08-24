const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { usuarioId, username, password, rol } = req.body;

        // Verify if the user exists
        const usuarioExiste = await Usuario.findOne({ 
            $or: [{ username }, { usuarioId }] 
        });

        if (usuarioExiste) {
            return res.status(400).json({ message: 'The user already exists' });
        }

        // Create the user
        const usuario = await Usuario.create({
            usuarioId,
            username,
            password,
            rol
        });

        if (usuario) {
            res.status(201).json({
                _id: usuario._id,
                usuarioId: usuario.usuarioId,
                username: usuario.username,
                rol: usuario.rol,
                token: generateToken(usuario._id)
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Authentificate the user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Search a user
        const usuario = await Usuario.findOne({ username });

        if (usuario && (await usuario.matchPassword(password))) {
            res.json({
                _id: usuario._id,
                usuarioId: usuario.usuarioId,
                username: usuario.username,
                rol: usuario.rol,
                monedas: usuario.monedas,
                token: generateToken(usuario._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;