import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Booking Details Found</h2>
      </div>
    );
  }

  const { show, seats, total } = state;

  const handlePayment = async () => {
    try {
      const bookingData = {
        show: show._id,
        seats,
        totalSeats: seats.length,
        totalAmount: total,
      };

      console.log("Sending Booking:", bookingData);

      const res = await API.post("/bookings", bookingData);

      if (res.data.success) {
        alert("Booking Successful!");

        navigate("/ticket", {
          state: {
            booking: res.data.data,
            show,
            seats,
            total,
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>💳 Payment</h1>

      <hr />

      <h2>{show.movie?.title}</h2>

      <p>
        <strong>Show Date:</strong>{" "}
        {new Date(show.showDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Show Time:</strong> {show.showTime}
      </p>

      <p>
        <strong>Selected Seats:</strong> {seats.join(", ")}
      </p>

      <p>
        <strong>Total Seats:</strong> {seats.length}
      </p>

      <h2>Total Amount: ₹{total}</h2>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "15px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;