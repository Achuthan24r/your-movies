const express = require("express");

const router = express.Router();

const {
  addShow,
  getShows,
  getShowsByMovieAndTheatre,
} = require("../controllers/showController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// =========================
// Admin
// =========================

router.post(
  "/",
  protect,
  admin,
  addShow
);

// =========================
// Public
// =========================

router.get(
  "/",
  getShows
);

// =========================
// Get Shows By Movie + Theatre
// =========================

router.get(
  "/movie/:movieId/theatre/:theatreId",
  getShowsByMovieAndTheatre
);

module.exports = router;