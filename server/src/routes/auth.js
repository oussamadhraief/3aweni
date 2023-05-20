const express = require('express');
const passport = require('passport');
const User = require('../user/UserModel');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new UserModel({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ success: true, user: req.user })
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

module.exports = router;
