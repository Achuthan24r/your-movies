import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function TheatreSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        console.log("Movie ID:", id);

        const res = await API.get(
          `/theatres/movie/${id}`
        );

        console.log(
          "Theatre Response:",
          res.data
        );

        setTheatres(res.data.data || []);
      } catch (error) {
        console.error(
          "Theatre Error:",
          error
        );

        setTheatres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h2>Loading theatres...</h2>
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
      <h1>Select Theatre</h1>

      {theatres.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
          }}
        >
          <h2>No theatres available</h2>

          <button
            onClick={() => navigate("/movies")}
            style={{
              padding: "12px 25px",
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {theatres.map((theatre) => (
            <div
              key={theatre._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
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
                    `/movie/${id}/theatres/${theatre._id}/shows`
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
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
          ))}
        </div>
      )}
    </div>
  );
}

export default TheatreSelection;