const Theatre = require("../models/Theatre");
const Show = require("../models/Show");
const Screen = require("../models/Screen");

// ========================================
// ADD THEATRE
// ========================================
const addTheatre = async (req, res) => {
  try {
    const { name, city, address, totalSeats } = req.body;

    if (!name || !city || !address || totalSeats === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, city, address and totalSeats are required",
      });
    }

    const theatre = await Theatre.create({
      name,
      city,
      address,
      totalSeats,
    });

    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      theatre,
    });
  } catch (error) {
    console.error("Add Theatre Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL THEATRES
// ========================================
const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      theatres,
    });
  } catch (error) {
    console.error("Get Theatres Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET THEATRES FOR A MOVIE
// Movie -> Show -> Screen -> Theatre
// ========================================
const getTheatresByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    console.log("Movie ID:", movieId);

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }

    // Find shows for this movie
    const shows = await Show.find({
      movie: movieId,
      status: { $ne: "Cancelled" },
    }).populate({
      path: "screen",
      populate: {
        path: "theatre",
      },
    });

    console.log("Shows found:", shows.length);

    // Extract theatres from screens
    const theatreMap = new Map();

    shows.forEach((show) => {
      if (show.screen && show.screen.theatre) {
        const theatre = show.screen.theatre;

        theatreMap.set(theatre._id.toString(), theatre);
      }
    });

    const theatres = Array.from(theatreMap.values());

    console.log("Theatres found:", theatres.length);

    res.status(200).json({
      success: true,
      theatres,
    });
  } catch (error) {
    console.error("Get Theatres By Movie Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTheatre,
  getTheatres,
  getTheatresByMovie,
};