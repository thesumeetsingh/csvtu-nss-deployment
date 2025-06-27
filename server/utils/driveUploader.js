const { drive } = require('../config/googleDrive');
const fs = require('fs');
const path = require('path');

async function uploadToGoogleDrive(filePath, fileName) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };
    const media = {
      mimeType: 'image/jpeg', // Adjust based on file type (e.g., 'image/png')
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

module.exports = { uploadToGoogleDrive };