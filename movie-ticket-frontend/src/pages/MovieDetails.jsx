import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/movies/${id}`);

        console.log("Movie Details Response:", res.data);

        if (mounted) {
          setMovie(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load movie:", err);

        if (mounted) {
          setError("Failed to load movie");
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
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>{error}</h2>

        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Movie Not Found</h2>

        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Movie Poster */}
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: "300px",
            height: "450px",
            objectFit: "cover",
            borderRadius: "10px",
            display: "block",
            marginBottom: "25px",
          }}
        />
      ) : (
        <div
          style={{
            width: "300px",
            height: "450px",
            background: "#e5e7eb",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          No Poster Available
        </div>
      )}

      {/* Movie Information */}
      <h1>{movie.title}</h1>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
          lineHeight: "1.6",
        }}
      >
        {movie.description}
      </p>

      <h3>Genre: {movie.genre}</h3>

      <h3>Language: {movie.language}</h3>

      <h3>Duration: {movie.duration} mins</h3>

      <h3>Rating: ⭐ {movie.rating}</h3>

      <h3>Status: {movie.status}</h3>

      <h3>
        Release Date:{" "}
        {new Date(movie.releaseDate).toLocaleDateString()}
      </h3>

      {/* Select Theatre */}
      <button
        onClick={() => navigate(`/movie/${movie._id}/theatres`)}
        style={{
          padding: "12px 24px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        🎟️ Select Theatre
      </button>

      {/* Back */}
      <button
        onClick={() => navigate("/movies")}
        style={{
          padding: "12px 24px",
          background: "#6b7280",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
          marginLeft: "10px",
        }}
      >
        ← Back to Movies
      </button>
    </div>
  );
}

export default MovieDetails;