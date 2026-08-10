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
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Logo + Title */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "55px",
              lineHeight: "1",
            }}
          >
            🎬
          </span>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              margin: "0",
              color: "#111827",
              whiteSpace: "nowrap",
              fontWeight: "700",
            }}
          >
            Movie Ticket Booking
          </h1>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.5",
            color: "#555",
            margin: "0 auto 30px",
            maxWidth: "700px",
          }}
        >
          Book your favourite movies anytime, anywhere.
          <br />
          Choose theatres, select seats and enjoy your show.
        </p>

        {/* Browse Movies Button */}
        <Link
          to="/movies"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            type="button"
            style={{
              padding: "15px 35px",
              fontSize: "18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
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