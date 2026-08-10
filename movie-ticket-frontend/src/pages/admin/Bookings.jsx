import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadBookings = async () => {
      try {
        const res = await API.get("/bookings");

        if (!ignore && res.data.success) {
          setBookings(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);

        if (!ignore) {
          alert(
            err.response?.data?.message ||
              "Failed to load bookings"
          );
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
        alert("Booking cancelled successfully");

        setBookings((prev) =>
          prev.map((booking) =>
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
      console.error("Cancel error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to cancel booking"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading Bookings...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>📋 All Bookings</h1>

      {bookings.length === 0 ? (
        <h2>No bookings found</h2>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h2>
              🎬{" "}
              {booking.show?.movie?.title ||
                "Unknown Movie"}
            </h2>

            <p>
              <strong>Customer:</strong>{" "}
              {booking.user?.name || "Unknown"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {booking.user?.email || "N/A"}
            </p>

            <p>
              <strong>Language:</strong>{" "}
              {booking.show?.movie?.language || "N/A"}
            </p>

            <p>
              <strong>Theatre:</strong>{" "}
              {booking.show?.screen?.theatre?.name ||
                "N/A"}
            </p>

            <p>
              <strong>Screen:</strong>{" "}
              {booking.show?.screen?.name || "N/A"}
            </p>

            <p>
              <strong>Show Date:</strong>{" "}
              {booking.show?.showDate
                ? new Date(
                    booking.show.showDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>Show Time:</strong>{" "}
              {booking.show?.showTime || "N/A"}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats?.join(", ") || "N/A"}
            </p>

            <p>
              <strong>Total Seats:</strong>{" "}
              {booking.totalSeats}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹
              {booking.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {booking.paymentStatus}
            </p>

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

            <button
              onClick={() =>
                handleCancel(booking._id)
              }
              disabled={
                booking.bookingStatus ===
                "Cancelled"
              }
              style={{
                marginTop: "10px",
                padding: "10px 18px",
                background:
                  booking.bookingStatus ===
                  "Cancelled"
                    ? "#999"
                    : "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor:
                  booking.bookingStatus ===
                  "Cancelled"
                    ? "not-allowed"
                    : "pointer",
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

export default AdminBookings;