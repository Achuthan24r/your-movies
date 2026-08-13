import { useLocation, useNavigate } from "react-router-dom";

function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Ticket Details Found</h2>

        <button onClick={() => navigate("/movies")}>
          Browse Movies
        </button>
      </div>
    );
  }

  const { booking, show, seats, total } = state;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#16a34a" }}>
        🎟️ Booking Confirmed
      </h1>

      <hr />

      <h2>{show?.movie?.title}</h2>

      <p>
        <strong>Booking ID:</strong>{" "}
        {booking?._id || "N/A"}
      </p>

      <p>
        <strong>Show Date:</strong>{" "}
        {show?.showDate
          ? new Date(show.showDate).toLocaleDateString()
          : "N/A"}
      </p>

      <p>
        <strong>Show Time:</strong>{" "}
        {show?.showTime || "N/A"}
      </p>

      <p>
        <strong>Seats:</strong>{" "}
        {seats?.join(", ") || "N/A"}
      </p>

      <p>
        <strong>Total Seats:</strong>{" "}
        {seats?.length || 0}
      </p>

      <h2>
        Total Amount: ₹{total}
      </h2>

      <div
        style={{
          marginTop: "25px",
          padding: "15px",
          background: "#f0fdf4",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <strong>✅ Payment Successful</strong>
        <p>Your movie tickets have been booked successfully.</p>
      </div>

      <button
        onClick={() => navigate("/my-bookings")}
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        View My Bookings
      </button>

      <button
        onClick={() => navigate("/movies")}
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "10px",
          background: "#374151",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Browse More Movies
      </button>
    </div>
  );
}

export default Ticket;