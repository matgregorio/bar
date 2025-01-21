const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('MongoDB conectado');
}).catch((err)=>{
    console.log('Erro de conexão com MongoDB', err);
});


app.use('/api/users', userRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

