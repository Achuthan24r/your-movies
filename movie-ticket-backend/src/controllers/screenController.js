const Screen = require("../models/Screen");

// Create Screen
const createScreen = async (req, res) => {
  try {
    const screen = await Screen.create(req.body);

    res.status(201).json({
      success: true,
      message: "Screen Created Successfully",
      data: screen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Screens
const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find().populate("theatre", "name city");

    res.status(200).json({
      success: true,
      count: screens.length,
      data: screens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Screen by ID
const getScreenById = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate(
      "theatre",
      "name city"
    );

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: screen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Screen
const updateScreen = async (req, res) => {
  try {
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Screen Updated Successfully",
      data: screen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Screen
const deleteScreen = async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Screen Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createScreen,
  getAllScreens,
  getScreenById,
  updateScreen,
  deleteScreen,
};