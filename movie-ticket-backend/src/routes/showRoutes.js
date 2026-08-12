const express = require("express");

const router = express.Router();

const {
  addShow,
  getShows,
  getShowById,
  getShowsByMovieAndTheatre,
} = require("../controllers/showController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// =====================================================
// GET SHOWS BY MOVIE + THEATRE
// =====================================================

router.get(
  "/movie/:movieId/theatre/:theatreId",
  getShowsByMovieAndTheatre
);

// =====================================================
// GET SINGLE SHOW
// =====================================================

router.get("/:id", getShowById);

// =====================================================
// GET ALL SHOWS
// =====================================================

router.get("/", getShows);

// =====================================================
// ADD SHOW - ADMIN ONLY
// =====================================================

router.post("/", protect, admin, addShow);

module.exports = router;