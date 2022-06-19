const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const bcrypt = require('bcrypt')
// Register user
// POST /api/v1/auth/register
// Public

exports.register = (req, res) => {
   const { name, email, password, role } = req.body
   bcrypt.hash(password, 10, (err, hash) => {
      if(err) return console.log(err)
          const user = new User({
            name: name,
            email: email,
            password: hash,
            role: role
         })
         user.save()
         sendTokenResponse(user, 200, res)
   })
   //Create user
   // Create token
}


//Login user
//POST /api/v1/auth/login
//Public

exports.login = async (req, res) => {
      const {email,password}=req.body;
      if(!email||!password){
          return res.status(401).json({
              success:false,
              message:"all fields are required!"
          })
      }
      const user=await User.findOne({email:email});
      if(!user){
          return res.status(401).json({
              success:false,
              message:"incorrect username or password!"
          })
      }
      console.log(password, user.password)
      const isMatch=bcrypt.compare(password,user.password);
      if(!isMatch){
          return res.status(401).json({
              success:false,
              message:"incorrect username or password!"
          })
      }

      // Call the token function
      sendTokenResponse(user, 200, res)
}

// Get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
        httpOnly: true
    }
    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token
    })
}