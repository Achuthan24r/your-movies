import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

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
import Dashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AddMovie from "./pages/admin/AddMovie";
import AddTheatre from "./pages/admin/AddTheatre";
import AddShow from "./pages/admin/AddShow";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* =========================
            USER ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
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
          path="/movie/:id/theatres"
          element={<TheatreSelection />}
        />

        <Route
          path="/shows/:theatreId"
          element={<ShowSelection />}
        />

        <Route
          path="/seat/:showId"
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

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedAdminRoute>
              <AdminBookings />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-movie"
          element={
            <ProtectedAdminRoute>
              <AddMovie />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-theatre"
          element={
            <ProtectedAdminRoute>
              <AddTheatre />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-show"
          element={
            <ProtectedAdminRoute>
              <AddShow />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;