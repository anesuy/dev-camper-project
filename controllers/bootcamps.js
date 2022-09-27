const errorHandler = require("../middleware/errorHandler");
const Bootcamp = require("../models/Bootcamp");

//@description => Get all bootcamps
//@route => GET /api/v1/bootcamps
//@access => none (Public)
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

//@description => Get bootcamp
//@route => GET /api/v1/bootcamps/:id
//@access => none (Public)
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      //it will be triggered the Id declared is a correctly formatted object Id but does not exist
      return next(error);
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    //it will be triggered the Id declared is not a correctly formatted object Id
    next(error);
  }
};

//@description => Post bootcamp
//@route => POST /api/v1/bootcamps/:id
//@access => Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error)
  }
};

//@description => Put bootcamp
//@route => PUT /api/v1/bootcamps/:id
//@access => Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body, //what we wanna insert
      {
        isValidisValidators: true,
      }
    );
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

//@description => DELETE bootcamp
//@route => DELETE /api/v1/bootcamps/:id
//@access => Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ sucess: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
