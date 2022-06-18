const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// Register user
// POST /api/v1/auth/register
// Public

exports.register = asyncHandler(async (req, res, next) => {
   const { name, email, password, role } = req.body

   //Create user
   const user = await User.create({
      name,
      email,
      password,
      role
   })

   await user.save()

   // Create token

   const token = user.getSignedToken()
   res.status(200).json({
      success: true,
      token
   })
})


//Login user
//POST /api/v1/auth/login
//Public

exports.login = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body

// Validate email & password

if(!email ) {

}

   // Create token
   const token = user.getSignedToken()
   res.status(200).json({
      success: true,
      token
   })
})