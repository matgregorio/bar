const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: [true, 'Nome é obrigatório'],
        trim: true
    },
    email:{
        type:String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    senha:{
        type: String,
        required:[true, 'Senha é obrigatória'],
        minlength:[8, 'A senha deve ter no mínimo 8 caracteres'],
        select: false
    },
    cargo:{
        type: String,
        enum:['user', 'admin', 'garcom'],
        default: 'user'
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationExpires: Date,
    refreshTokens:[{
        token: String,
        expires: Date
    }]
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha,10);
    next();
})

export default mongoose.model('User', userSchema);