const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Estudiante = require('../models/Estudiante');
const Profesor = require('../models/Profesor');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a student
// @route   POST /api/auth/register/estudiante
// @access  Public
router.post('/register/estudiante', async (req, res) => {
    try {
        const { estudianteId, username, password, uo, modeloActualId } = req.body;

        // Check if student exists
        const estudianteExiste = await Estudiante.findOne({ 
            $or: [{ username }, { estudianteId }] 
        });

        if (estudianteExiste) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create student
        const estudiante = await Estudiante.create({
            estudianteId,
            username,
            password: hashedPassword,
            uo,
            modeloActualId,
            monedas: 0,
            idioma: 'es'
        });

        res.status(201).json({
            _id: estudiante._id,
            estudianteId: estudiante.estudianteId,
            username: estudiante.username,
            userType: 'estudiante',
            monedas: estudiante.monedas,
            token: generateToken(estudiante._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Register a professor
// @route   POST /api/auth/register/profesor
// @access  Public
router.post('/register/profesor', async (req, res) => {
    try {
        const { profesorId, username, password, modeloActualId } = req.body;

        // Check if professor exists
        const profesorExiste = await Profesor.findOne({ 
            $or: [{ username }, { profesorId }] 
        });

        if (profesorExiste) {
            return res.status(400).json({ message: 'Professor already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create professor
        const profesor = await Profesor.create({
            profesorId,
            username,
            password: hashedPassword,
            verificado: false,
            modeloActualId,
            idioma: 'es'
        });

        res.status(201).json({
            _id: profesor._id,
            profesorId: profesor.profesorId,
            username: profesor.username,
            userType: 'profesor',
            verificado: profesor.verificado,
            token: generateToken(profesor._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Login user (student or professor)
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Try to find user in Estudiante collection first
        let user = await Estudiante.findOne({ username });
        let userType = 'estudiante';

        // If not found, try Profesor collection
        if (!user) {
            user = await Profesor.findOne({ username });
            userType = 'profesor';
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Prepare response based on user type
        const response = {
            _id: user._id,
            username: user.username,
            userType: userType,
            token: generateToken(user._id)
        };

        if (userType === 'estudiante') {
            response.estudianteId = user.estudianteId;
            response.monedas = user.monedas;
            response.uo = user.uo;
        } else {
            response.profesorId = user.profesorId;
            response.verificado = user.verificado;
        }

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;