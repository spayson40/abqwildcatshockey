const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Admin = require('../models/Admin.js');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // Set session in frontend — your logic may vary
  res.json({ message: 'Login successful' });
});

module.exports = router;
