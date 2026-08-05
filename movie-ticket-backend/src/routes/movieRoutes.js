const express = require("express");

const router = express.Router();

const {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin only
router.post("/", protect, admin, addMovie);

// Everyone can view
router.get("/", getMovies);

router.get("/:id", getMovie);

// Admin only
router.put("/:id", protect, admin, updateMovie);

router.delete("/:id", protect, admin, deleteMovie);

module.exports = router;