const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: String,
  age: Number,
  specialties: [String],
  price: Number,
  image: String
});

const cuisineSchema = new mongoose.Schema({
  cuisineName: String,
  chefs: [chefSchema]
});

const regionSchema = new mongoose.Schema({
  city: String,
  regionNumber: Number,
  regionName: String,
  areas: [String],
  cuisines: [cuisineSchema]
});

module.exports = mongoose.model('Region', regionSchema);