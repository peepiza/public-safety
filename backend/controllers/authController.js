const User = require('../models/User');

class AuthController {
    async register(req, res) {
        try {
            const { name, phone, birthDate, password } = req.body;
            
            const exists = await User.exists(name, phone);
            
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Пользователь с таким именем или телефоном уже существует'
                });
            }
            
            const newUser = await User.create({
                name,
                phone,
                birthDate,
                password
            });
            
            res.status(201).json({
                success: true,
                message: 'Регистрация прошла успешно',
                user: newUser
            });
            
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера при регистрации'
            });
        }
    }
    
    async login(req, res) {
        try {
            const { name, password } = req.body;
            
            const user = await User.authenticate(name, password);
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Неверное имя пользователя или пароль'
                });
            }
            
            res.json({
                success: true,
                message: 'Вход выполнен успешно',
                user: user
            });
            
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера при входе'
            });
        }
    }
    
    async checkUser(req, res) {
        try {
            const { name } = req.params;
            const user = await User.findByName(name);
            
            res.json({
                exists: !!user,
                user: user ? {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    birthDate: user.birth_date,
                    avatar: user.avatar
                } : null
            });
            
        } catch (error) {
            console.error('Check user error:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера'
            });
        }
    }
    
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const query = 'SELECT id, name, phone, birth_date, avatar, registered_at FROM users WHERE id = $1';
            const result = await pool.query(query, [id]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Пользователь не найден'
                });
            }
            
            res.json({
                success: true,
                user: result.rows[0]
            });
            
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера'
            });
        }
    }
}

module.exports = new AuthController();