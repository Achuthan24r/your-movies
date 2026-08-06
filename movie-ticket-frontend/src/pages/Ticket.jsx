import { useLocation, useNavigate } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No Ticket Found
      </h2>
    );
  }

  const { booking, show, seats, total } = state;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "2px dashed #2563eb",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🎫 Movie Ticket</h1>

      <hr />

      <h2>{show.movie.title}</h2>

      <p>
        <strong>Booking ID:</strong> {booking._id}
      </p>

      <p>
        <strong>Show Time:</strong> {show.showTime}
      </p>

      <p>
        <strong>Seats:</strong> {seats.join(", ")}
      </p>

      <p>
        <strong>Total Paid:</strong> ₹{total}
      </p>

      <button
        onClick={() => navigate("/movies")}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Book Another Movie
      </button>
    </div>
  );
}

export default Ticket;