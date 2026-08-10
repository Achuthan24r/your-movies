import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h1>🛠️ Admin Dashboard</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Manage movies, theatres, shows and bookings.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <Link
          to="/admin/add-movie"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: "25px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <h2>🎬 Add Movie</h2>
            <p>Add a new movie to the system.</p>
          </div>
        </Link>

        <Link
          to="/admin/add-theatre"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: "25px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <h2>🏢 Add Theatre</h2>
            <p>Add a new theatre.</p>
          </div>
        </Link>

        <Link
          to="/admin/add-show"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: "25px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <h2>🎟️ Add Show</h2>
            <p>Create a movie show with seats and pricing.</p>
          </div>
        </Link>

        <Link
          to="/admin/bookings"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: "25px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <h2>📋 Bookings</h2>
            <p>View and manage customer bookings.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;