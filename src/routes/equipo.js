const express = require('express');
const Equipo = require('../models/Equipo');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all teams
// @route   GET /api/equipos
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const equipos = await Equipo.find().populate('claseId');
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get team by ID
// @route   GET /api/equipos/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const equipo = await Equipo.findById(req.params.id).populate('claseId');
        
        if (!equipo) {
            return res.status(404).json({ message: 'Team not found' });
        }
        
        res.json(equipo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get teams by class
// @route   GET /api/equipos/clase/:claseId
// @access  Private
router.get('/clase/:claseId', protect, async (req, res) => {
    try {
        const equipos = await Equipo.find({ claseId: req.params.claseId })
            .populate('claseId');
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;