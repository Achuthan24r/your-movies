const express = require("express");

const router = express.Router();

const {
  addTheatre,
  getTheatres,
  getTheatresByMovie,
} = require("../controllers/theatreController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin
router.post("/", protect, admin, addTheatre);

// Public
router.get("/", getTheatres);

// Get theatres for a movie
router.get("/movie/:movieId", getTheatresByMovie);

module.exports = router;