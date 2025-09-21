const express = require('express');
const Estudiante = require('../models/Estudiante');
const Enrolado = require('../models/Enrolado');
const { protect, requireEstudiante } = require('../middleware/auth');
const router = express.Router();

// @desc    Get current student profile
// @route   GET /api/estudiantes/perfil
// @access  Private (Student only)
router.get('/perfil', protect, requireEstudiante, async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.user._id).select('-password');
        res.json(estudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update student profile
// @route   PUT /api/estudiantes/perfil
// @access  Private (Student only)
router.put('/perfil', protect, requireEstudiante, async (req, res) => {
    try {
        const { username, idioma } = req.body;
        
        const estudiante = await Estudiante.findById(req.user._id);
        
        if (estudiante) {
            estudiante.username = username || estudiante.username;
            estudiante.idioma = idioma || estudiante.idioma;
            
            const estudianteActualizado = await estudiante.save();
            
            res.json({
                _id: estudianteActualizado._id,
                estudianteId: estudianteActualizado.estudianteId,
                username: estudianteActualizado.username,
                uo: estudianteActualizado.uo,
                idioma: estudianteActualizado.idioma,
                monedas: estudianteActualizado.monedas
            });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get student teams
// @route   GET /api/estudiantes/equipos
// @access  Private (Student only)
router.get('/equipos', protect, requireEstudiante, async (req, res) => {
    try {
        const equipos = await Enrolado.find({ estudianteId: req.user.estudianteId })
            .populate('equipoId')
            .populate('claseId')
            .populate('asignaturaId');
            
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update student coins
// @route   PUT /api/estudiantes/monedas
// @access  Private (Student only)
router.put('/monedas', protect, requireEstudiante, async (req, res) => {
    try {
        const { monedas } = req.body;
        
        const estudiante = await Estudiante.findById(req.user._id);
        
        if (estudiante) {
            estudiante.monedas = monedas;
            await estudiante.save();
            
            res.json({
                message: 'Coins updated successfully',
                monedas: estudiante.monedas
            });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;