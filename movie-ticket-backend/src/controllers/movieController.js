const mongoose = require("mongoose");
const Movie = require("../models/Movie");

// ========================================
// PUBLIC - GET ALL MOVIES
// GET /api/movies
// ========================================

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

// ========================================
// PUBLIC - GET ONE MOVIE
// GET /api/movies/:id
// ========================================

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Get Movie Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ADMIN - ADD MOVIE
// POST /api/movies
// ========================================

const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      duration,
      releaseDate,
      poster,
      trailer,
      rating,
      status,
    } = req.body;

    // Required fields
    if (
      !title ||
      !description ||
      !genre ||
      !language ||
      duration === undefined ||
      !releaseDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, genre, language, duration and release date are required",
      });
    }

    // Validate duration
    if (Number(duration) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0",
      });
    }

    // Validate rating
    if (
      rating !== undefined &&
      (Number(rating) < 0 || Number(rating) > 10)
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 10",
      });
    }

    // Validate release date
    if (isNaN(new Date(releaseDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid release date",
      });
    }

    const movie = await Movie.create({
      title: title.trim(),
      description: description.trim(),
      genre: genre.trim(),
      language: language.trim(),
      duration: Number(duration),
      releaseDate,
      poster: poster?.trim() || "",
      trailer: trailer?.trim() || "",
      rating:
        rating !== undefined
          ? Number(rating)
          : 0,
      status: status || "Coming Soon",
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
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

// ========================================
// ADMIN - UPDATE MOVIE
// PUT /api/movies/:id
// ========================================

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const {
      title,
      description,
      genre,
      language,
      duration,
      releaseDate,
      poster,
      trailer,
      rating,
      status,
    } = req.body;

    if (title !== undefined) {
      movie.title = title.trim();
    }

    if (description !== undefined) {
      movie.description = description.trim();
    }

    if (genre !== undefined) {
      movie.genre = genre.trim();
    }

    if (language !== undefined) {
      movie.language = language.trim();
    }

    if (duration !== undefined) {
      if (Number(duration) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Duration must be greater than 0",
        });
      }

      movie.duration = Number(duration);
    }

    if (releaseDate !== undefined) {
      if (isNaN(new Date(releaseDate).getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid release date",
        });
      }

      movie.releaseDate = releaseDate;
    }

    if (poster !== undefined) {
      movie.poster = poster.trim();
    }

    if (trailer !== undefined) {
      movie.trailer = trailer.trim();
    }

    if (rating !== undefined) {
      if (
        Number(rating) < 0 ||
        Number(rating) > 10
      ) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 0 and 10",
        });
      }

      movie.rating = Number(rating);
    }

    if (status !== undefined) {
      movie.status = status;
    }

    await movie.save();

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Update Movie Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ADMIN - DELETE MOVIE
// DELETE /api/movies/:id
// ========================================

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    await Movie.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
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
  updateMovie,
  deleteMovie,
};