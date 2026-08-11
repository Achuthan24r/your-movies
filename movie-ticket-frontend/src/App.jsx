import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";

import TheatreSelection from "./pages/TheatreSelection";
import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";

import Navbar from "./components/Navbar";

// Admin pages
import AddMovie from "./pages/admin/AddMovie";
import AddTheatre from "./pages/admin/AddTheatre";
import AddShow from "./pages/admin/AddShow";
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movies */}
        <Route path="/movies" element={<Movies />} />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        {/* Theatre Selection */}
        <Route
          path="/movie/:id/theatres"
          element={<TheatreSelection />}
        />

        {/* Show Selection */}
        <Route
          path="/movie/:id/theatres/:theatreId/shows"
          element={<ShowSelection />}
        />

        {/* Seat Selection */}
        <Route
          path="/show/:showId/seats"
          element={<SeatSelection />}
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* Ticket */}
        <Route
          path="/ticket/:id"
          element={<Ticket />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* User */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/admin/movies/add"
          element={<AddMovie />}
        />

        <Route
          path="/admin/theatres/add"
          element={<AddTheatre />}
        />

        <Route
          path="/admin/shows/add"
          element={<AddShow />}
        />

        <Route
          path="/admin/bookings"
          element={<Bookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;