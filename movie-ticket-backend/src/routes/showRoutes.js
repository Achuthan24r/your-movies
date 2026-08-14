const express = require("express");

const router = express.Router();

const {
  getShows,
  getShowsByMovie,
  getShowsByMovieAndTheatre,
  getShowById,
} = require("../controllers/showController");

// Get all shows
router.get("/", getShows);

// Get shows for a movie
router.get("/movie/:movieId", getShowsByMovie);

// Get shows for a movie + theatre
router.get(
  "/movie/:movieId/theatre/:theatreId",
  getShowsByMovieAndTheatre
);

// Get one show
router.get("/:showId", getShowById);

module.exports = router;