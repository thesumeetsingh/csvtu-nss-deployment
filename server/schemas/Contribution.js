const mongoose = require('mongoose');

   const contributionSchema = new mongoose.Schema({
     type: { type: String, enum: ['volunteers', 'treesPlanted', 'specialCamps', 'nssUnits'], required: true, unique: true },
     count: { type: Number, required: true, min: 0 },
     updatedAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('Contribution', contributionSchema);