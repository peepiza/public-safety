const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { name, phone, birthDate, password, avatar = '😼' } = userData;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const query = `
            INSERT INTO users (name, phone, birth_date, password, avatar, registered_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            RETURNING id, name, phone, birth_date, avatar, registered_at, created_at
        `;
        
        const values = [name, phone, birthDate, hashedPassword, avatar];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    static async findByName(name) {
        const query = 'SELECT * FROM users WHERE LOWER(name) = LOWER($1)';
        const values = [name];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    static async findByPhone(phone) {
        const query = 'SELECT * FROM users WHERE phone = $1';
        const values = [phone];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    static async exists(name, phone) {
        const query = 'SELECT id FROM users WHERE LOWER(name) = LOWER($1) OR phone = $2';
        const values = [name, phone];
        
        try {
            const result = await pool.query(query, values);
            return result.rows.length > 0;
        } catch (error) {
            throw error;
        }
    }
    
    static async authenticate(name, password) {
        const user = await this.findByName(name);
        
        if (!user) {
            return null;
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return null;
        }
        
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    
    static async getAll() {
        const query = 'SELECT id, name, phone, birth_date, avatar, registered_at, created_at FROM users ORDER BY created_at DESC';
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    
    static async update(id, updateData) {
        const fields = [];
        const values = [];
        let paramIndex = 1;
        
        if (updateData.name) {
            fields.push(`name = $${paramIndex++}`);
            values.push(updateData.name);
        }
        
        if (updateData.phone) {
            fields.push(`phone = $${paramIndex++}`);
            values.push(updateData.phone);
        }
        
        if (updateData.birthDate) {
            fields.push(`birth_date = $${paramIndex++}`);
            values.push(updateData.birthDate);
        }
        
        if (updateData.avatar) {
            fields.push(`avatar = $${paramIndex++}`);
            values.push(updateData.avatar);
        }
        
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            fields.push(`password = $${paramIndex++}`);
            values.push(hashedPassword);
        }
        
        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);
        
        const query = `
            UPDATE users 
            SET ${fields.join(', ')} 
            WHERE id = $${paramIndex}
            RETURNING id, name, phone, birth_date, avatar, registered_at, created_at, updated_at
        `;
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;