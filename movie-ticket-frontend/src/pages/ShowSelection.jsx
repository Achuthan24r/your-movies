import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function ShowSelection() {
  const { movieId, theatreId } = useParams();
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Don't set state here synchronously.
    if (!movieId || !theatreId) {
      return;
    }

    let cancelled = false;

    const fetchShows = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(
          `/shows/movie/${movieId}/theatre/${theatreId}`
        );

        if (cancelled) return;

        console.log("Shows Response:", res.data);

        const data = res.data?.data || res.data?.shows || [];

        setShows(Array.isArray(data) ? data : []);
      } catch (err) {
        if (cancelled) return;

        console.error("Show Error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load shows"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchShows();

    return () => {
      cancelled = true;
    };
  }, [movieId, theatreId]);

  // Missing IDs are handled during rendering, NOT by setState inside useEffect.
  if (!movieId || !theatreId) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Invalid Show URL</h2>

        <p>
          Movie ID or Theatre ID is missing.
        </p>

        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
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
        <h2>Loading Shows...</h2>
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
        <h2>Unable to Load Shows</h2>

        <p>{error}</p>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
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
      <h1>Select Show</h1>

      {shows.length === 0 ? (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <h2>No shows available</h2>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {shows.map((show) => (
            <div
              key={show._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                background: "#fff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{show.showTime}</h2>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(show.showDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Ticket Price:</strong> ₹
                {show.ticketPrice}
              </p>

              <p>
                <strong>Available Seats:</strong>{" "}
                {show.availableSeats}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {show.status}
              </p>

              <button
                disabled={
                  show.status === "Cancelled" ||
                  show.availableSeats <= 0
                }
                onClick={() =>
                  navigate(
                    `/movie/${movieId}/theatres/${theatreId}/shows/${show._id}/seats`
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  background:
                    show.status === "Cancelled" ||
                    show.availableSeats <= 0
                      ? "#aaa"
                      : "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor:
                    show.status === "Cancelled" ||
                    show.availableSeats <= 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {show.status === "Cancelled"
                  ? "Cancelled"
                  : show.availableSeats <= 0
                  ? "Sold Out"
                  : "Select Seats"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowSelection;