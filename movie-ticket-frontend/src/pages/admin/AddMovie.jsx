import { useState } from "react";
import API from "../../api/axios";

function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    duration: "",
    releaseDate: "",
    poster: "",
    trailer: "",
    rating: "",
    status: "Coming Soon",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await API.post("/movies", {
        title: form.title,
        description: form.description,
        genre: form.genre,
        language: form.language,
        duration: Number(form.duration),
        releaseDate: form.releaseDate,
        poster: form.poster,
        trailer: form.trailer,
        rating: form.rating === "" ? 0 : Number(form.rating),
        status: form.status,
      });

      setMessage(
        res.data.message || "Movie added successfully"
      );

      setForm({
        title: "",
        description: "",
        genre: "",
        language: "",
        duration: "",
        releaseDate: "",
        poster: "",
        trailer: "",
        rating: "",
        status: "Coming Soon",
      });
    } catch (err) {
      console.error("Add movie error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add movie"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>🎬 Add Movie</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Add a new movie to your booking system.
      </p>

      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            background: "#dcfce7",
            color: "#166534",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={fieldStyle}>
          <label>Movie Title</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Coolie"
            required
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div style={fieldStyle}>
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            rows="5"
            required
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />
        </div>

        {/* Genre */}
        <div style={fieldStyle}>
          <label>Genre</label>

          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Example: Action"
            required
            style={inputStyle}
          />
        </div>

        {/* Language */}
        <div style={fieldStyle}>
          <label>Language</label>

          <input
            type="text"
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="Example: Tamil"
            required
            style={inputStyle}
          />
        </div>

        {/* Duration */}
        <div style={fieldStyle}>
          <label>Duration (minutes)</label>

          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Example: 180"
            min="1"
            required
            style={inputStyle}
          />
        </div>

        {/* Release Date */}
        <div style={fieldStyle}>
          <label>Release Date</label>

          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Poster */}
        <div style={fieldStyle}>
          <label>Poster URL</label>

          <input
            type="url"
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            style={inputStyle}
          />
        </div>

        {/* Trailer */}
        <div style={fieldStyle}>
          <label>Trailer URL</label>

          <input
            type="url"
            name="trailer"
            value={form.trailer}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
            style={inputStyle}
          />
        </div>

        {/* Rating */}
        <div style={fieldStyle}>
          <label>Rating</label>

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Example: 8.5"
            min="0"
            max="10"
            step="0.1"
            style={inputStyle}
          />
        </div>

        {/* Status */}
        <div style={fieldStyle}>
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Coming Soon">
              Coming Soon
            </option>

            <option value="Now Showing">
              Now Showing
            </option>

            <option value="Ended">
              Ended
            </option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "#9ca3af"
              : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Adding Movie..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

const fieldStyle = {
  marginBottom: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default AddMovie;