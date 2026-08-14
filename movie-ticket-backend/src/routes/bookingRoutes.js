const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ======================================================
// USER - CREATE BOOKING
// POST /api/bookings
// ======================================================

router.post("/", protect, createBooking);

// ======================================================
// USER - GET MY BOOKINGS
// GET /api/bookings/my
// ======================================================

router.get("/my", protect, getMyBookings);

// ======================================================
// USER - CANCEL BOOKING
// PUT /api/bookings/cancel/:id
// ======================================================

router.put("/cancel/:id", protect, cancelBooking);

// ======================================================
// ADMIN - GET ALL BOOKINGS
// GET /api/bookings
// ======================================================

router.get("/", protect, admin, getAllBookings);

module.exports = router;