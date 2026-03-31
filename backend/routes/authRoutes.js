const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegistration, authController.register);

router.post('/login', validateLogin, authController.login);

router.get('/check/:name', authController.checkUser);

router.get('/user/:id', authController.getUser);

module.exports = router;