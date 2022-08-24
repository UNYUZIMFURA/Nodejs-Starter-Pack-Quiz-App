const path = require('path')
const bcrypt = require('bcrypt')
const pathName = path.join(__dirname + '../../Frontend/signup.html')
const loginPath = path.join(__dirname + '../../Frontend/login.html')
const quizPath = path.join(__dirname + '../../Frontend/quiz.html')
const User = require('../models/User.js')

exports.loadSignup = (req, res) => {
  res.sendFile(pathName)
}

exports.createUser = (req, res) => {
  res.sendFile(pathName)
}

exports.getQuiz = (req, res) => {
  res.sendFile(quizPath)
}

exports.handleData = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res
      .status(400)
      .json({
        message: 'Fill all the fields!'
      })
    return
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hash
  })

  sendTokenResponse(user, 200, res)

}

exports.login = (req, res) => {
  res.sendFile(loginPath)
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res
      .status(400)
      .json({
        message: 'Fill all the fields!'
      })
    return
  }

  const user = await User.findOne({
    email
  })

  if (!user) {
    res.status(404).json({
      message: 'User not found!'
    })
    return
  }

  const matchPasswords = await bcrypt.compare(password, user.password)

  if (!matchPasswords) {
    res.status(400).json({
      message: "Incorrect password!"
    })
    return
  }

  sendTokenResponse(user, 200, res)
}

// Sending a Token

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getToken()

  const options = {
    expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      message: "Token Sent"
    })
}



