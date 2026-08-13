const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Show = require("../models/Show");

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

    // --------------------------------------------------
    // AUTH CHECK
    // --------------------------------------------------

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // --------------------------------------------------
    // GET DATA
    // --------------------------------------------------

    const { show, seats, totalAmount } = req.body;

    // --------------------------------------------------
    // VALIDATE SHOW
    // --------------------------------------------------

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

    // --------------------------------------------------
    // VALIDATE SEATS
    // --------------------------------------------------

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one seat is required",
      });
    }

    // Convert everything to strings
    const cleanSeats = seats.map((seat) => String(seat).trim());

    // Remove duplicate seats selected by same user
    const uniqueSeats = [...new Set(cleanSeats)];

    if (uniqueSeats.length !== cleanSeats.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate seats selected",
      });
    }

    // --------------------------------------------------
    // START TRANSACTION
    // --------------------------------------------------

    session.startTransaction();

    // --------------------------------------------------
    // GET SHOW
    // --------------------------------------------------

    const showData = await Show.findById(show).session(session);

    if (!showData) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // --------------------------------------------------
    // CHECK SHOW STATUS
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CHECK AVAILABLE SEATS COUNT
    // --------------------------------------------------

    if (showData.availableSeats < uniqueSeats.length) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Not enough seats available",
        availableSeats: showData.availableSeats,
      });
    }

    // --------------------------------------------------
    // CHECK WHETHER SEATS ARE ALREADY BOOKED
    // --------------------------------------------------

    const existingBookings = await Booking.find({
      show: show,
      status: "Confirmed",
      seats: {
        $in: uniqueSeats,
      },
    }).session(session);

    // --------------------------------------------------
    // FIND ALREADY BOOKED SEATS
    // --------------------------------------------------

    const bookedSeats = [];

    existingBookings.forEach((booking) => {
      booking.seats.forEach((seat) => {
        if (uniqueSeats.includes(String(seat))) {
          if (!bookedSeats.includes(String(seat))) {
            bookedSeats.push(String(seat));
          }
        }
      });
    });

    // --------------------------------------------------
    // IF SOME SEATS ARE BOOKED
    // --------------------------------------------------

    if (bookedSeats.length > 0) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Some seats are already booked",
        seats: bookedSeats,
      });
    }

    // --------------------------------------------------
    // CREATE BOOKING
    // --------------------------------------------------

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
      {
        session,
      }
    );

    const booking = bookingArray[0];

    // --------------------------------------------------
    // DECREASE AVAILABLE SEATS
    // --------------------------------------------------

    showData.availableSeats =
      showData.availableSeats - uniqueSeats.length;

    // --------------------------------------------------
    // IF NO SEATS LEFT
    // --------------------------------------------------

    if (showData.availableSeats === 0) {
      showData.status = "Available";
    }

    await showData.save({
      session,
    });

    // --------------------------------------------------
    // POPULATE BOOKING
    // --------------------------------------------------

    const populatedBooking = await Booking.findById(
      booking._id
    )
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
          },
          {
            path: "screen",
          },
        ],
      })
      .session(session);

    // --------------------------------------------------
    // COMMIT TRANSACTION
    // --------------------------------------------------

    await session.commitTransaction();

    console.log("Booking created:", booking._id);
    console.log("Seats:", uniqueSeats);
    console.log(
      "Remaining seats:",
      showData.availableSeats
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
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
    session.endSession();
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

    // --------------------------------------------------
    // AUTH CHECK
    // --------------------------------------------------

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // --------------------------------------------------
    // FIND BOOKINGS
    // --------------------------------------------------

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
    console.error("Get My Bookings Error:", error);

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
    console.log("======================================");
    console.log("CANCEL BOOKING");
    console.log("======================================");

    const bookingId = req.params.id;

    console.log("Booking ID:", bookingId);
    console.log("User:", req.user?._id);

    // --------------------------------------------------
    // AUTH CHECK
    // --------------------------------------------------

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // --------------------------------------------------
    // VALIDATE BOOKING ID
    // --------------------------------------------------

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

    // --------------------------------------------------
    // START TRANSACTION
    // --------------------------------------------------

    session.startTransaction();

    // --------------------------------------------------
    // FIND BOOKING
    // --------------------------------------------------

    const booking = await Booking.findById(
      bookingId
    ).session(session);

    if (!booking) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // --------------------------------------------------
    // CHECK OWNERSHIP
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CHECK ALREADY CANCELLED
    // --------------------------------------------------

    if (booking.status === "Cancelled") {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // --------------------------------------------------
    // FIND SHOW
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CANCEL BOOKING
    // --------------------------------------------------

    booking.status = "Cancelled";

    await booking.save({
      session,
    });

    // --------------------------------------------------
    // RESTORE SEATS
    // --------------------------------------------------

    showData.availableSeats =
      showData.availableSeats + booking.seats.length;

    // --------------------------------------------------
    // SHOW BECOMES ACTIVE AGAIN
    // --------------------------------------------------

    if (showData.availableSeats > 0) {
      showData.status = "Active";
    }

    await showData.save({
      session,
    });

    // --------------------------------------------------
    // COMMIT
    // --------------------------------------------------

    await session.commitTransaction();

    console.log(
      "Booking cancelled:",
      booking._id
    );

    console.log(
      "Seats restored:",
      booking.seats.length
    );

    console.log(
      "Available seats:",
      showData.availableSeats
    );

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
    session.endSession();
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};