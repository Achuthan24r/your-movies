const Theatre = require("../models/Theatre");

// Add Theatre
const addTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      theatre
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Theatres
const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();

    res.status(200).json({
      success: true,
      theatres
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addTheatre,
  getTheatres
};