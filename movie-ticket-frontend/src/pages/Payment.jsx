import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingData = location.state;

  // We only need showId, seats and totalAmount
  if (
    !bookingData ||
    !bookingData.showId ||
    !bookingData.seats ||
    bookingData.seats.length === 0
  ) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Booking Information Missing</h2>

        <p>
          Please select a movie, theatre, show and seats again.
        </p>

        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  const {
    showId,
    seats,
    totalAmount,
    movieTitle,
    showTime,
    showDate,
    ticketPrice,
  } = bookingData;

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before booking.");
        setLoading(false);
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          show: showId,
          seats: seats,
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking Response:", response.data);

      if (response.data.success) {
        alert("Booking successful!");

        navigate("/my-bookings");
      }
    } catch (err) {
      console.error("Booking Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);

        if (err.response.status === 409) {
          const bookedSeats =
            err.response.data.seats || seats;

          setError(
            `These seats are already booked: ${bookedSeats.join(
              ", "
            )}. Please go back and select different seats.`
          );
        } else if (err.response.status === 401) {
          setError(
            "Your login session has expired. Please login again."
          );

          localStorage.removeItem("token");

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setError(
            err.response.data.message ||
              "Booking failed."
          );
        }
      } else {
        setError(
          "Unable to connect to the server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>Payment</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginTop: "20px",
        }}
      >
        <h2>Booking Summary</h2>

        {movieTitle && (
          <p>
            <strong>Movie:</strong>{" "}
            {movieTitle}
          </p>
        )}

        {showTime && (
          <p>
            <strong>Show Time:</strong>{" "}
            {showTime}
          </p>
        )}

        {showDate && (
          <p>
            <strong>Show Date:</strong>{" "}
            {showDate}
          </p>
        )}

        {ticketPrice && (
          <p>
            <strong>Ticket Price:</strong>{" "}
            ₹{ticketPrice}
          </p>
        )}

        <p>
          <strong>Seats:</strong>{" "}
          {seats.join(", ")}
        </p>

        <p>
          <strong>Number of Seats:</strong>{" "}
          {seats.length}
        </p>

        <h2>
          Total Amount: ₹{totalAmount}
        </h2>
      </div>

      {error && (
        <div
          style={{
            color: "#dc2626",
            background: "#fee2e2",
            border: "1px solid #dc2626",
            borderRadius: "6px",
            padding: "15px",
            marginTop: "20px",
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "25px",
          background: loading
            ? "#999"
            : "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "18px",
          cursor: loading
            ? "not-allowed"
            : "pointer",
        }}
      >
        {loading
          ? "Processing..."
          : "Confirm & Pay"}
      </button>

      <button
        onClick={() => navigate(-1)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          background: "#ddd",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Back to Seats
      </button>
    </div>
  );
};

export default Payment;