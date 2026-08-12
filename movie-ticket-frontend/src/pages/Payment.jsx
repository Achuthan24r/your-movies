import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Booking Details Found</h2>
        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const { show, seats, total } = state;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before booking.");
        navigate("/login");
        return;
      }

      if (!show?._id) {
        alert("Show information is missing.");
        return;
      }

      if (!seats || seats.length === 0) {
        alert("Please select at least one seat.");
        navigate(-1);
        return;
      }

      const bookingData = {
        show: show._id,
        seats: seats,
        totalSeats: seats.length,
        totalAmount: total,
      };

      console.log("Sending Booking:", bookingData);

      const res = await API.post("/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Booking response:", res.data);

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
      console.error("Booking Error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }

      alert(
        err.response?.data?.message ||
          "Booking Failed"
      );
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
      <h1 style={{ textAlign: "center" }}>
        💳 Payment
      </h1>

      <hr />

      <h2>{show?.movie?.title || "Movie"}</h2>

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
        <strong>Selected Seats:</strong>{" "}
        {seats.join(", ")}
      </p>

      <p>
        <strong>Total Seats:</strong>{" "}
        {seats.length}
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