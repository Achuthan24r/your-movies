// ===============================
// src/server.js
// ===============================

const dns = require("dns");

// IMPORTANT:
// Your system DNS is refusing MongoDB SRV lookups.
// Use Google + Cloudflare DNS before Mongoose connects.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// ===============================
// App
// ===============================

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Ticket Booking API is running",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/theatres", theatreRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Environment Variables
// ===============================

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ===============================
// Check Mongo URI
// ===============================

console.log("Mongo URI loaded:", !!MONGO_URI);

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env");
  process.exit(1);
}

// ===============================
// MongoDB Connection
// ===============================

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully");

    // ===============================
    // Start Express ONLY after MongoDB
    // connects successfully
    // ===============================

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

// ===============================
// Start Application
// ===============================

startServer();