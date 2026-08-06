import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
  const fetchShow = async () => {
    try {
      const res = await API.get(`/shows/${showId}`);

      if (res.data.success) {
        setShow(res.data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load show");
    }
  };

  fetchShow();
}, [showId]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  if (!show) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  const seats = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Seats</h1>

      <h3>{show.movie?.title}</h3>

      <p>
        <strong>Time:</strong> {show.showTime}
      </p>

      <p>
        <strong>Ticket Price:</strong> ₹{show.ticketPrice}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10,60px)",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              background: selectedSeats.includes(seat)
                ? "#16a34a"
                : "#ddd",
            }}
          >
            {seat}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "30px" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </h3>

      <h2>
        Total: ₹{selectedSeats.length * show.ticketPrice}
      </h2>

      <button
        disabled={selectedSeats.length === 0}
        onClick={() =>
          navigate("/payment", {
            state: {
              show,
              seats: selectedSeats,
              total: selectedSeats.length * show.ticketPrice,
            },
          })
        }
        style={{
          padding: "15px 30px",
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default SeatSelection;