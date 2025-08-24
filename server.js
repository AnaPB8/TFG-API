require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
    console.log('📍 URL: http://localhost:${PORT}');
    console.log('🎮 API GameII ready for Unity');
});