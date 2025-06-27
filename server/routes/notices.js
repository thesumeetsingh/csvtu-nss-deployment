const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Notice = require('../schemas/Notice');
const fs = require('fs');
const { drive } = require('../config/googleDrive');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

async function uploadToGoogleDrive(filePath, fileName) {
  try {
    const folderId = process.env.NOTICE_GOOGLE_DRIVE_FOLDER_ID;
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };
    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    return response.data.id;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
}

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { heading, date } = req.body;
    if (!heading || !date || !req.file) {
      return res.status(400).json({ error: 'Heading, date, and file are required' });
    }

    const filePath = req.file.path;
    const fileId = await uploadToGoogleDrive(filePath, req.file.originalname);

    const notice = new Notice({
      heading,
      date,
      googleDriveLink: fileId,
    });
    await notice.save();

    fs.unlinkSync(filePath);

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const noticeId = req.params.id;
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    await Notice.findByIdAndDelete(noticeId);
    res.json({ message: 'Notice deleted from database' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint to serve the PDF
router.get('/proxy/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log(`Proxy request for fileId: ${fileId}`);
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'mimeType',
    });

    const pdfStream = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    res.set('Content-Type', file.data.mimeType || 'application/pdf');
    pdfStream.data.on('error', (err) => {
      console.error('Stream error for fileId', fileId, ':', err);
      res.status(500).json({ error: 'Failed to stream PDF' });
    });
    pdfStream.data.pipe(res);
  } catch (error) {
    console.error('Proxy error for fileId', fileId, ':', error);
    res.status(500).json({ error: error.message });
  }
});

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