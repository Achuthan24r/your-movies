const Booking = require("../models/Booking");

// Create Booking
const createBooking = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const booking = await Booking.create({
      user: req.user.id,
      show: req.body.show,
      seats: req.body.seats,
      totalSeats: req.body.totalSeats,
      totalAmount: req.body.totalAmount,
    });

    console.log("Created Booking:", booking);

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  // your existing code here
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  // your existing code here
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  // your existing code here
};

module.exports = {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
};