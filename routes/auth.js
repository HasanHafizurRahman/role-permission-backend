const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined in models/User.js

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, 'yourJWTSecret', {
      expiresIn: '1h',
    });

    res.json({ token, role: user.role }); // Include role directly in the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get All Registered Users Route
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
