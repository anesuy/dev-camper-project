const errorHandler = require("../middleware/errorHandler");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');
//@description => Get all bootcamps
//@route => GET /api/v1/bootcamps
//@access => none (Public)
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//@description => Get bootcamp
//@route => GET /api/v1/bootcamps/:id
//@access => none (Public)
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    //it will be triggered the Id declared is a correctly formatted object Id but does not exist
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@description => Post bootcamp
//@route => POST /api/v1/bootcamps/:id
//@access => Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@description => Put bootcamp
//@route => PUT /api/v1/bootcamps/:id
//@access => Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body, //what we wanna insert
    {
      isValidisValidators: true,
    }
  );
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@description => DELETE bootcamp
//@route => DELETE /api/v1/bootcamps/:id
//@access => Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
});
