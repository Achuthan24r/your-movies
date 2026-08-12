import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TheatreSelection from "./pages/TheatreSelection";
import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/movie/:movieId/theatres"
          element={<TheatreSelection />}
        />

        <Route
          path="/movie/:movieId/theatres/:theatreId/shows"
          element={<ShowSelection />}
        />

        <Route
          path="/movie/:movieId/theatres/:theatreId/shows/:showId/seats"
          element={<SeatSelection />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  );
}

export default App;