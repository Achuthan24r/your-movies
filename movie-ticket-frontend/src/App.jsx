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
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

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

       <Route path="/payment" element={<Payment />} />
       <Route path="/ticket" element={<Ticket />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;