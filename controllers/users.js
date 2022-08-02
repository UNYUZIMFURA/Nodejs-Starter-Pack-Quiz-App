const User = require('../models/User')
const path = require('path')
const pathName = path.join(__dirname + '../../Frontend/signup.html')

exports.loadSignup = (req, res) => {
   res.sendFile(pathName)
}

exports.createUser = async (req, res) => {
   res.sendFile(pathName)
   console.log(req.body)
}

exports.updateUser = (req, res) => {
   res.redirect('/signup')
}