// src/routes/usuario.js
const express = require('express');
const Usuario = require('../models/Usuario');
const Enrolado = require('../models/Enrolado');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Obtain current user profile
// @route   GET /api/usuarios/perfil
// @access  Private
router.get('/perfil', protect, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id).select('-password');
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// @desc    Update user profile
// @route   PUT /api/usuarios/perfil
// @access  Private
router.put('/perfil', protect, async (req, res) => {
    try {
        const { username, idioma } = req.body;
        
        const usuario = await Usuario.findById(req.usuario._id);
        
        if (usuario) {
            usuario.username = username || usuario.username;
            usuario.idioma = idioma || usuario.idioma;
            
            const usuarioActualizado = await usuario.save();
            
            res.json({
                _id: usuarioActualizado._id,
                usuarioId: usuarioActualizado.usuarioId,
                username: usuarioActualizado.username,
                rol: usuarioActualizado.rol,
                idioma: usuarioActualizado.idioma,
                monedas: usuarioActualizado.monedas
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// @desc    Obtain user teams
// @route   GET /api/usuarios/equipos
// @access  Private
router.get('/equipos', protect, async (req, res) => {
    try {
        const equipos = await Enrolado.find({ usuarioId: req.usuario.usuarioId })
            .populate('equipoId')
            .populate('claseId')
            .populate('asignaturaId');
            
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

module.exports = router;