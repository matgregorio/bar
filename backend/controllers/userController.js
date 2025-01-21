const User = require('../models/userModel');

module.exports = class userController{
    static async createUser(req, res){
        const{nome, email, senha} = req.body;

        try{
            const newUser = new User({nome,email,senha});
            await newUser.save();
            res.status(201).json(newUser);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    static async getUsers(req, res){
        try{
            const users = await User.find();
            res.status(200).json(users);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }
}