const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    else if (req.cookies.token) {
        token = req.cookies.token
        console.log(token)
    }

    if (!token) {
        console.log('Not authorized to access this route')
        res.redirect('/login')
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        console.log(req.user)
           
    } catch (err) {
        console.log('Not authorized to access this route')
    }
}
