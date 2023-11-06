const help = require('../helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/Users.js');
require("dotenv").config();

exports.read = (req,res,next) => {
    
}; 

exports.register = async (req,res,next) => {
    Users.create(req.body)
    .then((data) => {
        console.log(data);
        res.json({
            status: true,
            message:"berhasil register!"
        });
    })
    .catch(next);
}; 

exports.login = async (req,res,next) => {
    try{

     const { username, password } = req.body;
     const user = await Users.findOne({ username });
     if (!user) {
         return res.status(401).json({
             message: "Username atau password salah!"
         });
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
         return res.status(401).json({
             message: "Username atau password salah!"
         });
     }

     if(req.headers["api-key"] != process.env.API_KEY){
        return res.status(401).json({
            message: "Api Key DiButuhKan!"
        });
     };

     const token = jwt.sign({
         id: user._id,
     }, process.env.API_KEY, {
         expiresIn: "1m" // expires in 24 hours
     });
     user.token = token;
     console.log(user);

     return res.json(user);

    }catch(err){

        return res.json({
            message: err.message
        });
    }
}; 

exports.update = (req,res,next) => {
    
};

exports.delete = (req,res,next) => {
    
};