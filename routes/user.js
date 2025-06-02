const express = require('express');
const router = express.Router();
const { User } = require('../collection');
const bcrypt = require('bcrypt');

// POST /api/register
router.post('/register', async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Check for missing fields
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

module.exports = router;
