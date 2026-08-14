const mongoose = require("mongoose");
const Show = require("../models/Show");
const Booking = require("../models/Booking");
// ========================================
// GET ALL SHOWS
// GET /api/shows
// ========================================

const getShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .populate("screen")
      .sort({ showDate: 1, showTime: 1 });

    return res.status(200).json({
      success: true,
      data: shows,
    });
  } catch (error) {
    console.error("Get Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET SHOWS BY MOVIE
// GET /api/shows/movie/:movieId
// ========================================

const getShowsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const shows = await Show.find({
      movie: movieId,
      status: { $ne: "Cancelled" },
    })
      .populate("movie")
      .populate("screen")
      .sort({ showDate: 1, showTime: 1 });

    return res.status(200).json({
      success: true,
      data: shows,
    });
  } catch (error) {
    console.error("Get Shows By Movie Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET SHOWS BY MOVIE + THEATRE
// GET /api/shows/movie/:movieId/theatre/:theatreId
// ========================================

const getShowsByMovieAndTheatre = async (req, res) => {
  try {
    const { movieId, theatreId } = req.params;

    console.log("Movie ID:", movieId);
    console.log("Theatre ID:", theatreId);

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(theatreId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid theatre ID",
      });
    }

    const shows = await Show.find({
      movie: movieId,
      status: { $ne: "Cancelled" },
    })
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      })
      .populate("movie");

    const filteredShows = shows.filter((show) => {
      return (
        show.screen &&
        show.screen.theatre &&
        show.screen.theatre._id.toString() === theatreId
      );
    });

    console.log("Shows found:", filteredShows.length);

    return res.status(200).json({
      success: true,
      data: filteredShows,
    });
  } catch (error) {
    console.error("Get Shows By Movie + Theatre Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ONE SHOW
// GET /api/shows/:showId
// ========================================

const getShowById = async (req, res) => {
  try {
    const { showId } = req.params;

    console.log("Get Show ID:", showId);

    if (!mongoose.Types.ObjectId.isValid(showId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid show ID",
      });
    }

    const show = await Show.findById(showId)
      .populate("movie")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      });

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // Find all confirmed bookings for this show
    const bookings = await Booking.find({
      show: showId,
      status: "Confirmed",
    });

    // Collect all booked seats
    const bookedSeats = [];

    bookings.forEach((booking) => {
      booking.seats.forEach((seat) => {
        bookedSeats.push(String(seat));
      });
    });

    return res.status(200).json({
      success: true,
      data: {
        ...show.toObject(),
        bookedSeats,
      },
    });

  } catch (error) {
    console.error("Get Show By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ========================================
// EXPORTS
// ========================================

module.exports = {
  getShows,
  getShowsByMovie,
  getShowsByMovieAndTheatre,
  getShowById,
};