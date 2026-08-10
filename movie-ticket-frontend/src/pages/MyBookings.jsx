import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Cancel Booking
  // ==========================================
  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const res = await API.put(
        `/bookings/cancel/${bookingId}`
      );

      if (res.data.success) {
        alert("Booking Cancelled Successfully");

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  bookingStatus: "Cancelled",
                }
              : booking
          )
        );
      }
    } catch (err) {
      console.error("Cancel Booking Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to cancel booking"
      );
    }
  };

  // ==========================================
  // Get My Bookings
  // ==========================================
  useEffect(() => {
    let ignore = false;

    const loadBookings = async () => {
      try {
        const res = await API.get(
          "/bookings/my-bookings"
        );

        if (!ignore && res.data.success) {
          setBookings(res.data.data || []);
        }
      } catch (err) {
        console.error("Fetch Bookings Error:", err);

        if (
          !ignore &&
          err.response?.status === 401
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          alert(
            "Your session has expired. Please login again."
          );

          window.location.href = "/login";
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      ignore = true;
    };
  }, []);

  // ==========================================
  // Loading
  // ==========================================
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

  // ==========================================
  // My Bookings
  // ==========================================
  return (
    <div
      style={{
        maxWidth: "1000px",
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

          <p>
            You haven't booked any movie tickets yet.
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
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Movie */}
            <h2>
              🎬{" "}
              {booking.show?.movie?.title ||
                "Movie"}
            </h2>

            {/* Language */}
            <p>
              <strong>Language:</strong>{" "}
              {booking.show?.movie?.language ||
                "N/A"}
            </p>

            {/* Theatre */}
            <p>
              <strong>Theatre:</strong>{" "}
              {booking.show?.screen?.theatre?.name ||
                "N/A"}
            </p>

            {/* City */}
            {booking.show?.screen?.theatre?.city && (
              <p>
                <strong>City:</strong>{" "}
                {booking.show.screen.theatre.city}
              </p>
            )}

            {/* Screen */}
            <p>
              <strong>Screen:</strong>{" "}
              {booking.show?.screen?.name ||
                "N/A"}
            </p>

            {/* Date */}
            {booking.show?.showDate && (
              <p>
                <strong>Show Date:</strong>{" "}
                {new Date(
                  booking.show.showDate
                ).toLocaleDateString()}
              </p>
            )}

            {/* Time */}
            {booking.show?.showTime && (
              <p>
                <strong>Show Time:</strong>{" "}
                {booking.show.showTime}
              </p>
            )}

            {/* Seats */}
            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats?.join(", ") ||
                "N/A"}
            </p>

            {/* Total Seats */}
            <p>
              <strong>Total Seats:</strong>{" "}
              {booking.totalSeats}
            </p>

            {/* Amount */}
            <p>
              <strong>Total Amount:</strong> ₹
              {booking.totalAmount}
            </p>

            {/* Payment */}
            <p>
              <strong>Payment:</strong>{" "}
              {booking.paymentStatus}
            </p>

            {/* Booking Status */}
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    booking.bookingStatus ===
                    "Cancelled"
                      ? "#dc2626"
                      : "#16a34a",
                }}
              >
                {booking.bookingStatus}
              </span>
            </p>

            {/* Cancel Button */}
            <button
              onClick={() =>
                handleCancel(booking._id)
              }
              disabled={
                booking.bookingStatus ===
                "Cancelled"
              }
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background:
                  booking.bookingStatus ===
                  "Cancelled"
                    ? "#999"
                    : "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor:
                  booking.bookingStatus ===
                  "Cancelled"
                    ? "not-allowed"
                    : "pointer",
                fontSize: "15px",
              }}
            >
              {booking.bookingStatus ===
              "Cancelled"
                ? "Cancelled"
                : "Cancel Booking"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;