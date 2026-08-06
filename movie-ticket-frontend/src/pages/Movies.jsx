import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await API.get("/movies");

        if (res.data.success) {
          setMovies(res.data.movies);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Movies...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>🎬 Now Showing</h1>

      {movies.length === 0 ? (
        <h3>No Movies Available</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h2>{movie.title}</h2>

              <p>{movie.genre}</p>

              <p>{movie.language}</p>

              <p>{movie.duration} mins</p>

              <button
                onClick={() => navigate(`/movie/${movie._id}`)}
                style={{
                  width: "100%",
                  padding: "10px",
                  cursor: "pointer",
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