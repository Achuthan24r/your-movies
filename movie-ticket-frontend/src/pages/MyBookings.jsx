import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my");

        if (!cancelled) {
          setBookings(res.data.data || []);
        }
      } catch (err) {
        console.error("Fetch Booking Error:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            "Failed to load bookings"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await API.put(`/bookings/cancel/${bookingId}`);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      alert("Booking cancelled successfully");
    } catch (err) {
      console.error("Cancel Booking Error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to cancel booking"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Unable to load bookings</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>
              {booking.movie?.title || "Movie"}
            </h2>

            <p>
              Theatre:{" "}
              {booking.theatre?.name || "Theatre"}
            </p>

            <p>
              Show:{" "}
              {booking.show?.showTime || "N/A"}
            </p>

            <p>
              Seats:{" "}
              {booking.seats?.join(", ") || "N/A"}
            </p>

            <p>
              Status:{" "}
              <strong>{booking.status}</strong>
            </p>

            {booking.status !== "Cancelled" && (
              <button
                onClick={() => cancelBooking(booking._id)}
                style={{
                  padding: "10px 18px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;