//////requirements and variables
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors")

//<!--const logger = require('./middleware/logger');-->
dotenv.config({ path: "./config/config.env" });
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler")

const nodeENV = process.env.NODE_ENV;
const nodePORT = process.env.PORT;

connectDB();
//////////////app
const app = express();

//body parser
app.use(express.json());

//////////middleware
//app.use(logger)
//we do not need to use the middleware 'logger' 
//because of the package MORGAN, which send us the data that we coded in logger.js and more.
if (nodeENV === "development") {
  app.use(morgan("dev"));
}

//bringing in our routers
app.use("/api/v1/bootcamps", bootcamps);

//middleware erros handling
app.use(errorHandler);

//our PORT
const PORT = nodePORT || 5000;

//putting app.listen in a variable, meaning to shut down the action when some error accessing the database occurs:
const server = app.listen(
  PORT,
  console.log(`Server running in ${nodeENV} mode on port ${PORT}`.yellow.bold)
);

//Handling promises rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close with the failure error (1)
  server.close(() => process.exit(1))
})