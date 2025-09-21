const express = require('express');
const Test = require('../models/Test');
const Pregunta = require('../models/Pregunta');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all tests
// @route   GET /api/tests
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const tests = await Test.find().populate('asignaturaId');
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get test by ID
// @route   GET /api/tests/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('asignaturaId');
        
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        
        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get test questions
// @route   GET /api/tests/:id/preguntas
// @access  Private
router.get('/:id/preguntas', protect, async (req, res) => {
    try {
        const preguntas = await Pregunta.find({ testId: req.params.id });
        res.json(preguntas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get tests by subject
// @route   GET /api/tests/asignatura/:asignaturaId
// @access  Private
router.get('/asignatura/:asignaturaId', protect, async (req, res) => {
    try {
        const tests = await Test.find({ asignaturaId: req.params.asignaturaId })
            .populate('asignaturaId')
            .sort({ ordenDelTest: 1 });
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;