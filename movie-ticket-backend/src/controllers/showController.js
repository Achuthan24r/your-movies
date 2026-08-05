const Show = require("../models/Show");

// Create Show
const createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);

    res.status(201).json({
      success: true,
      message: "Show Created Successfully",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Shows
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie", "title language")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
          select: "name city",
        },
      });

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Show By ID
const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie")
      .populate({
        path: "screen",
        populate: {
          path: "theatre",
        },
      });

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Show
const updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Show Updated Successfully",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Show
const deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Show Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
};