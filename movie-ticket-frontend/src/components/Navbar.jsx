import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        background: "#111827",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🎬 Movie Ticket Booking
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/movies"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Movies
        </Link>

        {token ? (
          <>
            <Link
              to="/my-bookings"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              My Bookings
            </Link>

            <Link
              to="/profile"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "9px 16px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;