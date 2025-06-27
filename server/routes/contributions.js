const express = require('express');
   const Contribution = require('../schemas/Contribution');
   const authMiddleware = require('../middleware/auth');
   const router = express.Router();

   // Update Contribution Count (Admin Only)
   router.put('/:type', authMiddleware, async (req, res) => {
     if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });

     const { type } = req.params;
     const { count } = req.body;
     try {
       const contribution = await Contribution.findOneAndUpdate(
         { type },
         { count, updatedAt: Date.now() },
         { new: true, upsert: true }
       );
       res.json({ success: true, contribution });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   // Get All Contributions
   router.get('/', async (req, res) => {
     try {
       const contributions = await Contribution.find();
       res.json({ success: true, contributions });
     } catch (err) {
       res.status(500).json({ success: false, message: 'Server error' });
     }
   });

   module.exports = router;