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
// Get Theatres By Movie
// =========================
const getTheatresByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    console.log("Movie ID:", movieId);

    const shows = await Show.find({
      movie: movieId,
      status: { $in: ["Active", "Available"] },
    }).populate({
      path: "screen",
      populate: {
        path: "theatre",
      },
    });

    console.log("Shows found:", shows.length);

    const theatreMap = new Map();

    shows.forEach((show) => {
      if (show.screen && show.screen.theatre) {
        const theatre = show.screen.theatre;

        theatreMap.set(
          theatre._id.toString(),
          theatre
        );
      }
    });

    const theatres = Array.from(
      theatreMap.values()
    );

    console.log("Theatres found:", theatres.length);

    res.status(200).json({
      success: true,
      data: theatres,
    });
  } catch (error) {
    console.error(
      "Get Theatres By Movie Error:",
      error
    );

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