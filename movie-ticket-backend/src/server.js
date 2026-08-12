require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const showRoutes = require("./routes/showRoutes");
const theatreRoutes = require("./routes/theatreRoutes");

const app = express();


// CORS
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);


// Body parser
app.use(express.json());


// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/theatres", theatreRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Movie booking API is running",
  });
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });