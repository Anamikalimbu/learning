const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route files
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const userRoutes = require('./routes/userRoutes');
const { reviewRouter } = require('./routes/reviewRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRouter);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
