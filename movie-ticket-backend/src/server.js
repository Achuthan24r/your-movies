const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// =========================
// Load Environment Variables
// =========================

dotenv.config();

// =========================
// Import Routes
// =========================

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// =========================
// Create Express App
// =========================

const app = express();

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =========================
// Middleware
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Test Route
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Ticket Backend API is running",
  });
});

// =========================
// API Routes
// =========================

app.use("/api/movies", movieRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/theatres", theatreRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =========================
// Global Error Handler
// =========================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =========================
// MongoDB Connection
// =========================

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

// =========================
// Start Server
// =========================

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    // Fix Node DNS SRV issue
    const dns = require("dns");

    dns.setServers([
      "8.8.8.8",
      "1.1.1.1",
    ]);

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
      console.log(
        `🌐 CORS allowed origin: http://localhost:5173`
      );
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

// =========================
// Start Application
// =========================

startServer();