const mongoose = require('mongoose');

// 1. City Schema
const CitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true } // e.g., Mumbai
});

// 2. Region Schema
const RegionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., Bandra
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    description: String
});

// 3. Chef Schema
const ChefSchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
    cuisines: [String], // Array of the 12 fixed cuisines
    specialization: String,
    rating: { type: Number, default: 4.5 },
    priceRange: String, // e.g., "₹500 - ₹1000"
    image: String // URL for profile pic
});

// 4. Dish Schema
const DishSchema = new mongoose.Schema({
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' },
    name: String,
    price: Number,
    isVeg: Boolean,
    category: String // e.g., "Signature"
});

module.exports = {
    City: mongoose.model('City', CitySchema),
    Region: mongoose.model('Region', RegionSchema),
    Chef: mongoose.model('Chef', ChefSchema),
    Dish: mongoose.model('Dish', DishSchema)
};