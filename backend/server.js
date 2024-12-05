const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.DB_URI, { dbName: "CleaningMS"})
  .then(() => {
    console.log('Connected to DB Successfully');

    app.listen(5000, "localhost",() => console.log("Listening to port 5000"));
  })

  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingRoutes); // Booking routes
app.use('/api/services', serviceRoutes); // Service routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
