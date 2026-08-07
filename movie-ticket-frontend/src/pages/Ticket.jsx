import { useLocation, useNavigate } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Ticket Found</h2>
      </div>
    );
  }

  const { booking, show, seats, total } = state;

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "30px",
        border: "2px dashed #2563eb",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>
        🎫 Movie Ticket
      </h1>

      <hr />

      <img
        src={show.movie.poster}
        alt={show.movie.title}
        style={{
          width: "200px",
          display: "block",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      />

      <h2 style={{ textAlign: "center" }}>{show.movie.title}</h2>

      <p><strong>Booking ID:</strong> {booking._id}</p>

      <p><strong>Movie:</strong> {show.movie.title}</p>

      <p><strong>Language:</strong> {show.movie.language}</p>

      <p><strong>Show Date:</strong> {new Date(show.showDate).toLocaleDateString()}</p>

      <p><strong>Show Time:</strong> {show.showTime}</p>

      <p><strong>Seats:</strong> {seats.join(", ")}</p>

      <p><strong>Total Amount:</strong> ₹{total}</p>

      <p><strong>Status:</strong> ✅ Booked</p>

      <button
        onClick={() => navigate("/movies")}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Book Another Movie
      </button>
    </div>
  );
}

export default Ticket;