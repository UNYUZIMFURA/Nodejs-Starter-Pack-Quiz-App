const mongoose = require('mongoose')

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
        maxlength: [20, 'Password must be a maximum of 20 characters'],
        minlength: [3, 'Password must be a minimum of 3 characters'],
        required: [true, 'Please add a password'],
    }
})