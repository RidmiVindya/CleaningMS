const express = require('express');
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

// CRUD Endpoints for Bookings
router.get('/', getAllBookings);             // GET all bookings
router.get('/:id', getBookingById);          // GET booking by ID
router.post('/', createBooking);             // CREATE new booking
router.put('/:id', updateBooking);           // UPDATE booking
router.delete('/:id', deleteBooking);        // DELETE booking

module.exports = router;
