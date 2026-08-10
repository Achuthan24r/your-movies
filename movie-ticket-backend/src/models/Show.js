const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true,
    },

    showDate: {
      type: Date,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },

   status: {
  type: String,
  enum: ["Active", "Available", "Cancelled"],
  default: "Active",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);