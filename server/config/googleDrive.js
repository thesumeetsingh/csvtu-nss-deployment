const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

let credentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
} catch (error) {
  console.error('Error parsing GOOGLE_CREDENTIALS:', error);
  throw new Error('Invalid GOOGLE_CREDENTIALS format');
}

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth: auth,
});

module.exports = { drive };