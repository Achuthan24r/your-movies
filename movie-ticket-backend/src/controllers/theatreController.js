const Theatre = require("../models/Theatre");
const Show = require("../models/Show");

// =========================
// Add Theatre
// =========================
const addTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      data: theatre,
    });
  } catch (error) {
    console.error("Add Theatre Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Theatres
// =========================
const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();

    res.status(200).json({
      success: true,
      data: theatres,
    });
  } catch (error) {
    console.error("Get Theatres Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Theatres For Movie
// =========================
const getTheatresByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({
      movie: movieId,
      status: "Available",
    }).populate({
      path: "screen",
      populate: {
        path: "theatre",
      },
    });

    const theatreMap = new Map();

    shows.forEach((show) => {
      const theatre = show.screen?.theatre;

      if (theatre) {
        theatreMap.set(theatre._id.toString(), theatre);
      }
    });

    const theatres = Array.from(theatreMap.values());

    res.status(200).json({
      success: true,
      data: theatres,
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