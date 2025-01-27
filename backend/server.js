const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');
const helmet = require('helmet');
const { auditMiddleware } = require('./middlewares/auditMiddleware');

const app = express();

//middlware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(auditMiddleware)
require('dotenv').config();

connectDB();


app.use('/api/auth', authRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

