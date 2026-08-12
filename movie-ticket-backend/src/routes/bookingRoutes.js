const express = require("express");

const router = express.Router();

const {
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");


// Get logged-in user's bookings
router.get("/my", protect, getMyBookings);


// Cancel booking
router.put("/cancel/:id", protect, cancelBooking);


module.exports = router;