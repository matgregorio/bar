const express = require('express');
const {register, login} = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const {verifyEmail} = require('../controllers/authController');
const { validateRegister, handleValidation } = require('../middlewares/validationMiddleware');

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutos
    max: 100 //limite de 100 requisições por IP
})

router.post('/register',limiter,validateRegister,handleValidation, register);
router.post('/login',limiter,validateRegister, handleValidation, login);
router.get('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);

module.exports = router;