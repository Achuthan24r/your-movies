const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Show = require("../models/Show");

// ========================================
// CREATE BOOKING
// POST /api/bookings
// ========================================

const createBooking = async (req, res) => {
  try {
    console.log("================================");
    console.log("CREATE BOOKING");
    console.log("================================");

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { show, seats, totalAmount } = req.body;

    // -----------------------------
    // Validate show
    // -----------------------------

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

    // -----------------------------
    // Validate seats
    // -----------------------------

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one seat is required",
      });
    }

    // Remove duplicate seats from same request
    const requestedSeats = [
      ...new Set(
        seats
          .map((seat) => String(seat).trim())
          .filter(Boolean)
      ),
    ];

    if (requestedSeats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat selection",
      });
    }

    // -----------------------------
    // Find show
    // -----------------------------

    const showData = await Show.findById(show);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // -----------------------------
    // Check show status
    // -----------------------------

    if (showData.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This show has been cancelled",
      });
    }

    // -----------------------------
    // Check available seat count
    // -----------------------------

    if (
      requestedSeats.length >
      showData.availableSeats
    ) {
      return res.status(400).json({
        success: false,
        message: `Only ${showData.availableSeats} seats are available`,
      });
    }

    // ========================================
    // IMPORTANT:
    // Find seats already booked for this show
    // ========================================

    const existingBookings = await Booking.find({
      show: show,
      status: "Confirmed",
    });

    const bookedSeats = [];

    existingBookings.forEach((booking) => {
      booking.seats.forEach((seat) => {
        bookedSeats.push(String(seat));
      });
    });

    // -----------------------------
    // Find duplicate seats
    // -----------------------------

    const alreadyBooked = requestedSeats.filter(
      (seat) => bookedSeats.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Some seats are already booked",
        seats: alreadyBooked,
      });
    }

    // ========================================
    // CREATE BOOKING
    // ========================================

    const booking = await Booking.create({
      user: req.user._id,
      show: show,
      seats: requestedSeats,
      totalAmount: Number(totalAmount) || 0,
      status: "Confirmed",
    });

    // ========================================
    // REDUCE AVAILABLE SEATS
    // ========================================

    showData.availableSeats -= requestedSeats.length;

    await showData.save();

    console.log(
      "Seats booked:",
      requestedSeats
    );

    console.log(
      "Remaining seats:",
      showData.availableSeats
    );

    // ========================================
    // GET POPULATED BOOKING
    // ========================================

    const populatedBooking =
      await Booking.findById(booking._id)
        .populate({
          path: "show",
          populate: [
            {
              path: "movie",
              select: "title poster genre duration",
            },
            {
              path: "screen",
            },
          ],
        });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });

  } catch (error) {
    console.error("================================");
    console.error("CREATE BOOKING ERROR");
    console.error("================================");
    console.error(error);

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
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
            select: "title poster genre duration",
          },
          {
            path: "screen",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    console.error(
      "Get My Bookings Error:",
      error
    );

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

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // -----------------------------
    // Find booking
    // -----------------------------

    const booking = await Booking.findById(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // -----------------------------
    // Check ownership
    // -----------------------------

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to cancel this booking",
      });
    }

    // -----------------------------
    // Already cancelled
    // -----------------------------

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // -----------------------------
    // Find show
    // -----------------------------

    const show = await Show.findById(
      booking.show
    );

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // ========================================
    // RETURN SEATS TO AVAILABLE COUNT
    // ========================================

    show.availableSeats += booking.seats.length;

    await show.save();

    // ========================================
    // MARK BOOKING CANCELLED
    // ========================================

    booking.status = "Cancelled";

    await booking.save();

    console.log(
      "Booking cancelled:",
      booking._id
    );

    console.log(
      "Seats returned:",
      booking.seats.length
    );

    console.log(
      "Available seats:",
      show.availableSeats
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });

  } catch (error) {
    console.error(
      "Cancel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// EXPORT
// ========================================

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};