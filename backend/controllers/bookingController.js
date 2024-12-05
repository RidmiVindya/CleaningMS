const Booking = require('../models/Booking');

// GET all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service_id').populate('user_id');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service_id').populate('user_id');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new booking
const createBooking = async (req, res) => {
  try {
  
    const booking = new Booking(req.body);
    console.log(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a booking
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a booking
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
