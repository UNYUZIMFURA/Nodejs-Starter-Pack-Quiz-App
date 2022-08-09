const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [5, 'Password cannot be less than 5 characters'],
    }
})


UserSchema.methods.getToken = function () {
    return jwt.sign({ id: this._id },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE
        })
}

module.exports = mongoose.model('user', UserSchema)