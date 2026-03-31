const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            phone VARCHAR(20) NOT NULL UNIQUE,
            birth_date DATE NOT NULL,
            password VARCHAR(255) NOT NULL,
            avatar VARCHAR(10) DEFAULT '😼',
            registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await pool.query(query);
        console.log('Users table created or already exists');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

module.exports = {
    pool,
    createUsersTable
};