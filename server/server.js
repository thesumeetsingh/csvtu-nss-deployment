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

// Fallback to index.html for unmatched routes
app.use((req, res, next) => {
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));