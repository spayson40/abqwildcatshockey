const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Schedule schema
const ScheduleSchema = new mongoose.Schema({
  date: Date,
  time: String,
  opponent: String,
  location: String,
  winloss: String,
  score: String
});

// Create the model - NOTICE: Now correctly using 'Schedule' model name
const Schedule = mongoose.model('Schedule', ScheduleSchema);

// GET /api/schedule - Fetch all games
router.get('/', async (req, res) => {
  try {
    const games = await Schedule.find();
    res.json(games);
  } catch (err) {
    console.error('Error fetching schedule:', err);
    res.status(500).json({ message: 'Failed to load schedule' });
  }
});

// POST /api/schedule - Add a new game
router.post('/', async (req, res) => {
  try {
    const newGame = new Schedule(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    console.error('Error adding game:', err);
    res.status(500).json({ message: 'Failed to add game' });
  }
});

// PUT /api/schedule/:id - Update a game
router.put('/:id', async (req, res) => {
  try {
    const updatedGame = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGame);
  } catch (err) {
    console.error('Error updating game:', err);
    res.status(500).json({ message: 'Failed to update game' });
  }
});

// DELETE /api/schedule/:id - Delete a game
router.delete('/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (err) {
    console.error('Error deleting game:', err);
    res.status(500).json({ message: 'Failed to delete game' });
  }
});

module.exports = router;
