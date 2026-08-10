import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMovies = async () => {
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

    fetchMovies();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading movies...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>{error}</h2>
        <p>Please check whether your backend server is running.</p>
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎬 Movies
      </h1>

      {movies.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
          }}
        >
          <h2>No Movies Found</h2>
          <p>There are currently no movies available.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              {/* POSTER */}
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "330px",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display =
                      "flex";
                  }}
                />
              ) : null}

              {/* PLACEHOLDER */}
              <div
                style={{
                  width: "100%",
                  height: "330px",
                  display: movie.poster ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#e5e7eb",
                  fontSize: "70px",
                }}
              >
                🎬
              </div>

              {/* MOVIE INFORMATION */}
              <div
                style={{
                  padding: "20px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                  }}
                >
                  {movie.title}
                </h2>

                <p>
                  <strong>Language:</strong>{" "}
                  {movie.language || "N/A"}
                </p>

                <p>
                  <strong>Genre:</strong>{" "}
                  {movie.genre || "N/A"}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {movie.duration
                    ? `${movie.duration} min`
                    : "N/A"}
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  ⭐ {movie.rating ?? 0}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {movie.status || "Coming Soon"}
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
                      color: "#fff",
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