const express = require("express");

const router = express.Router();

const {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
} = require("../controllers/movieController");

// GET all movies
router.get("/", getMovies);

// GET single movie
router.get("/:id", getMovieById);

// ADD movie
router.post("/", addMovie);

// DELETE movie
router.delete("/:id", deleteMovie);

module.exports = router;