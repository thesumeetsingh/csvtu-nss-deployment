require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: ['http://localhost:5173', 'https://csvtu.ac.in/NSS_CSVTU/', 'https://csvtu-nss-deployment.onrender.com'],
  credentials: true 
}));

// Serve static files
app.use('/notice', express.static(path.join(__dirname, 'src/notice')));
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Routes
console.log('Loading auth routes');
app.use('/api/auth', require('./routes/auth'));
console.log('Loading social-media routes');
app.use('/api/social-media', require('./routes/socialMedia'));
console.log('Loading contributions routes');
app.use('/api/contributions', require('./routes/contributions'));
console.log('Loading nss-units routes');
app.use('/api/nss-units', require('./routes/nssUnit'));
console.log('Loading notices routes');
app.use('/api/notices', require('./routes/notices'));
console.log('Loading monthly-reports routes');
app.use('/api/monthly-reports', require('./routes/monthlyReport'));
console.log('Loading photos routes');
app.use('/api/photos', require('./routes/photoRoutes'));
console.log('Loading contact routes');
app.use('/api/contact', require('./routes/contact'));
console.log('Loading feedback routes');
app.use('/api/feedback', require('./routes/feedbackRoute'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Client-side routing with individual routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/awards', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/notice', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/about-us', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/aim-objective', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/admin-structure', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/nss-units', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/coordinator', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/social-media', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/contributions', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/notice', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/nss-units', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/uploadphoto', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/dashboard/upload-monthly-report', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/organisation/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/documents/monthly-reports', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/documents/announcements', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/documents/nss-manual', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Load schemas
require('./schemas/Notice');
require('./schemas/monthlyReport');

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err.message, err.stack));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));