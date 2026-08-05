const express = require("express");
const router = express.Router();

const {
  createScreen,
  getAllScreens,
  getScreenById,
  updateScreen,
  deleteScreen,
} = require("../controllers/screenController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin Routes
router.post("/", protect, admin, createScreen);
router.put("/:id", protect, admin, updateScreen);
router.delete("/:id", protect, admin, deleteScreen);

// Public Routes
router.get("/", getAllScreens);
router.get("/:id", getScreenById);

module.exports = router;