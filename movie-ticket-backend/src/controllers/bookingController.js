const Booking = require("../models/Booking");
const Show = require("../models/Show");

// =====================================================
// CREATE BOOKING
// =====================================================
const createBooking = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Logged-in User:", req.user);

    const booking = await Booking.create({
      user: req.user.id,
      show: req.body.show,
      seats: req.body.seats,
      totalSeats: req.body.totalSeats,
      totalAmount: req.body.totalAmount,
      paymentStatus: "Paid",
      bookingStatus: "Booked",
    });

    console.log("Created Booking:", booking);

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};;

// =====================================================
// GET ALL BOOKINGS - ADMIN
// =====================================================
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
            select: "title language duration poster",
          },
          {
            path: "screen",
            select: "name screenType totalSeats",
            populate: {
              path: "theatre",
              select: "name city address",
            },
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("GET ALL BOOKINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET MY BOOKINGS
// =====================================================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
            select:
              "title language duration poster",
          },
          {
            path: "screen",
            select:
              "name screenType totalSeats",
            populate: {
              path: "theatre",
              select:
                "name city address",
            },
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("GET MY BOOKINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CANCEL BOOKING
// =====================================================
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // ---------------------------------------------
    // Find booking
    // ---------------------------------------------
    const booking = await Booking.findById(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    // ---------------------------------------------
    // Make sure user owns this booking
    // ---------------------------------------------
    if (
      booking.user.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to cancel this booking",
      });
    }

    // ---------------------------------------------
    // Check already cancelled
    // ---------------------------------------------
    if (
      booking.bookingStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // ---------------------------------------------
    // Find show
    // ---------------------------------------------
    const show = await Show.findById(
      booking.show
    );

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show Not Found",
      });
    }

    // ---------------------------------------------
    // Restore seats
    // ---------------------------------------------
    show.availableSeats =
      show.availableSeats +
      booking.totalSeats;

    await show.save();

    // ---------------------------------------------
    // Cancel booking
    // ---------------------------------------------
    booking.bookingStatus = "Cancelled";

    await booking.save();

    console.log(
      "Booking Cancelled:",
      booking._id
    );

    console.log(
      "Available Seats Restored:",
      show.availableSeats
    );

    return res.status(200).json({
      success: true,
      message:
        "Booking Cancelled Successfully",
      data: booking,
    });
  } catch (error) {
    console.error(
      "CANCEL BOOKING ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
};