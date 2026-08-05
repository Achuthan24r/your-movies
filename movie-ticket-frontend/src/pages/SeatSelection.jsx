import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const proceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    navigate("/payment", {
      state: {
        showId,
        seats: selectedSeats,
        total: selectedSeats.length * 200,
      },
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Your Seats</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8,60px)",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              height: "50px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: selectedSeats.includes(seat)
                ? "#16a34a"
                : "#d1d5db",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {seat}
          </button>
        ))}
      </div>

      <h2 style={{ marginTop: "30px" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </h2>

      <h2>Total : ₹{selectedSeats.length * 200}</h2>

      <button
        onClick={proceed}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default SeatSelection;