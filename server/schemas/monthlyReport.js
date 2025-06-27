const mongoose = require('mongoose');

const monthlyReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  month: { type: String, required: true, enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  year: { type: Number, required: true, min: 2000, max: 2100 },
  googleDriveLink: { type: String, required: true }, // Store Google Drive file ID
}, { timestamps: true });

module.exports = mongoose.model('MonthlyReport', monthlyReportSchema);