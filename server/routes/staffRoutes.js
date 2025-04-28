const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define Staff Schema
const StaffSchema = new mongoose.Schema({
    name: String,
    position: String,
    hometown: String,
    email: String,
    photo: String
});

// Important: Match your existing 'staff' collection in MongoDB
const Staff = mongoose.model('staff', StaffSchema, 'staff'); // force collection name to be "staff"

// GET /api/staff - Fetch all staff
router.get('/', async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (err) {
        console.error('Error fetching staff:', err);
        res.status(500).json({ message: 'Failed to load staff' });
    }
});

// POST /api/staff - Add new staff member
router.post('/', async (req, res) => {
    try {
        const newStaff = new Staff(req.body);
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        console.error('Error adding staff:', err);
        res.status(500).json({ message: 'Failed to add staff' });
    }
});

// PUT /api/staff/:id - Update staff member
router.put('/:id', async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStaff);
    } catch (err) {
        console.error('Error updating staff:', err);
        res.status(500).json({ message: 'Failed to update staff' });
    }
});

// DELETE /api/staff/:id - Delete staff member
router.delete('/:id', async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ message: 'Staff member deleted' });
    } catch (err) {
        console.error('Error deleting staff:', err);
        res.status(500).json({ message: 'Failed to delete staff' });
    }
});

module.exports = router;
