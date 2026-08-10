const Booking = require("../models/Booking");
const Show = require("../models/Show");

// =====================================================
// CREATE BOOKING
// =====================================================
const createBooking = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const {
      show,
      seats,
      totalSeats,
      totalAmount,
    } = req.body;

    // ---------------------------------------------
    // Validate request
    // ---------------------------------------------
    if (!show) {
      return res.status(400).json({
        success: false,
        message: "Show is required",
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

    // Always calculate this from seats.
    // Don't trust the frontend value.
    const calculatedTotalSeats = seats.length;

    // ---------------------------------------------
    // Find show
    // ---------------------------------------------
    const showData = await Show.findById(show);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // ---------------------------------------------
    // Check show status
    // ---------------------------------------------
    if (showData.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This show has been cancelled",
      });
    }

    // ---------------------------------------------
    // Check available seat count
    // ---------------------------------------------
    if (showData.availableSeats < calculatedTotalSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // ---------------------------------------------
    // Check duplicate seats
    // ---------------------------------------------
    const existingBookings = await Booking.find({
      show: show,
      bookingStatus: "Booked",
      seats: {
        $in: seats,
      },
    });

    if (existingBookings.length > 0) {
      const bookedSeats = existingBookings.flatMap(
        (booking) => booking.seats
      );

      const alreadyBooked = seats.filter((seat) =>
        bookedSeats.includes(seat)
      );

      // Remove duplicates from response
      const uniqueBookedSeats = [
        ...new Set(alreadyBooked),
      ];

      return res.status(400).json({
        success: false,
        message: `These seats are already booked: ${uniqueBookedSeats.join(
          ", "
        )}`,
      });
    }

    // ---------------------------------------------
    // Create booking
    // ---------------------------------------------
    const booking = await Booking.create({
      user: req.user.id,
      show: show,
      seats: seats,
      totalSeats: calculatedTotalSeats,
      totalAmount: totalAmount,
      paymentStatus: "Paid",
      bookingStatus: "Booked",
    });

    // ---------------------------------------------
    // Reduce available seats
    // ---------------------------------------------
    showData.availableSeats =
      showData.availableSeats - calculatedTotalSeats;

    await showData.save();

    console.log("Created Booking:", booking);
    console.log(
      "Remaining Seats:",
      showData.availableSeats
    );

    // ---------------------------------------------
    // Response
    // ---------------------------------------------
    return res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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