import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        setMovie(res.data.movie);
      } catch (err) {
        console.error(err);
        alert("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!movie) {
    return <h2 style={{ textAlign: "center" }}>Movie Not Found</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />

      <h1>{movie.title}</h1>

      <p>{movie.description}</p>

      <h3>Genre : {movie.genre}</h3>

      <h3>Language : {movie.language}</h3>

      <h3>Duration : {movie.duration} mins</h3>

      <h3>Rating : ⭐ {movie.rating}</h3>

      <button
        onClick={() => navigate(`/movie/${movie._id}/theatres`)}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Select Theatre
      </button>
    </div>
  );
}

export default MovieDetails;