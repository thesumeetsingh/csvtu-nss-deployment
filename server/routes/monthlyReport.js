const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const MonthlyReport = require('../schemas/monthlyReport');
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
    const folderId = process.env.GOOGLE_DRIVE_MONTHLY_REPORT_FOLDER_ID;
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
    const { month, year } = req.body;
    const title = `Monthly Report ${month} ${year}`;
    if (!month || !year || !req.file) {
      return res.status(400).json({ error: 'Month, year, and file are required' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    const filePath = req.file.path;
    const fileId = await uploadToGoogleDrive(filePath, req.file.originalname);

    const monthlyReport = new MonthlyReport({
      title,
      month,
      year,
      googleDriveLink: fileId,
    });
    await monthlyReport.save();

    fs.unlinkSync(filePath);

    res.status(201).json(monthlyReport);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reports = await MonthlyReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await MonthlyReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    await MonthlyReport.findByIdAndDelete(reportId);
    await drive.files.delete({ fileId: report.googleDriveLink });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint to serve the PDF
router.get('/proxy/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
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

module.exports = router;