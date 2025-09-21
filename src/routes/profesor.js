const express = require('express');
const Profesor = require('../models/Profesor');
const { protect, requireProfesor } = require('../middleware/auth');
const router = express.Router();

// @desc    Get current professor profile
// @route   GET /api/profesores/perfil
// @access  Private (Professor only)
router.get('/perfil', protect, requireProfesor, async (req, res) => {
    try {
        const profesor = await Profesor.findById(req.user._id).select('-password');
        res.json(profesor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update professor profile
// @route   PUT /api/profesores/perfil
// @access  Private (Professor only)
router.put('/perfil', protect, requireProfesor, async (req, res) => {
    try {
        const { username, idioma } = req.body;
        
        const profesor = await Profesor.findById(req.user._id);
        
        if (profesor) {
            profesor.username = username || profesor.username;
            profesor.idioma = idioma || profesor.idioma;
            
            const profesorActualizado = await profesor.save();
            
            res.json({
                _id: profesorActualizado._id,
                profesorId: profesorActualizado.profesorId,
                username: profesorActualizado.username,
                verificado: profesorActualizado.verificado,
                idioma: profesorActualizado.idioma
            });
        } else {
            res.status(404).json({ message: 'Professor not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;