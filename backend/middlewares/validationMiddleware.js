import {check, validationResult} from 'express-validator';

export const validateRegister = [
    check('nome').notEmpty().withMessage('Nome é obrigatório'),
    check('email').isEmail().withMessage('Email inválido'),
    check('senha').isLength({min: 8}).withMessage('Sua senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Deve conter pelo menos uma letra maiúscula')
    .matches(/[0-9]/).withMessage('Deve conter pelo menos um número')
];

export const validateLogin = [
    check('email').isEmail(),
    check('senha').notEmpty()
];

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};