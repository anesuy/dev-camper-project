//middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);

  next();
}

module.exports = logger;

//this file is a example of a manually set consolle logger, which was not used, due the preference of using the morgan package. 
