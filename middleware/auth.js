const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
    let token

    if (req.cookies.token) {
        token = req.cookies.token
    }

    if (!token) {
        console.log('Token Related Error')
        res.redirect('/login')
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        console.log(err)
        console.log('Not authorized to access this route!')
    }
}
