const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  date: { type: Date, required: true },
  googleDriveLink: { type: String, required: true }, // Store Google Drive file ID
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);