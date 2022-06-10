const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        })
    } catch (err) {
       next(err)
    }
}

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public

exports.getBootcamp = async (req, res, next) => {
    try {
      const bootcamp = await Bootcamp.findById(req.params.id)  

      if(!bootcamp) {
         return  next(
             new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
         )
      }

      res.status(200).json({
          success: true,
          data: bootcamp
      })
    } catch (err) {
        next(err)
    }
}

//@desc Create new bootcamp
//@route POST api/v1/bootcamps
//@access Private

exports.createBootcamp = async (req, res) => {
    try {
        const bootcamp = Bootcamp(req.body)
        const saved = await bootcamp.save()
        res.status(201).json({
            success: true,
            data: saved
        })
    } catch (err) {
        next(err)
    }
}

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private

exports.updateBootcamp = async(req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
    
        if(!bootcamp) {
            next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400)
            )
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch(err) {
     next(err)
    }
}

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private

exports.deleteBootcamp = async (req, res, next) => {
   try {
       const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

       if(!bootcamp) {
          next (
              new Response(`Bootcamp not found with id of ${req.params.id}`, 404)
          )
       }
       res.status(200).json({
           success: true,
           data: {}
       })
   } catch (err) {
       next(err)
   }
}