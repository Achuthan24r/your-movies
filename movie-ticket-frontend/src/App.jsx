```jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// User pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TheatreSelection from "./pages/TheatreSelection";
import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

// Admin pages
import Dashboard from "./admin/Dashboard";
import AddMovie from "./admin/AddMovie";
import AddTheatre from "./admin/AddTheatre";
import AddShow from "./admin/AddShow";
import AdminBookings from "./admin/Bookings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* ========================= */}
        {/* USER ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

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
          path="/ticket"
          element={<Ticket />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/add-movie"
          element={<AddMovie />}
        />

        <Route
          path="/admin/add-theatre"
          element={<AddTheatre />}
        />

        <Route
          path="/admin/add-show"
          element={<AddShow />}
        />

        <Route
          path="/admin/bookings"
          element={<AdminBookings />}
        />

      </Routes>
    </>
  );
}

export default App;
```
