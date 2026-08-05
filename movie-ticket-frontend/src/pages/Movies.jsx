import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Movies...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎬 Now Showing
      </h1>

      {movies.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No Movies Available</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={
                  movie.poster ||
                  "https://via.placeholder.com/300x400?text=Movie+Poster"
                }
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h2>{movie.title}</h2>

              <p>
                <strong>Language:</strong> {movie.language}
              </p>

              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>

              <p>
                <strong>Duration:</strong> {movie.duration} mins
              </p>

              <button
                onClick={() => navigate(`/movie/${movie._id}`)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "15px",
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;