const Theatre = require("../models/Theatre");
const Show = require("../models/Show");

// ========================================
// ADD THEATRE
// POST /api/theatres
// ========================================

const addTheatre = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      totalSeats,
    } = req.body;

    // Validate fields
    if (
      !name ||
      !city ||
      !address ||
      totalSeats === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, city, address and totalSeats are required",
      });
    }

    // Validate seats
    if (Number(totalSeats) <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Total seats must be greater than 0",
      });
    }

    // Create theatre
    const theatre = await Theatre.create({
      name: name.trim(),
      city: city.trim(),
      address: address.trim(),
      totalSeats: Number(totalSeats),
    });

    return res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      theatre,
    });
  } catch (error) {
    console.error(
      "Add Theatre Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL THEATRES
// GET /api/theatres
// ========================================

const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({
      name: 1,
    });

    return res.status(200).json({
      success: true,
      theatres,
    });
  } catch (error) {
    console.error(
      "Get Theatres Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET THEATRES FOR A MOVIE
// GET /api/theatres/movie/:movieId
//
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

    const shows = await Show.find({
      movie: movieId,
      status: {
        $ne: "Cancelled",
      },
    }).populate({
      path: "screen",
      populate: {
        path: "theatre",
      },
    });

    console.log(
      "Shows found:",
      shows.length
    );

    const theatreMap = new Map();

    shows.forEach((show) => {
      if (
        show.screen &&
        show.screen.theatre
      ) {
        const theatre =
          show.screen.theatre;

        theatreMap.set(
          theatre._id.toString(),
          theatre
        );
      }
    });

    const theatres =
      Array.from(
        theatreMap.values()
      );

    console.log(
      "Theatres found:",
      theatres.length
    );

    return res.status(200).json({
      success: true,
      theatres,
    });
  } catch (error) {
    console.error(
      "Get Theatres By Movie Error:",
      error
    );

    return res.status(500).json({
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