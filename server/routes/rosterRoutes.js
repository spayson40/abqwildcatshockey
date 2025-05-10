// server/routes/rosterRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the schema
const RosterSchema = new mongoose.Schema({
  playernumber: Number,
  position: String,
  name: String,
  birthyear: Number,
  hometown: String,
  photo: String
});

// Model using the 'roster' collection
const Player = mongoose.model('Player', RosterSchema, 'roster');

// GET all players, sorted by playernumber
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ playernumber: 1 }); // sort ascending
    res.json(players);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ message: 'Failed to load roster' });
  }
});

// POST new player
router.post('/', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (edit) player
router.put('/:id', async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
