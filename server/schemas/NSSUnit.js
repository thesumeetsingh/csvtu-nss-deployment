const mongoose = require('mongoose');
const Counter = require('./Counter');

const nssUnitSchema = new mongoose.Schema({
  serialNo: { type: String, required: true, unique: true, default: () => `NSS-TMP-${Date.now()}` }, // Temporary default
  unitName: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  programOfficer: { type: String, required: true },
  eti: { type: String },
  mobileNo: { type: String, required: true },
  allotment: { type: String, required: true },
  district: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-increment serialNo using a counter
nssUnitSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'nssunitseq' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.serialNo = `NSS-${String(counter.sequence_value).padStart(3, '0')}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('NSSUnit', nssUnitSchema);