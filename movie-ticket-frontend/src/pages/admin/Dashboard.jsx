import { useEffect, useState } from "react";
import API from "../../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    movies: 0,
    theatres: 0,
    bookings: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const [moviesRes, theatresRes, bookingsRes] =
          await Promise.all([
            API.get("/movies"),
            API.get("/theatres"),
            API.get("/bookings"),
          ]);

        if (ignore) return;

        const movies =
          moviesRes.data.data || [];

        const theatres =
          theatresRes.data.data || [];

        const bookings =
          bookingsRes.data.data || [];

        const activeBookings = bookings.filter(
          (booking) =>
            booking.bookingStatus !== "Cancelled"
        );

        const revenue = activeBookings.reduce(
          (total, booking) =>
            total +
            Number(booking.totalAmount || 0),
          0
        );

        setStats({
          movies: movies.length,
          theatres: theatres.length,
          bookings: bookings.length,
          revenue,
        });
      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Loading Dashboard...</h2>
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
      <h1>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Movies */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
          }}
        >
          <h2>🎬 Movies</h2>
          <p
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {stats.movies}
          </p>
        </div>

        {/* Theatres */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            background: "#7c3aed",
            color: "white",
          }}
        >
          <h2>🏢 Theatres</h2>
          <p
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {stats.theatres}
          </p>
        </div>

        {/* Bookings */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
          }}
        >
          <h2>🎟️ Bookings</h2>
          <p
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {stats.bookings}
          </p>
        </div>

        {/* Revenue */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            background: "#ea580c",
            color: "white",
          }}
        >
          <h2>💰 Revenue</h2>
          <p
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            ₹{stats.revenue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;