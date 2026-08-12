const mongoose = require("mongoose");
const Booking = require("../models/Booking");

// ========================================
// CREATE BOOKING
// POST /api/bookings
// ========================================

const createBooking = async (req, res) => {
  try {
    console.log("Create Booking Body:", req.body);
    console.log("Logged User:", req.user?._id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const {
      show,
      seats,
      totalAmount,
    } = req.body;

    if (!show) {
      return res.status(400).json({
        success: false,
        message: "Show ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(show)) {
      return res.status(400).json({
        success: false,
        message: "Invalid show ID",
      });
    }

    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one seat is required",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      show,
      seats,
      totalAmount: Number(totalAmount) || 0,
      status: "Confirmed",
    });

    const populatedBooking = await Booking.findById(
      booking._id
    ).populate("show");

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET MY BOOKINGS
// GET /api/bookings/my
// ========================================

const getMyBookings = async (req, res) => {
  try {
    console.log("Get My Bookings User:", req.user?._id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("show")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// CANCEL BOOKING
// PUT /api/bookings/cancel/:id
// ========================================

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    console.log("Cancel Booking ID:", bookingId);
    console.log("Logged User:", req.user?._id);

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check ownership
    if (
      booking.user &&
      req.user &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this booking",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};