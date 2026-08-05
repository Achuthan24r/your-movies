const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// User
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);

// Admin
router.get("/", protect, admin, getAllBookings);

module.exports = router;