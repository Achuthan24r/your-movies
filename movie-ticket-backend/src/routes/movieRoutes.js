const express = require("express");

const router = express.Router();

const {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ========================================
// PUBLIC ROUTES
// ========================================

// Get all movies
router.get("/", getMovies);

// Get one movie
router.get("/:id", getMovieById);

// ========================================
// ADMIN ROUTES
// ========================================

// Add movie
router.post(
  "/",
  protect,
  admin,
  addMovie
);

// Update movie
router.put(
  "/:id",
  protect,
  admin,
  updateMovie
);

// Delete movie
router.delete(
  "/:id",
  protect,
  admin,
  deleteMovie
);

module.exports = router;