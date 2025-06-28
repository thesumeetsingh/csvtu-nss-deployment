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
const authRoutes = require('./routes/auth');
const socialMediaRoutes = require('./routes/socialMedia');
const contributionRoutes = require('./routes/contributions');
const nssUnitRoutes = require('./routes/nssUnit');
const noticeRoutes = require('./routes/notices');
const monthlyReportRoutes = require('./routes/monthlyReport');
const contactRoutes = require('./routes/contact');
const feedbackRoute = require('./routes/feedbackRoute');

app.use('/api/auth', authRoutes);
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/nss-units', nssUnitRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/monthly-reports', monthlyReportRoutes);
app.use('/api/photos', require('./routes/photoRoutes'));
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoute);

// Fallback to index.html for unmatched routes
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Load schemas
require('./schemas/Notice');
require('./schemas/monthlyReport');

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err.message, err.stack));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));