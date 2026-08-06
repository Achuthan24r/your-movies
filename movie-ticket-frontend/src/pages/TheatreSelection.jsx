import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function TheatreSelection() {
  const { id } = useParams(); // Movie ID
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await API.get("/theatres");
        setTheatres(res.data.theatres);
      } catch (error) {
        console.error(error);
        alert("Failed to load theatres");
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Theatre</h1>

      {theatres.length === 0 ? (
        <p>No theatres available.</p>
      ) : (
        theatres.map((theatre) => (
          <div
            key={theatre._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{theatre.name}</h2>

            <p>{theatre.location || theatre.address}</p>

            <p>{theatre.city}</p>

            <button
              onClick={() =>
                navigate(`/shows/${theatre._id}?movie=${id}`)
              }
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Shows
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TheatreSelection;