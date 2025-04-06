// /server/routes/rosterRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Roster schema
const RosterSchema = new mongoose.Schema({
  playernumber: Number,
  position: String,
  name: String,
  birthyear: Number,
  hometown: String,
  photo: String
});

// Connect the schema to the correct collection name: "roster"
const Player = mongoose.model('Player', RosterSchema, 'roster');

// GET /api/roster - Fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ message: 'Failed to load roster data' });
  }
});

module.exports = router;
