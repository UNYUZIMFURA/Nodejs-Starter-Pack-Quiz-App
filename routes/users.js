const express = require('express')
const {
    loadSignup, 
    getQuiz,
    createUser,
    updateUser, 
    deleteUser 
} = require('../controllers/users')
const router = express.Router()

router
.route('/')
.get(getQuiz)


router
.route('/signup')
.get(createUser)
.post(createUser)

module.exports = router