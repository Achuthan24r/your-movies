import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>🎫 My Bookings</h1>

      {bookings.length === 0 ? (
        <h2>No Bookings Found</h2>
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
            <h2>{booking.show?.movie?.title}</h2>

            <p>
              <strong>Language:</strong>{" "}
              {booking.show?.movie?.language}
            </p>

            <p>
              <strong>Theatre:</strong>{" "}
              {booking.show?.screen?.theatre?.name}
            </p>

            <p>
              <strong>Screen:</strong>{" "}
              {booking.show?.screen?.name}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats.join(", ")}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹
              {booking.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {booking.bookingStatus}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;