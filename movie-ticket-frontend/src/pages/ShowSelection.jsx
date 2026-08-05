import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ShowSelection() {
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await API.get("/shows");

        setShows(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Shows...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Available Shows</h1>

      {shows.map((show) => (
        <div
          key={show._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>{show.movie?.title}</h2>

          <p>
            <strong>Language:</strong>{" "}
            {show.movie?.language}
          </p>

          <p>
            <strong>Theatre:</strong>{" "}
            {show.screen?.theatre?.name}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {show.screen?.theatre?.city}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(show.showDate).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {show.showTime}
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
            Book Seats
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShowSelection;