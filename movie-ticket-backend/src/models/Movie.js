const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    genre: {
      type: String,
      required: true
    },

    language: {
      type: String,
      required: true
    },

    duration: {
      type: Number,
      required: true
    },

    releaseDate: {
      type: Date,
      required: true
    },

    poster: {
      type: String
    },

    trailer: {
      type: String
    },

    rating: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "Coming Soon",
        "Now Showing",
        "Ended"
      ],
      default: "Coming Soon"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Movie", movieSchema);