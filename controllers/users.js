const User = require('../models/User')
const path = require('path')

exports.getQuiz = (req,res) => {
   
}

exports.loadSignup = (req,res) => {
   res.redirect('/signup')
}

exports.createUser = async(req,res) => {
   const pathName = path.join(__dirname + '../../Frontend/signup.html')
   res.sendFile(pathName)
   console.log(req.body)
}

exports.updateUser = (req,res) => {
    res.redirect('/signup')
}