const express = require('express');
const Test = require('../models/Test');
const Pregunta = require('../models/Pregunta');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Obtain all tests
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

// @desc    Obtain a test by its ID
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

// @desc    Obtain the questions of a test
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

module.exports = router;