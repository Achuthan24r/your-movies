import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/bookings/my-bookings");

        if (!cancelled) {
          setBookings(res.data?.data || []);
        }
      } catch (err) {
        console.error("My Bookings Error:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load your bookings"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Loading
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "30px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Unable to Load Bookings</h2>

        <p
          style={{
            color: "red",
            marginTop: "15px",
          }}
        >
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎫 My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h2>No Bookings Found</h2>

          <p style={{ color: "#666" }}>
            You have not booked any movie tickets yet.
          </p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            {/* Movie */}
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              🎬 {booking.show?.movie?.title || "Movie"}
            </h2>

            {/* Movie Details */}
            <p>
              <strong>Language:</strong>{" "}
              {booking.show?.movie?.language || "N/A"}
            </p>

            <p>
              <strong>Theatre:</strong>{" "}
              {booking.show?.screen?.theatre?.name || "N/A"}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {booking.show?.screen?.theatre?.city || "N/A"}
            </p>

            <p>
              <strong>Screen:</strong>{" "}
              {booking.show?.screen?.name || "N/A"}
            </p>

            {/* Date */}
            <p>
              <strong>Show Date:</strong>{" "}
              {booking.show?.showDate
                ? new Date(
                    booking.show.showDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Time */}
            <p>
              <strong>Show Time:</strong>{" "}
              {booking.show?.showTime || "N/A"}
            </p>

            {/* Seats */}
            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats?.length > 0
                ? booking.seats.join(", ")
                : "N/A"}
            </p>

            {/* Total Seats */}
            <p>
              <strong>Total Seats:</strong>{" "}
              {booking.totalSeats || booking.seats?.length || 0}
            </p>

            {/* Amount */}
            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{booking.totalAmount}
            </p>

            {/* Payment Status */}
            <p>
              <strong>Payment:</strong>{" "}
              <span
                style={{
                  color:
                    booking.paymentStatus === "Paid"
                      ? "green"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {booking.paymentStatus || "Pending"}
              </span>
            </p>

            {/* Booking Status */}
            <p>
              <strong>Booking Status:</strong>{" "}
              <span
                style={{
                  color:
                    booking.bookingStatus === "Booked"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {booking.bookingStatus}
              </span>
            </p>

            {/* Booking ID */}
            <p
              style={{
                fontSize: "12px",
                color: "#777",
                marginTop: "15px",
              }}
            >
              Booking ID: {booking._id}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;