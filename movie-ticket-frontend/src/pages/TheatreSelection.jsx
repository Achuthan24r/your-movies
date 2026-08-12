import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function TheatreSelection() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) {
      return;
    }

    let cancelled = false;

    const fetchTheatres = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(
          `/theatres/movie/${movieId}`
        );

        if (cancelled) return;

        console.log("Theatre Response:", res.data);

        const data =
          res.data?.data ||
          res.data?.theatres ||
          [];

        setTheatres(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        if (cancelled) return;

        console.error("Theatre Error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load theatres"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTheatres();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  // Handle missing movieId outside useEffect
  if (!movieId) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Movie ID is missing</h2>

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

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading Theatres...</h2>
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
        <h2>Unable to Load Theatres</h2>

        <p>{error}</p>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1>Select Theatre</h1>

      {theatres.length === 0 ? (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <h2>No theatres available</h2>

          <button
            onClick={() => navigate(-1)}
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {theatres.map((theatre) => (
            <div
              key={theatre._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                background: "#fff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{theatre.name}</h2>

              <p>
                <strong>City:</strong>{" "}
                {theatre.city}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {theatre.address}
              </p>

              <p>
                <strong>Total Seats:</strong>{" "}
                {theatre.totalSeats}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/movie/${movieId}/theatres/${theatre._id}/shows`
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Shows
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TheatreSelection;