import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
 <Route path="/shows" element={<ShowSelection />} />
 <Route path="/seat/:showId" element={<SeatSelection />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;