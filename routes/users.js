const express = require('express')
const {
    loadSignup,
    createUser,
} = require('../controllers/users')

const router = express.Router()

router
    .route('/')
    .get(loadSignup)

router
    .route('/signup')
    .get(createUser)
    .post(createUser)

module.exports = router