const express = require('express');
const router = express.Router();
// Import only the unified Region model
const Region = require('../models/Region');

/**
 * 1. GET ALL REGIONS (Admin/Debug)
 * Useful to see everything currently in the database.
 */
router.get('/regions', async (req, res) => {
    try {
        const regions = await Region.find();
        res.json(regions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * 2. GET REGIONS FOR A SPECIFIC CITY
 * This is the route your 'region-logic.js' uses.
 * Matches: /api/regions/Mumbai or /api/regions/Delhi
 */
router.get('/regions/:city', async (req, res) => {
    try {
        // Uses a case-insensitive regular expression to find the city
        const cityData = await Region.find({ 
            city: new RegExp(`^${req.params.city}$`, 'i') 
        });
        res.json(cityData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * 3. SEARCH CHEFS OR CUISINES
 * Searches within the nested structure for specific names or specialties.
 */
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        // Searches for chefs within the nested cuisines array
        const results = await Region.find({
            $or: [
                { "cuisines.cuisineName": { $regex: query, $options: 'i' } },
                { "cuisines.chefs.name": { $regex: query, $options: 'i' } },
                { "cuisines.chefs.specialties": { $regex: query, $options: 'i' } }
            ]
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;