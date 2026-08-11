const Show = require("../models/Show");

// =========================
// Add Show
// =========================

const addShow = async (req, res) => {
  try {
    const show = await Show.create({
      movie: req.body.movie,
      screen: req.body.screen,
      showDate: req.body.showDate,
      showTime: req.body.showTime,
      ticketPrice: req.body.ticketPrice,
      availableSeats: req.body.availableSeats,
      status: req.body.status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Show added successfully",
      data: show,
    });
  } catch (error) {
    console.error(
      "Add Show Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Shows
// =========================

const getShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      });

    res.status(200).json({
      success: true,
      data: shows,
    });
  } catch (error) {
    console.error(
      "Get Shows Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Shows By Movie + Theatre
// =========================

const getShowsByMovieAndTheatre =
  async (req, res) => {
    try {
      const {
        movieId,
        theatreId,
      } = req.params;

      console.log(
        "Movie ID:",
        movieId
      );

      console.log(
        "Theatre ID:",
        theatreId
      );

      const shows = await Show.find({
        movie: movieId,
        status: {
          $in: [
            "Active",
            "Available",
          ],
        },
      })
        .populate("movie")
        .populate({
          path: "screen",
          populate: {
            path: "theatre",
          },
        });

      const filteredShows =
        shows.filter((show) => {
          return (
            show.screen &&
            show.screen.theatre &&
            show.screen.theatre._id.toString() ===
              theatreId
          );
        });

      console.log(
        "Shows found:",
        filteredShows.length
      );

      res.status(200).json({
        success: true,
        data: filteredShows,
      });
    } catch (error) {
      console.error(
        "Get Shows By Movie/Theatre Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  addShow,
  getShows,
  getShowsByMovieAndTheatre,
};