const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'
        ]
    },

    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        // select: false,
    },
resetPasswordToken: String,
resetPasswordExpire: Date,
createdAt: {
    type: Date,
    default: Date.now
}
})


// Encrypt password using bcrypt 
// UserSchema.pre('save', async function(next) {
//     // const salt = await bcrypt.genSalt(10)
//     // this.password = await bcrypt.hash(this.password, salt)
//     await bcrypt.hash(this.password,10,(err,hash)=>{
//         err?console.log(err):this.password=hash
//     })
// })

// Sign a JWT and return 

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Match user entered password to hashed password in database

// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }


module.exports = mongoose.model('Users', UserSchema)