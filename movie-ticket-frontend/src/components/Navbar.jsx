import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");

    // Refresh Navbar
    window.location.reload();
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111827",
      }}
    >
      <h2 style={{ color: "#fff" }}>🎬 Movie Ticket Booking</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/movies"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Movies
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/my-bookings"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              🎟 My Bookings
            </Link>

            <button
              onClick={logout}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;