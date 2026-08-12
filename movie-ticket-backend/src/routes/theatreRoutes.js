const express = require("express");

const router = express.Router();

const {
  addTheatre,
  getTheatres,
  getTheatresByMovie,
} = require("../controllers/theatreController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ========================================
// ADMIN - ADD THEATRE
// ========================================
router.post("/", protect, admin, addTheatre);

// ========================================
// PUBLIC - GET ALL THEATRES
// ========================================
router.get("/", getTheatres);

// ========================================
// PUBLIC - GET THEATRES FOR MOVIE
// ========================================
router.get("/movie/:movieId", getTheatresByMovie);

module.exports = router;