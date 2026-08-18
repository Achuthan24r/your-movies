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
        backgroundColor: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* ================= LOGO ================= */}

      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "700",
          whiteSpace: "nowrap",
        }}
      >
        
      </Link>

      {/* ================= MENU ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
       

        {token ? (
          <>
          

            <Link
              to="/profile"
              style={linkStyle}
            >
              👤 Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "10px 18px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={linkStyle}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={linkStyle}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  whiteSpace: "nowrap"
  ,
  border: "3px solid #1d4ed8",
   margin: "15px", borderRadius: "5px", padding: "10px 15px", backgroundColor: "#2563eb", 
};

export default Navbar;