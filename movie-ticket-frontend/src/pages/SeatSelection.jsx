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
        console.error("Failed to load show:", err);
        alert("Failed to load show");
      }
    };

    fetchShow();
  }, [showId]);

  const toggleSeat = (seat) => {
    const seatNumber = String(seat);

    // Do not allow booked seats
    if (show.bookedSeats?.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  if (!show) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  const seats = Array.from(
    { length: 50 },
    (_, i) => i + 1
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Seats</h1>

      <h3>{show.movie?.title}</h3>

      <p>
        <strong>Time:</strong>{" "}
        {show.showTime}
      </p>

      <p>
        <strong>Ticket Price:</strong> ₹
        {show.ticketPrice}
      </p>

      <p>
        <strong>Available Seats:</strong>{" "}
        {show.availableSeats}
      </p>

      {/* LEGEND */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#ddd",
            padding: "12px 20px",
            borderRadius: "6px",
          }}
        >
          Available
        </div>

        <div
          style={{
            background: "#16a34a",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
          }}
        >
          Selected
        </div>

        <div
          style={{
            background: "#dc2626",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
          }}
        >
          Booked
        </div>
      </div>

      {/* SEATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(10, 60px)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {seats.map((seat) => {
          const isBooked =
            show.bookedSeats?.includes(
              String(seat)
            );

          const isSelected =
            selectedSeats.includes(seat);

          return (
            <button
              key={seat}
              onClick={() =>
                toggleSeat(seat)
              }
              disabled={isBooked}
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: isBooked
                  ? "not-allowed"
                  : "pointer",

                color:
                  isSelected || isBooked
                    ? "white"
                    : "black",

                background: isBooked
                  ? "#dc2626"
                  : isSelected
                  ? "#16a34a"
                  : "#ddd",

                fontWeight: "500",
              }}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* SELECTED SEATS */}

      <h3 style={{ marginTop: "30px" }}>
        Selected Seats:{" "}
        {selectedSeats.length > 0
          ? selectedSeats.join(", ")
          : "None"}
      </h3>

      {/* TOTAL */}

      <h2>
        Total: ₹
        {selectedSeats.length *
          show.ticketPrice}
      </h2>

      {/* PAYMENT */}

      <button
        disabled={
          selectedSeats.length === 0
        }
    onClick={() =>
  navigate("/payment", {
    state: {
      showId: show._id,
      seats: selectedSeats,
      totalAmount:
        selectedSeats.length * show.ticketPrice,
      movieTitle: show.movie?.title,
      showTime: show.showTime,
      showDate: show.showDate,
      ticketPrice: show.ticketPrice,
    },
  })
}
        style={{
          padding: "15px 30px",
          marginTop: "20px",
          background:
            selectedSeats.length === 0
              ? "#aaa"
              : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor:
            selectedSeats.length === 0
              ? "not-allowed"
              : "pointer",
          fontSize: "16px",
        }}
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default SeatSelection;