const express = require('express');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
   const User = require('../schemas/User');
   const router = express.Router();

   // Login
   router.post('/login', async (req, res) => {
     const { username, password } = req.body;
     try {
       const user = await User.findOne({ username });
       if (!user) return res.status(400).json({ success: false, message: 'Invalid username or password' });

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid username or password' });

       const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ success: true, username: user.username, role: user.role, token });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   // Create Admin (Temporary)
   router.post('/create-admin', async (req, res) => {
     const { username, password } = req.body;
     try {
       const existingUser = await User.findOne({ username });
       if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

       const hashedPassword = await bcrypt.hash(password, 10);
       const admin = new User({ username, password: hashedPassword, role: 'admin' });
       await admin.save();
       res.json({ success: true, message: `Admin user '${username}' created` });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   module.exports = router;