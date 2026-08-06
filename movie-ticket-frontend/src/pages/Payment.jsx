import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No Booking Details Found
      </h2>
    );
  }

  const { show, seats, total } = state;

  const handlePayment = async () => {
    try {
      const bookingData = {
        show: show._id,
        seats,
        totalAmount: total,
      };

      const res = await API.post("/bookings", bookingData);

      if (res.data.success) {
        alert("Payment Successful!");

        navigate(`/ticket/${res.data.booking._id}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment Failed");
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
      }}
    >
      <h1>Payment</h1>

      <hr />

      <h3>{show.movie.title}</h3>

      <p>
        <strong>Show Time:</strong> {show.showTime}
      </p>

      <p>
        <strong>Seats:</strong> {seats.join(", ")}
      </p>

      <h2>Total Amount : ₹{total}</h2>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;