const path = require('path')
const bcrypt = require('bcrypt')
const pathName = path.join(__dirname + '../../Frontend/signup.html')
const User = require('../models/User.js')

exports.loadSignup = (req, res) => {
  res.sendFile(pathName)
}

exports.createUser = (req, res) => {
  res.sendFile(pathName)
}

exports.handleData = async (req, res) => {
  const { name, email, password } = req.body

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hash
  })
  
  console.log(user)
  res.status(200).json({
    success: true
  })
}
