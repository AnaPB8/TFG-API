const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import the routes
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const estudianteRoutes = require('./routes/estudiante');
const profesorRoutes = require('./routes/profesor');
const equipoRoutes = require('./routes/equipo');

// Connect to the database
connectDB();

const app = express();

// CORS configuration for Unity
const corsOptions = {
    origin: true, // Allow all origins for development
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/equipos', equipoRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

// Main route
app.get('/', (req, res) => {
    res.json({ 
        message: '🎮 API GameII functioning correctly',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            tests: '/api/tests',
            estudiantes: '/api/estudiantes',
            profesores: '/api/profesores',
            equipos: '/api/equipos',
            health: '/health'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        message: `Route not found: ${req.method} ${req.originalUrl}`,
        availableRoutes: ['/api/auth', '/api/tests', '/api/estudiantes', '/api/profesores', '/api/equipos', '/health']
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong',
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

module.exports = app;