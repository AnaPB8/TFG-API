const jwt = require('jsonwebtoken');
const Estudiante = require('../models/Estudiante');
const Profesor = require('../models/Profesor');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Try to find user in Estudiante collection first
            let user = await Estudiante.findById(decoded.id).select('-password');
            
            // If not found, try Profesor collection
            if (!user) {
                user = await Profesor.findById(decoded.id).select('-password');
                if (user) {
                    user.userType = 'profesor';
                }
            } else {
                user.userType = 'estudiante';
            }

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth error:', error);
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Middleware to check if user is a professor
const requireProfesor = async (req, res, next) => {
    if (req.user && req.user.userType === 'profesor') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Professor role required.' });
    }
};

// Middleware to check if user is a student
const requireEstudiante = async (req, res, next) => {
    if (req.user && req.user.userType === 'estudiante') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Student role required.' });
    }
};

module.exports = { protect, requireProfesor, requireEstudiante };