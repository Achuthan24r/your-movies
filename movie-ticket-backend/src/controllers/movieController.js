const Movie = require("../models/Movie");

// =========================
// Get All Movies
// =========================
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error("Get Movies Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Movie By ID
// =========================
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Get Movie By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Add Movie
// =========================
const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      language: req.body.language,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      poster: req.body.poster || "",
      trailer: req.body.trailer || "",
      rating: req.body.rating || 0,
      status: req.body.status || "Coming Soon",
    });

    res.status(201).json({
      success: true,
      message: "Movie Added Successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Add Movie Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Movie
// =========================
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Movie Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
};