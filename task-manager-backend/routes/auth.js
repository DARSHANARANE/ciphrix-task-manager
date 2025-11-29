const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User exists' });
    user = new User({ name, email, password, role });
    await user.save();
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch(err){
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch(err){
    console.error('Signin error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

module.exports = router;
