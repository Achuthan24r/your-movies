import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);

        if (mounted) {
          setMovie(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch movie:", err);

        if (mounted) {
          setError("Failed to load movie details");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchMovie();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

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
        <h2>Loading movie...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h2>{error}</h2>

        <Link to="/movies">
          <button
            style={{
              padding: "12px 25px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to Movies
          </button>
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h2>Movie Not Found</h2>

        <Link to="/movies">
          <button
            style={{
              padding: "12px 25px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to Movies
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* BACK BUTTON */}
      <Link
        to="/movies"
        style={{
          textDecoration: "none",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            marginBottom: "30px",
            background: "#374151",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back to Movies
        </button>
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(250px, 350px) 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* POSTER */}
        <div>
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display =
                  "flex";
              }}
            />
          ) : null}

          {/* POSTER PLACEHOLDER */}
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "500px",
              display: movie.poster ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e5e7eb",
              borderRadius: "12px",
              fontSize: "80px",
            }}
          >
            🎬
          </div>
        </div>

        {/* MOVIE DETAILS */}
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              marginTop: 0,
              marginBottom: "15px",
            }}
          >
            {movie.title}
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#555",
            }}
          >
            {movie.description || "No description available."}
          </p>

          <div
            style={{
              marginTop: "25px",
              lineHeight: "2",
            }}
          >
            <p>
              <strong>🎭 Genre:</strong>{" "}
              {movie.genre || "N/A"}
            </p>

            <p>
              <strong>🗣️ Language:</strong>{" "}
              {movie.language || "N/A"}
            </p>

            <p>
              <strong>⏱️ Duration:</strong>{" "}
              {movie.duration
                ? `${movie.duration} minutes`
                : "N/A"}
            </p>

            <p>
              <strong>⭐ Rating:</strong>{" "}
              {movie.rating ?? 0}
            </p>

            <p>
              <strong>📅 Release Date:</strong>{" "}
              {movie.releaseDate
                ? new Date(
                    movie.releaseDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>📌 Status:</strong>{" "}
              {movie.status || "Coming Soon"}
            </p>
          </div>

          {/* TRAILER */}
          {movie.trailer ? (
            <a
              href={movie.trailer}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  padding: "12px 25px",
                  marginTop: "15px",
                  marginRight: "10px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ▶ Watch Trailer
              </button>
            </a>
          ) : null}

          {/* THEATRE BUTTON */}
          <Link
            to={`/movie/${movie._id}/theatres`}
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                padding: "12px 25px",
                marginTop: "15px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🎟️ Book Tickets
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;