import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          🎬 Movie Ticket Booking
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Book your favourite movies anytime, anywhere.
          Choose theatres, select seats and enjoy your show.
        </p>

        <Link to="/movies">
          <button
            style={{
              padding: "15px 35px",
              fontSize: "18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Browse Movies
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
