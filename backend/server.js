const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { createUsersTable } = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../')));

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Сервер работает' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Что-то пошло не так!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});


const startServer = async () => {
    try {
        await createUsersTable();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`API endpoints:`);
            console.log(`   POST   http://localhost:${PORT}/api/auth/register`);
            console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
            console.log(`   GET    http://localhost:${PORT}/api/auth/check/:name`);
            console.log(`   GET    http://localhost:${PORT}/api/auth/user/:id`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};



startServer();