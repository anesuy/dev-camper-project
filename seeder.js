const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Loading the env variables  
dotenv.config({ path: './config/config.env'});

// Load models  
const Bootcamp = require('./models/Bootcamp');

// Connect with MongoDB 
mongoose.connect(process.env.MONGO_URI);

// Read and parse JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8'));

//Import the data parsed into MongoDB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

//Delete the data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data deleted...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

// Import or delete? Sure!
if (process.argv[2] === '-i') {
  importData();
  //meaning "node seeder -i" on terminal
} else if (process.argv[2] === '-d') {
  deleteData();
  //meaning "node seeder -d" on terminal
}
