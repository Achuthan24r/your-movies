import { useEffect, useState } from "react";
import API from "../../api/axios";

function AddShow() {
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);

  const [formData, setFormData] = useState({
    movie: "",
    screen: "",
    showDate: "",
    showTime: "",
    ticketPrice: "",
    availableSeats: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const [moviesRes, screensRes] = await Promise.all([
          API.get("/movies"),
          API.get("/screens"),
        ]);

        if (ignore) return;

        setMovies(moviesRes.data.data || []);
        setScreens(screensRes.data.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/shows", {
        movie: formData.movie,
        screen: formData.screen,
        showDate: formData.showDate,
        showTime: formData.showTime,
        ticketPrice: Number(formData.ticketPrice),
        availableSeats: Number(formData.availableSeats),
      });

      if (res.data.success) {
        alert("Show added successfully!");

        setFormData({
          movie: "",
          screen: "",
          showDate: "",
          showTime: "",
          ticketPrice: "",
          availableSeats: "",
        });
      }
    } catch (error) {
      console.error("Add Show Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add show"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>🎬 Add Show</h1>

      <form onSubmit={handleSubmit}>
        {/* Movie */}
        <select
          name="movie"
          value={formData.movie}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        >
          <option value="">Select Movie</option>

          {movies.map((movie) => (
            <option
              key={movie._id}
              value={movie._id}
            >
              {movie.title}
            </option>
          ))}
        </select>

        {/* Screen */}
        <select
          name="screen"
          value={formData.screen}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        >
          <option value="">Select Screen</option>

          {screens.map((screen) => (
            <option
              key={screen._id}
              value={screen._id}
            >
              {screen.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="showDate"
          value={formData.showDate}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        {/* Time */}
        <input
          type="time"
          name="showTime"
          value={formData.showTime}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        {/* Ticket Price */}
        <input
          type="number"
          name="ticketPrice"
          placeholder="Ticket Price"
          value={formData.ticketPrice}
          onChange={handleChange}
          min="1"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        {/* Available Seats */}
        <input
          type="number"
          name="availableSeats"
          placeholder="Available Seats"
          value={formData.availableSeats}
          onChange={handleChange}
          min="1"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Show"}
        </button>
      </form>
    </div>
  );
}

export default AddShow;