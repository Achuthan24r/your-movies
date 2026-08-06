import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "../api/axios";

function ShowSelection() {
  const { theatreId } = useParams();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movie");

  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await API.get("/shows");

        const filteredShows = res.data.data.filter(
          (show) =>
            show.movie?._id === movieId &&
            show.theatre === theatreId
        );

        setShows(filteredShows);
      } catch (error) {
        console.error(error);
        alert("Failed to load shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [movieId, theatreId]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Shows...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Show</h1>

      {shows.length === 0 ? (
        <h2>No Shows Available</h2>
      ) : (
        shows.map((show) => (
          <div
            key={show._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{show.movie?.title}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(show.showDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Time:</strong> {show.showTime}
            </p>

            <p>
              <strong>Price:</strong> ₹{show.ticketPrice}
            </p>

            <p>
              <strong>Available Seats:</strong>{" "}
              {show.availableSeats}
            </p>

            <button
              onClick={() => navigate(`/seat/${show._id}`)}
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Select Seats
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowSelection;