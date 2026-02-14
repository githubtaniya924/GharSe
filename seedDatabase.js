const mongoose = require('mongoose');
const Region = require('./models/Region');
const mumbaiData = require('./data/mumbai.json');
const delhiData = require('./data/delhi.json');
const bangloreData = require('./data/banglore.json');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Clear old data so you don't have duplicates or old formats
    await Region.deleteMany({}); 

    // 2. Insert new nested data
   const result = await Region.insertMany([...mumbaiData, ...delhiData, ...bangloreData]);
   console.log(`Success: ${result.length} regions uploaded to the database!`);
   
   process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();