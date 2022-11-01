const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder')

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, write a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name must be under a 50 characters length'],
  }, 
  slug: String,  
  description: {
    type: String, 
    required: [true, 'Please, write a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  website: {
    type: String, 
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, //from stackOverflow
      'Please, use a valid URL with HTTP or HTTPS'
    ],
  },
  phone : {
    type: String, 
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String, 
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, //from stackOverflow
      'Please, add a valid e-mail'
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      //required: true
    },
    coordinates: {
      type: [Number],
      //required: true,
      index: '2dsphere'
    },
    formattedAdress: String,
    street: String, 
    city: String, 
    state: String, 
    zipcode: String, 
    country: String, 
  },
  careers: {
    type: [String],
    required:true, 
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number, 
    min: [1, 'Raitng must be at least 1'],
    max: [10, 'Rating must be under a 1-10 grade score']
  },
  averageCost: Number, 
  photo: {
    type: 'String',
    deafult: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean, 
    default: false,
  },
  jobGuarantee: {
    type: Boolean, 
    default: false
  },
  acceptGi: {
    type: Boolean, 
    default: false,
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

//Create bootcamp slug from the name
//it accours before the saving
BootcampSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower : true})
  next();
})


//Geocode & create location field
BootcampSchema.pre('save', async function(next){
  const geoLocation = await geocoder.geocode(this.address);
  //geoLocation is returned as an array
  console.log(geoLocation)
  this.location = {
    type: 'Point',
    coordinates: [geoLocation[0].longitude, geoLocation[0].latitude],
    formattedAdress: geoLocation[0].formattedAddress,
    street: geoLocation[0].streetName, 
    city: geoLocation[0].city, 
    state: geoLocation[0].stateCode, 
    zipcode: geoLocation[0].zipcode, 
    country: geoLocation[0].countryCode,
  }

  //we can change the address field too
  this.address = this.location.formattedAdress;
  next();
})


module.exports = mongoose.model('Bootcamp', BootcampSchema);