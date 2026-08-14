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
    const movie = await Movie.findById(req.params.id);

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
      !duration ||
      !releaseDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, genre, language, duration and release date are required",
      });
    }

    // Create movie
    const movie = await Movie.create({
      title,
      description,
      genre,
      language,
      duration,
      releaseDate,
      poster,
      trailer,
      rating: rating || 0,
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

    movie.title =
      title !== undefined
        ? title
        : movie.title;

    movie.description =
      description !== undefined
        ? description
        : movie.description;

    movie.genre =
      genre !== undefined
        ? genre
        : movie.genre;

    movie.language =
      language !== undefined
        ? language
        : movie.language;

    movie.duration =
      duration !== undefined
        ? duration
        : movie.duration;

    movie.releaseDate =
      releaseDate !== undefined
        ? releaseDate
        : movie.releaseDate;

    movie.poster =
      poster !== undefined
        ? poster
        : movie.poster;

    movie.trailer =
      trailer !== undefined
        ? trailer
        : movie.trailer;

    movie.rating =
      rating !== undefined
        ? rating
        : movie.rating;

    movie.status =
      status !== undefined
        ? status
        : movie.status;

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

// ========================================
// EXPORTS
// ========================================

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};