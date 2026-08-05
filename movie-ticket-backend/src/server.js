const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Import Routes
// =====================
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const screenRoutes = require("./routes/screenRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// =====================

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🎬 Movie Ticket Booking API Running"
  });
});

app.use("/api/auth", userRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/theatres", theatreRoutes);

app.use("/api/screens", screenRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);

// =====================
// 404 Handler (Express 5 compatible)
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI, {
    family: 4
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
  });

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});