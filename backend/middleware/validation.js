const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('name')
        .trim()
        .notEmpty().withMessage('Введите никнейм')
        .isLength({ min: 3, max: 20 }).withMessage('Никнейм должен быть от 3 до 20 символов')
        .matches(/^[a-zA-Z0-9а-яА-ЯёЁ]+$/).withMessage('Никнейм может содержать только буквы и цифры'),
    
    body('phone')
        .trim()
        .notEmpty().withMessage('Введите номер телефона')
        .custom((value) => {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length !== 11) {
                throw new Error('Номер должен содержать 11 цифр');
            }
            if (!digitsOnly.startsWith('7') && !digitsOnly.startsWith('8')) {
                throw new Error('Номер должен начинаться с 7 или 8');
            }
            return true;
        }),
    
    body('birthDate')
        .notEmpty().withMessage('Выберите дату рождения')
        .custom((value) => {
            const birthDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (birthDate > today) {
                throw new Error('Дата рождения не может быть в будущем');
            }
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 0) {
                throw new Error('Некорректная дата рождения');
            }
            
            return true;
        }),
    
    body('password')
        .notEmpty().withMessage('Введите пароль')
        .isLength({ min: 6, max: 30 }).withMessage('Пароль должен быть от 6 до 30 символов')
        .matches(/[A-Z]/).withMessage('Пароль должен содержать хотя бы одну заглавную букву')
        .matches(/[a-z]/).withMessage('Пароль должен содержать хотя бы одну строчную букву')
        .matches(/[0-9]/).withMessage('Пароль должен содержать хотя бы одну цифру'),
    
    body('confirmPassword')
        .notEmpty().withMessage('Подтвердите пароль')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Пароли не совпадают'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }
        next();
    }
];

const validateLogin = [
    body('name')
        .trim()
        .notEmpty().withMessage('Введите никнейм')
        .isLength({ min: 3, max: 20 }).withMessage('Никнейм должен быть от 3 до 20 символов'),
    
    body('password')
        .notEmpty().withMessage('Введите пароль'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = {
    validateRegistration,
    validateLogin
};