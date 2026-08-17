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

router.get("/", getMovies);

router.get("/:id", getMovieById);

// ========================================
// ADMIN ROUTES
// ========================================

router.post(
  "/",
  protect,
  admin,
  addMovie
);

router.put(
  "/:id",
  protect,
  admin,
  updateMovie
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteMovie
);

module.exports = router;