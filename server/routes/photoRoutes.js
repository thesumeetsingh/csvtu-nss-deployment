const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadToGoogleDrive } = require('../utils/driveUploader');
const Photo = require('../schemas/Photo');
const fs = require('fs');
const { drive } = require('../config/googleDrive');

// Multer configuration for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !req.file) {
      return res.status(400).json({ error: 'Title and photo are required' });
    }

    const filePath = req.file.path;
    const fileId = await uploadToGoogleDrive(filePath, req.file.originalname);

    const photo = new Photo({
      title,
      googleDriveLink: fileId,
    });
    await photo.save();

    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'Photo uploaded successfully', fileId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint to serve the image
router.get('/proxy/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log(`Proxy request for fileId: ${fileId}`);
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'mimeType',
    });

    const imageStream = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    res.set('Content-Type', file.data.mimeType || 'image/jpeg');
    imageStream.data.on('error', (err) => {
      console.error('Stream error for fileId', fileId, ':', err);
      res.status(500).json({ error: 'Failed to stream image' });
    });
    imageStream.data.pipe(res);
  } catch (error) {
    console.error('Proxy error for fileId', fileId, ':', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete photo from MongoDB
router.delete('/:id', async (req, res) => {
  try {
    const photoId = req.params.id;
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    await Photo.findByIdAndDelete(photoId);
    res.json({ message: 'Photo deleted from database' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file from Google Drive
router.delete('/proxy/delete/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    await drive.files.delete({
      fileId: fileId,
    });
    res.json({ message: 'File deleted from Google Drive' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;