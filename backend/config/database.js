const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB conectado');
    }).catch((err) => {
        console.log('Erro de conexão com MongoDB', err.message);
        process.exit(1);
    });
};

module.exports = connectDB;