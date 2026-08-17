import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH MY BOOKINGS
  // ======================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/bookings/my");

      console.log("MY BOOKINGS RESPONSE:", res.data);

      if (res.data.success) {
        setBookings(res.data.data || []);
      } else {
        setError(
          res.data.message || "Failed to load bookings"
        );
      }
    } catch (err) {
      console.error("Fetch Booking Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD BOOKINGS
  // ======================================================

  useEffect(() => {
  let cancelled = false;

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/bookings/my");

      console.log("MY BOOKINGS RESPONSE:", res.data);

      if (!cancelled) {
        if (res.data.success) {
          setBookings(res.data.data || []);
        } else {
          setError(
            res.data.message ||
              "Failed to load bookings"
          );
        }
      }
    } catch (err) {
      console.error("Fetch Booking Error:", err);

      if (!cancelled) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch bookings"
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadBookings();

  return () => {
    cancelled = true;
  };
}, []);

  // ======================================================
  // CANCEL BOOKING
  // ======================================================

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

      console.log("CANCEL RESPONSE:", res.data);

      if (res.data.success) {
        alert("Booking cancelled successfully");

        // Refresh bookings
        await fetchBookings();
      } else {
        alert(
          res.data.message ||
            "Failed to cancel booking"
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

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>My Bookings</h2>

        <p style={{ color: "red" }}>
          {error}
        </p>

        <button onClick={fetchBookings}>
          Try Again
        </button>
      </div>
    );
  }

  // ======================================================
  // NO BOOKINGS
  // ======================================================

  if (bookings.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>🎟️ No Bookings Found</h2>

        <p>
          You haven't booked any tickets yet.
        </p>
      </div>
    );
  }

  // ======================================================
  // BOOKINGS
  // ======================================================

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
        🎟️ My Bookings
      </h1>

      {bookings.map((booking) => {
        const show = booking.show;
        const movie = show?.movie;
        const screen = show?.screen;
        const theatre = screen?.theatre;

        return (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            {/* ==================================================
                MOVIE
            ================================================== */}

            <h2
              style={{
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              🎬 {movie?.title || "Movie"}
            </h2>

            {/* ==================================================
                THEATRE
            ================================================== */}

            <p>
              <strong>Theatre:</strong>{" "}
              {theatre?.name ||
                screen?.theatreName ||
                "Theatre"}
            </p>

            {/* ==================================================
                SCREEN
            ================================================== */}

            {screen?.name && (
              <p>
                <strong>Screen:</strong>{" "}
                {screen.name}
              </p>
            )}

            {/* ==================================================
                SHOW DATE
            ================================================== */}

            {show?.showDate && (
              <p>
                <strong>Show Date:</strong>{" "}
                {new Date(
                  show.showDate
                ).toLocaleDateString("en-IN")}
              </p>
            )}

            {/* ==================================================
                SHOW TIME
            ================================================== */}

            <p>
              <strong>Show Time:</strong>{" "}
              {show?.startTime || "N/A"}

              {show?.endTime && (
                <>
                  {" - "}
                  {show.endTime}
                </>
              )}
            </p>

            {/* ==================================================
                SEATS
            ================================================== */}

            <p>
              <strong>Seats:</strong>{" "}
              {Array.isArray(booking.seats)
                ? booking.seats.join(", ")
                : "N/A"}
            </p>

            {/* ==================================================
                TOTAL SEATS
            ================================================== */}

            <p>
              <strong>Total Seats:</strong>{" "}
              {booking.seats?.length || 0}
            </p>

            {/* ==================================================
                AMOUNT
            ================================================== */}

            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{booking.totalAmount || 0}
            </p>

            {/* ==================================================
                STATUS
            ================================================== */}

            <p>
              <strong>Status:</strong>{" "}

              <span
                style={{
                  fontWeight: "bold",
                  color:
                    booking.status ===
                    "Confirmed"
                      ? "green"
                      : "red",
                }}
              >
                {booking.status}
              </span>
            </p>

            {/* ==================================================
                BOOKING DATE
            ================================================== */}

            {booking.createdAt && (
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date(
                  booking.createdAt
                ).toLocaleString("en-IN")}
              </p>
            )}

            {/* ==================================================
                CANCEL BUTTON
            ================================================== */}

            {booking.status !== "Cancelled" && (
              <button
                onClick={() =>
                  handleCancel(booking._id)
                }
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Cancel Booking
              </button>
            )}

            {/* ==================================================
                CANCELLED MESSAGE
            ================================================== */}

            {booking.status === "Cancelled" && (
              <p
                style={{
                  marginTop: "15px",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                ❌ This booking has been cancelled.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MyBookings;