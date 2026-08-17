const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Show = require("../models/Show");

// Register models required for populate
require("../models/Movie");
require("../models/Screen");
require("../models/Theatre");

// ======================================================
// CREATE BOOKING
// POST /api/bookings
// ======================================================

const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    console.log("======================================");
    console.log("CREATE BOOKING");
    console.log("======================================");

    console.log("Request body:", req.body);
    console.log("Logged user:", req.user?._id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { show, seats, totalAmount } = req.body;

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

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one seat is required",
      });
    }

    const cleanSeats = seats.map((seat) =>
      String(seat).trim()
    );

    const uniqueSeats = [...new Set(cleanSeats)];

    if (uniqueSeats.length !== cleanSeats.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate seats selected",
      });
    }

    session.startTransaction();

    const showData = await Show.findById(show).session(session);

    if (!showData) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    if (
      showData.status !== "Active" &&
      showData.status !== "Available"
    ) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "This show is not available for booking",
      });
    }

    if (showData.availableSeats < uniqueSeats.length) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Not enough seats available",
        availableSeats: showData.availableSeats,
      });
    }

    const existingBookings = await Booking.find({
      show: show,
      status: "Confirmed",
      seats: {
        $in: uniqueSeats,
      },
    }).session(session);

    const bookedSeats = [];

    existingBookings.forEach((booking) => {
      booking.seats.forEach((seat) => {
        const seatString = String(seat);

        if (
          uniqueSeats.includes(seatString) &&
          !bookedSeats.includes(seatString)
        ) {
          bookedSeats.push(seatString);
        }
      });
    });

    if (bookedSeats.length > 0) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Some seats are already booked",
        seats: bookedSeats,
      });
    }

    const bookingArray = await Booking.create(
      [
        {
          user: req.user._id,
          show: show,
          seats: uniqueSeats,
          totalAmount: Number(totalAmount) || 0,
          status: "Confirmed",
        },
      ],
      { session }
    );

    const booking = bookingArray[0];

    showData.availableSeats -= uniqueSeats.length;

    if (showData.availableSeats === 0) {
      showData.status = "Available";
    }

    await showData.save({ session });

    await session.commitTransaction();

    console.log("Booking created:", booking._id);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
      availableSeats: showData.availableSeats,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error("Transaction abort error:", abortError);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await session.endSession();
  }
};

// ======================================================
// GET MY BOOKINGS
// GET /api/bookings/my
// ======================================================

const getMyBookings = async (req, res) => {
  try {
    console.log("======================================");
    console.log("GET MY BOOKINGS");
    console.log("======================================");

    console.log("User:", req.user?._id);

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
          },
          {
            path: "screen",
            populate: {
              path: "theatre",
            },
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    console.log("Bookings found:", bookings.length);

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("======================================");
    console.error("GET MY BOOKINGS ERROR");
    console.error("======================================");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL BOOKINGS - ADMIN
// GET /api/bookings
// ======================================================

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "user",
        select: "name email phone role",
      })
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
          },
          {
            path: "screen",
            populate: {
              path: "theatre",
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
    console.error("Get All Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// CANCEL BOOKING
// PUT /api/bookings/cancel/:id
// ======================================================

const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();

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

    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);

    if (!booking) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {
      await session.abortTransaction();

      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this booking",
      });
    }

    if (booking.status === "Cancelled") {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    const showData = await Show.findById(
      booking.show
    ).session(session);

    if (!showData) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save({ session });

    showData.availableSeats += booking.seats.length;

    if (showData.availableSeats > 0) {
      showData.status = "Active";
    }

    await showData.save({ session });

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
      availableSeats: showData.availableSeats,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error("Abort transaction error:", abortError);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await session.endSession();
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};