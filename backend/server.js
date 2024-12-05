const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.DB_URI, { dbName: "CleaningMS" })
  .then(() => {
    console.log('Connected to DB Successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with a non-zero status code if MongoDB fails
  });

// Routes
app.use('/api/bookings', bookingRoutes); // Booking routes
app.use('/api/services', serviceRoutes); // Service routes

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace for debugging
  res.status(500).json({
    message: 'Something went wrong on the server.',
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
