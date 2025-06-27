const mongoose = require('mongoose');

   const socialMediaSchema = new mongoose.Schema({
     platform: { type: String, enum: ['instagram', 'youtube', 'twitter', 'facebook'], required: true, unique: true },
     followerCount: { type: Number, required: true, min: 0 },
     updatedAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('SocialMedia', socialMediaSchema);