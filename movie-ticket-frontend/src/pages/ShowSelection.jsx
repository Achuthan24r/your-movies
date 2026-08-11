import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function ShowSelection() {
  const { id, theatreId } = useParams();
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await API.get(
          `/shows/movie/${id}/theatre/${theatreId}`
        );

        console.log("Shows:", res.data);

        setShows(res.data.data || []);
      } catch (error) {
        console.error("Show Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [id, theatreId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading shows...</h2>
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
      <h1>Select Show</h1>

      {shows.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
          }}
        >
          <h2>No shows available</h2>

          <button
            onClick={() => navigate(`/movie/${id}/theatres`)}
            style={{
              padding: "12px 20px",
              background: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back to Theatres
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {shows.map((show) => (
            <div
              key={show._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
                <strong>Status:</strong> {show.status}
              </p>

              <button
                disabled={
                  show.status !== "Available" ||
                  show.availableSeats <= 0
                }
                onClick={() =>
                  navigate(
                    `/show/${show._id}/seats`
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  background:
                    show.status === "Available" &&
                    show.availableSeats > 0
                      ? "#2563eb"
                      : "#9ca3af",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor:
                    show.status === "Available" &&
                    show.availableSeats > 0
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Select Seats
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowSelection;