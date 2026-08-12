const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Show = require("../models/Show");

// =====================================================
// GET MY BOOKINGS
// GET /api/bookings/my
// =====================================================

const getMyBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("movie", "title poster genre language duration")
      .populate("theatre", "name city address")
      .populate("screen", "name screenType totalSeats")
      .populate("show", "showDate showTime ticketPrice status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CREATE BOOKING
// POST /api/bookings
// =====================================================

const createBooking = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const {
      show,
      movie,
      theatre,
      screen,
      seats,
      totalAmount,
    } = req.body;

    if (!show) {
      return res.status(400).json({
        success: false,
        message: "Show ID is required",
      });
    }

    if (!movie) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }

    if (!theatre) {
      return res.status(400).json({
        success: false,
        message: "Theatre ID is required",
      });
    }

    if (!screen) {
      return res.status(400).json({
        success: false,
        message: "Screen ID is required",
      });
    }

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one seat",
      });
    }

    if (totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({
        success: false,
        message: "Total amount is required",
      });
    }

    const showData = await Show.findById(show);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    if (showData.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This show has been cancelled",
      });
    }

    if (showData.availableSeats < seats.length) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      show,
      movie,
      theatre,
      screen,
      seats,
      totalAmount,
      status: "Confirmed",
    });

    showData.availableSeats -= seats.length;

    await showData.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("movie", "title poster genre language duration")
      .populate("theatre", "name city address")
      .populate("screen", "name screenType totalSeats")
      .populate("show", "showDate showTime ticketPrice status");

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CANCEL BOOKING
// PUT /api/bookings/cancel/:id
// =====================================================

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    console.log("Cancel Booking ID:", bookingId);
    console.log("Logged in User:", req.user?._id);

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

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
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
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this booking",
      });
    }

    // Already cancelled
    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // Restore seats to show
    if (booking.show) {
      const show = await Show.findById(booking.show);

      if (show) {
        show.availableSeats += booking.seats.length;

        await show.save();
      }
    }

    booking.status = "Cancelled";

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("movie", "title poster genre language duration")
      .populate("theatre", "name city address")
      .populate("screen", "name screenType totalSeats")
      .populate("show", "showDate showTime ticketPrice status");

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// =====================================================

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(bookingId)
      .populate("movie", "title poster genre language duration")
      .populate("theatre", "name city address")
      .populate("screen", "name screenType totalSeats")
      .populate("show", "showDate showTime ticketPrice status");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.user &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this booking",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyBookings,
  createBooking,
  cancelBooking,
  getBookingById,
};