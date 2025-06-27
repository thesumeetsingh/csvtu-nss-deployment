const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadToDrive } = require('../utils/driveUploader');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

router.post('/image', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    const publicUrl = await uploadToDrive(filePath, fileName, folderId);
    fs.unlinkSync(filePath);

    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
