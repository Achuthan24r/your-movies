require("dotenv").config();

const dns = require("dns");

// ================================
// MongoDB DNS fix
// ================================

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================================
// CORS
// ================================

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ================================
// BODY PARSER
// ================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// DEBUG
// ================================

console.log("Mongo URI loaded:", !!process.env.MONGO_URI);

// ================================
// MONGODB
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

// ================================
// ROUTES
// ================================

const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Movie Ticket Backend API is running",
  });
});

// ================================
// 404
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});