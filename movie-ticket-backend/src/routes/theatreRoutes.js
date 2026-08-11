const express = require("express");

const router = express.Router();

const {
  addTheatre,
  getTheatres
} = require("../controllers/theatreController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin only
router.post("/", protect, admin, addTheatre);

// Public
router.get("/", getTheatres);

module.exports = router;