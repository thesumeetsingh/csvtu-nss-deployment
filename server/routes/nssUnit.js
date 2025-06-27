const express = require('express');
const router = express.Router();
const NSSUnit = require('../schemas/NSSUnit');

// Create a new NSS unit
router.post('/', async (req, res) => {
  try {
    const { unitName, category, programOfficer, eti, mobileNo, allotment, district } = req.body;
    const nssUnit = new NSSUnit({
      unitName,
      category,
      programOfficer,
      eti,
      mobileNo,
      allotment,
      district,
    });
    await nssUnit.save();
    res.status(201).json(nssUnit);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate unit name or serial number. Please use a unique unit name.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Get all NSS units
router.get('/', async (req, res) => {
  try {
    const nssUnits = await NSSUnit.find().sort({ createdAt: -1 });
    res.json(nssUnits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an NSS unit
router.delete('/:id', async (req, res) => {
  try {
    const nssUnit = await NSSUnit.findById(req.params.id);
    if (!nssUnit) {
      return res.status(404).json({ error: 'NSS Unit not found' });
    }
    await NSSUnit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'NSS Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;