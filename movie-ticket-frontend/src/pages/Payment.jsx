import  { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data coming from SeatSelection
  const bookingData = location.state || {};

  // Support both old and new names
  const showId =
    bookingData.showId ||
    bookingData.show ||
    bookingData.showID;

  const selectedSeats =
    bookingData.seats ||
    bookingData.selectedSeats ||
    [];

  const totalAmount =
    bookingData.totalAmount ??
    bookingData.total ??
    0;

  // Optional information
  const movieTitle =
    bookingData.movieTitle || "Movie";

  const theatreName =
    bookingData.theatreName || "Theatre";

  const showTime =
    bookingData.showTime || "10:00 AM";

  // ------------------------------------------
  // GET TOKEN
  // ------------------------------------------

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  // ------------------------------------------
  // BOOKING
  // ------------------------------------------

  const handleBooking = async () => {
    setError("");

    if (!token) {
      setError("Please login before booking.");

      navigate("/login");
      return;
    }

    if (!showId) {
      setError("Show ID is missing.");
      return;
    }

    if (
      !Array.isArray(selectedSeats) ||
      selectedSeats.length === 0
    ) {
      setError("Please select at least one seat.");
      return;
    }

    try {
      setLoading(true);

      // Remove duplicate seats
      const uniqueSeats = [
        ...new Set(
          selectedSeats.map((seat) => String(seat))
        ),
      ];

      console.log("Creating booking:");
      console.log("Show:", showId);
      console.log("Seats:", uniqueSeats);
      console.log("Total:", totalAmount);

      const response = await axios.post(
        `${API_URL}/api/bookings`,
        {
          show: showId,
          seats: uniqueSeats,
          totalAmount: Number(totalAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Booking response:",
        response.data
      );

      if (response.data.success) {
        alert("Booking confirmed successfully!");

        navigate("/my-bookings");
        return;
      }

      setError(
        response.data.message ||
          "Booking failed."
      );
    } catch (err) {
      console.error("Booking Error:", err);

      // ------------------------------------------
      // TOKEN EXPIRED
      // ------------------------------------------

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        setError(
          "Your session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1000);

        return;
      }

      // ------------------------------------------
      // SEAT ALREADY BOOKED
      // ------------------------------------------

      if (err.response?.status === 409) {
        const bookedSeats =
          err.response?.data?.seats || [];

        if (bookedSeats.length > 0) {
          setError(
            `These seats are already booked: ${bookedSeats.join(
              ", "
            )}`
          );
        } else {
          setError(
            err.response?.data?.message ||
              "Some selected seats are already booked."
          );
        }

        return;
      }

      // ------------------------------------------
      // OTHER ERROR
      // ------------------------------------------

      setError(
        err.response?.data?.message ||
          "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // CHECK DATA
  // ------------------------------------------

  if (
    !showId ||
    !Array.isArray(selectedSeats) ||
    selectedSeats.length === 0
  ) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2>Booking Information Missing</h2>

        <p>
          Please select a movie, theatre, show and
          seats again.
        </p>

        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
          }}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  // ------------------------------------------
  // PAYMENT PAGE
  // ------------------------------------------

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
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
        <h2>{movieTitle}</h2>

        <p>
          <strong>Theatre:</strong>{" "}
          {theatreName}
        </p>

        <p>
          <strong>Show:</strong>{" "}
          {showTime}
        </p>

        <p>
          <strong>Seats:</strong>{" "}
          {selectedSeats.join(", ")}
        </p>

        <p>
          <strong>Total:</strong> ₹
          {Number(totalAmount).toFixed(2)}
        </p>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "8px",
              background: "#ffe5e5",
              color: "#c00000",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "25px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Processing..."
            : "Confirm Booking"}
        </button>

        <button
          onClick={() => navigate(-1)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Payment;