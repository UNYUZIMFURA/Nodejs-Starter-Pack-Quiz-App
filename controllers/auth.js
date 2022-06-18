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
        const token =  user.getSignedToken()
         res.status(201).json({
            success:true,
            message:"user created successfully",
            token
         })
   
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

      const token = user.getSignedToken()
      res.status(200).json({
          success:true,
          message:"user logged in successfully!",
          user,
          token
      })
}