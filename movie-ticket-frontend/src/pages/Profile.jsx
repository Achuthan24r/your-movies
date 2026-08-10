import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2>Please login to view your profile.</h2>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>👤 My Profile</h1>

      <div style={{ marginTop: "25px" }}>
        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        {user.phone && (
          <p>
            <strong>Phone:</strong>{" "}
            {user.phone}
          </p>
        )}

        <p>
          <strong>Role:</strong>{" "}
          {user.role || "user"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => navigate("/my-bookings")}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          My Bookings
        </button>

        <button
          onClick={logout}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            background: "#dc2626",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;