const mongoose = require("mongoose");
const Show = require("../models/Show");

// =====================================================
// ADD SHOW
// =====================================================

const addShow = async (req, res) => {
  try {
    const {
      movie,
      screen,
      showDate,
      showTime,
      ticketPrice,
      availableSeats,
      status,
    } = req.body;

    if (!movie || !screen || !showDate || !showTime) {
      return res.status(400).json({
        success: false,
        message: "Movie, screen, date and time are required",
      });
    }

    const show = await Show.create({
      movie,
      screen,
      showDate,
      showTime,
      ticketPrice,
      availableSeats,
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Show added successfully",
      data: show,
    });
  } catch (error) {
    console.error("Add Show Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL SHOWS
// =====================================================

const getShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      });

    res.status(200).json({
      success: true,
      data: shows,
    });
  } catch (error) {
    console.error("Get Shows Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE SHOW BY ID
// =====================================================

const getShowById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Get Show ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Show ID is required",
      });
    }

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid show ID",
      });
    }

    const show = await Show.findById(id)
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

    res.status(200).json({
      success: true,
      data: show,
      show: show,
    });
  } catch (error) {
    console.error("Get Show By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SHOWS BY MOVIE + THEATRE
// =====================================================

const getShowsByMovieAndTheatre = async (req, res) => {
  try {
    const { movieId, theatreId } = req.params;

    console.log("Movie ID:", movieId);
    console.log("Theatre ID:", theatreId);

    if (!movieId || !theatreId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID and Theatre ID are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(movieId) ||
      !mongoose.Types.ObjectId.isValid(theatreId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie ID or Theatre ID",
      });
    }

    const shows = await Show.find({
      movie: movieId,
      status: {
        $in: ["Active", "Available"],
      },
    })
      .populate("movie")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      });

    const filteredShows = shows.filter((show) => {
      return (
        show.screen &&
        show.screen.theatre &&
        show.screen.theatre._id.toString() === theatreId
      );
    });

    console.log("Shows found:", filteredShows.length);

    res.status(200).json({
      success: true,
      data: filteredShows,
    });
  } catch (error) {
    console.error(
      "Get Shows By Movie/Theatre Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  addShow,
  getShows,
  getShowById,
  getShowsByMovieAndTheatre,
};