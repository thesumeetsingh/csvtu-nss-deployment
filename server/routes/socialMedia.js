const express = require('express');
   const SocialMedia = require('../schemas/SocialMedia');
   const authMiddleware = require('../middleware/auth');
   const router = express.Router();

   // Update Social Media Followers (Admin Only)
   router.put('/:platform', authMiddleware, async (req, res) => {
     if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });

     const { platform } = req.params;
     const { followerCount } = req.body;
     try {
       const socialMedia = await SocialMedia.findOneAndUpdate(
         { platform },
         { followerCount, updatedAt: Date.now() },
         { new: true, upsert: true }
       );
       res.json({ success: true, socialMedia });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   // Get All Social Media Followers
   router.get('/', async (req, res) => {
     try {
       const socialMedia = await SocialMedia.find();
       res.json({ success: true, socialMedia });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   module.exports = router;