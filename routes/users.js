const express = require('express')
const {
    handleData,
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

router
.route('/data')
.post(handleData)

module.exports = router