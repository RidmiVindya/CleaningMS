const express = require("express");
const Booking = require("../models/Booking");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a booking (customer only)
router.post("/", verifyToken, authorizeRoles("customer"), async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;

  try {
    const booking = new Booking({
      customer_name,
      address,
      date_time,
      service_id,
      user_id: req.user.id, // The user_id is taken from the JWT token
    });

    await booking.save();
    res.status(201).json(booking); // Send back the created booking
  } catch (err) {
    res.status(500).json({ error: "Error creating booking", details: err.message });
  }
});

// Admin: View all bookings
router.get("/admin", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find().populate("service_id").populate("user_id");
    res.status(200).json(bookings); // Send back all bookings
  } catch (err) {
    res.status(500).json({ error: "Error retrieving bookings", details: err.message });
  }
});

module.exports = router;
