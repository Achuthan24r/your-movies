const express = require("express");
const router = express.Router();

const {
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
} = require("../controllers/showController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin
router.post("/", protect, admin, createShow);
router.put("/:id", protect, admin, updateShow);
router.delete("/:id", protect, admin, deleteShow);

// Public
router.get("/", getAllShows);
router.get("/:id", getShowById);

module.exports = router;