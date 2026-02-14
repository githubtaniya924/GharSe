const mongoose = require('mongoose');
const Region = require('./models/Region');
require('dotenv').config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const data = await Region.findOne({ city: "Mumbai" });
    
    // Using JSON.stringify makes the nested chefs/cuisines easy to read
    console.log(JSON.stringify(data, null, 2)); 
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
check();