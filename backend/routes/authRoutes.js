const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      
      user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      
      const payload = { user: { id: user.id } };
  
      
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username });  
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  

module.exports = router;
