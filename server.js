const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("GharSe DB Connected"))
    .catch(err => console.log(err));

// Test Route
//app.get('/', (req, res) => res.send("GharSe API is Running"));

app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

module.exports = app;