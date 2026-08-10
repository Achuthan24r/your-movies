import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadMovies = async () => {
      try {
        const res = await API.get("/movies");

        if (mounted) {
          setMovies(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);

        if (mounted) {
          setError("Failed to load movies");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Loading Movies...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>🎬 Movies</h1>

      {movies.length === 0 ? (
        <h2>No Movies Found</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "320px",
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                  }}
                >
                  No Poster
                </div>
              )}

              <div style={{ padding: "20px" }}>
                <h2>{movie.title}</h2>

                <p>
                  <strong>Language:</strong>{" "}
                  {movie.language}
                </p>

                <p>
                  <strong>Genre:</strong>{" "}
                  {movie.genre}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {movie.duration} minutes
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  ⭐ {movie.rating}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {movie.status}
                </p>

                <Link
                  to={`/movie/${movie._id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginTop: "10px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;