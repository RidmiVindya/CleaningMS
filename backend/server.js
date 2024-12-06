const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all origins (You can restrict this to specific origins later for security)
app.use(cors());

// If you need to restrict CORS to specific origins, you can do it like this:
// app.use(cors({
//   origin: 'http://localhost:5173'  // Your frontend URL here
// }));

console.log("JWT_SECRET:", process.env.JWT_SECRET);

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
app.use("/api/users", userRoutes);
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
