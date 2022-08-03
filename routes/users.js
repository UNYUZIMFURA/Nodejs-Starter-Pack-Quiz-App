const express = require('express')
const {
    handleData,
    loadSignup,
    createUser,
    login,
    loginUser,
    getQuiz
} = require('../controllers/users')

const router = express.Router()

const { protect } = require('../middleware/auth')

router
    .route('/')
    .get(loadSignup)

router
    .route('/signup')
    .get(createUser)

router
.route('/data')
.post(handleData)

router
.route('/login')
.get(login)

router
.route('/loginUser')
.post(loginUser)

router
.route('/quiz')
.get(protect, getQuiz)

module.exports = router