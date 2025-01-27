import { access } from 'fs';
import { generateTokens } from '../middlewares/authMiddleware';

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/emailSender');

export const register = async (req,res) =>{
    try{
        const{nome, email, senha} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email já cadastrado'});
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationExpires = Date.now() + 3600000;//1hora

        const user = await User.create({nome, email, senha, verificationToken, verificationExpires});
        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({id: user._id, nome:user.nome, email: user.email});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const login = async(req, res) => {
    try{
        const {email, senha} = req.body;

        const user = await User.findOne({email}).select('+senha');
        if(!user){
            return res.status(401).json({message: 'Credenciais inválidas'});
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if(!isMatch){
            return res.status(401).json({message: 'Credenciais inválidas - Senha incorreta'});
        }
        const{accesToken, refreshToken} = generateTokens(user);
        user.refreshTokens.push({
            token: refreshToken,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await user.save();

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({token});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const verifyEmail = async(req,res) =>{
    try{
        const {token} = req.query;

        const user = await User.findOne({
            verificationToken: token,
            verificationExpires: {$gt: Date.now()}
        });

        if(!user) return res.status(400).json({message: 'Token inválido ou expirado'});

        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();

        res.json({message: 'Email verificado com sucesso'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const refreshToken = async(req,res) =>{
    try{
        const{refreshToken} = req.body;

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if(!user?.refreshTokens.some(t => t.token === refreshToken)){
            return res.status(401).json({messsage: 'Refresh token inválido'});
        }

        const {accessToken} = generateTokens(user);
        res.json({accessToken});
    }catch(error){
        res.status(401).json({message: 'Token inválido'});
    }
};