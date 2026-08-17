import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/movies/${id}`);

        console.log("Movie Details Response:", res.data);

        if (mounted) {
          setMovie(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load movie:", err);

        if (mounted) {
          setError("Failed to load movie");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchMovie();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingIcon}>🎬</div>

          <div style={styles.loader}></div>

          <h2 style={styles.loadingTitle}>
            Loading Movie
          </h2>

          <p style={styles.loadingText}>
            Preparing your movie experience...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>😕</div>

          <h2 style={styles.errorTitle}>
            Something went wrong
          </h2>

          <p style={styles.errorText}>
            {error}
          </p>

          <button
            onClick={() => navigate("/movies")}
            style={styles.primaryButton}
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     MOVIE NOT FOUND
  ========================= */

  if (!movie) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>🎬</div>

          <h2 style={styles.errorTitle}>
            Movie Not Found
          </h2>

          <p style={styles.errorText}>
            We couldn't find the movie you're looking for.
          </p>

          <button
            onClick={() => navigate("/movies")}
            style={styles.primaryButton}
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* =================================
          CINEMATIC BACKGROUND
      ================================= */}

      <div
        style={{
          ...styles.backdrop,
          backgroundImage: movie.poster
            ? `url(${movie.poster})`
            : "none",
        }}
      ></div>

      <div style={styles.backdropOverlay}></div>

      {/* =================================
          NAVBAR
      ================================= */}

      <nav style={styles.navbar}>
        <button
          onClick={() => navigate("/movies")}
          style={styles.backButton}
        >
          ← Back
        </button>

        <div style={styles.logo}>
          🎬 Movie
          <span style={styles.logoRed}>Book</span>
        </div>

        <div style={styles.navRight}>
          <span>Movie Details</span>
        </div>
      </nav>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main style={styles.container}>

        {/* Poster */}
        <div style={styles.posterSection}>

          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              style={styles.poster}
            />
          ) : (
            <div style={styles.noPoster}>
              🎬
              <span>No Poster</span>
            </div>
          )}

          {/* Poster Badge */}
          {movie.status && (
            <div style={styles.statusBadge}>
              {movie.status}
            </div>
          )}
        </div>

        {/* Movie Information */}
        <div style={styles.infoSection}>

          {/* Small label */}
          <div style={styles.smallLabel}>
            NOW SHOWING
          </div>

          {/* Title */}
          <h1 style={styles.title}>
            {movie.title}
          </h1>

          {/* Rating */}
          <div style={styles.ratingRow}>

            <div style={styles.ratingBox}>
              ⭐
              <strong>
                {movie.rating || "N/A"}
              </strong>
              <span>/ 10</span>
            </div>

            <span style={styles.dot}>•</span>

            <span>
              {movie.language || "Language"}
            </span>

            <span style={styles.dot}>•</span>

            <span>
              {movie.duration
                ? `${movie.duration} mins`
                : "Duration unavailable"}
            </span>
          </div>

          {/* Description */}
          <p style={styles.description}>
            {movie.description ||
              "Experience this movie on the big screen."}
          </p>

          {/* Movie Details */}
          <div style={styles.detailsGrid}>

            <div style={styles.detailCard}>
              <span style={styles.detailIcon}>🎭</span>

              <div>
                <span style={styles.detailLabel}>
                  Genre
                </span>

                <strong style={styles.detailValue}>
                  {movie.genre || "Not specified"}
                </strong>
              </div>
            </div>

            <div style={styles.detailCard}>
              <span style={styles.detailIcon}>🌐</span>

              <div>
                <span style={styles.detailLabel}>
                  Language
                </span>

                <strong style={styles.detailValue}>
                  {movie.language || "Not specified"}
                </strong>
              </div>
            </div>

            <div style={styles.detailCard}>
              <span style={styles.detailIcon}>⏱️</span>

              <div>
                <span style={styles.detailLabel}>
                  Duration
                </span>

                <strong style={styles.detailValue}>
                  {movie.duration
                    ? `${movie.duration} min`
                    : "N/A"}
                </strong>
              </div>
            </div>

            <div style={styles.detailCard}>
              <span style={styles.detailIcon}>📅</span>

              <div>
                <span style={styles.detailLabel}>
                  Release Date
                </span>

                <strong style={styles.detailValue}>
                  {movie.releaseDate
                    ? new Date(
                        movie.releaseDate
                      ).toLocaleDateString()
                    : "N/A"}
                </strong>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div style={styles.actions}>

            <button
              onClick={() =>
                navigate(
                  `/movie/${movie._id}/theatres`
                )
              }
              style={styles.bookButton}
            >
              🎟️ Select Theatre

              <span style={styles.arrow}>
                →
              </span>
            </button>

            <button
              onClick={() => navigate("/movies")}
              style={styles.secondaryButton}
            >
              Browse More Movies
            </button>

          </div>

          {/* Bottom Message */}
          <div style={styles.bookingMessage}>
            <span>🍿</span>

            <div>
              <strong>
                Ready for movie night?
              </strong>

              <p>
                Choose a theatre and find your perfect
                show time.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* =================================
   STYLES
================================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  fullPage: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at center, #1a0808, #050505 60%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* BACKDROP */

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(25px)",
    transform: "scale(1.1)",
    opacity: 0.25,
  },

  backdropOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, #050505 5%, rgba(5,5,5,0.88) 45%, rgba(5,5,5,0.55) 100%), linear-gradient(0deg, #050505 0%, transparent 60%)",
  },

  /* NAVBAR */

  navbar: {
    height: "75px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    background: "rgba(5,5,5,0.65)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 10,
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "21px",
    fontWeight: "800",
  },

  logoRed: {
    color: "#ef4444",
  },

  backButton: {
    background: "rgba(255,255,255,0.06)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    color: "#ddd",
    padding: "9px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  navRight: {
    color: "#777",
    fontSize: "13px",
  },

  /* MAIN */

  container: {
    maxWidth: "1200px",
    minHeight: "calc(100vh - 75px)",
    margin: "0 auto",
    padding: "70px 5%",
    display: "grid",
    gridTemplateColumns:
      "350px 1fr",
    gap: "70px",
    alignItems: "center",
    position: "relative",
    zIndex: 5,
    boxSizing: "border-box",
  },

  /* POSTER */

  posterSection: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },

  poster: {
    width: "330px",
    height: "490px",
    objectFit: "cover",
    borderRadius: "16px",
    display: "block",
    border:
      "1px solid rgba(255,255,255,0.15)",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.8)",
  },

  noPoster: {
    width: "330px",
    height: "490px",
    borderRadius: "16px",
    background:
      "linear-gradient(145deg,#1f1f1f,#0c0c0c)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    fontSize: "55px",
    color: "#555",
  },

  statusBadge: {
    position: "absolute",
    top: "18px",
    left: "15px",
    background: "#dc2626",
    color: "#fff",
    padding: "7px 12px",
    borderRadius: "50px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
    boxShadow:
      "0 8px 20px rgba(220,38,38,0.35)",
  },

  /* INFO */

  infoSection: {
    maxWidth: "700px",
  },

  smallLabel: {
    color: "#ef4444",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "3px",
    marginBottom: "15px",
  },

  title: {
    fontSize: "clamp(42px, 5vw, 68px)",
    lineHeight: "1",
    letterSpacing: "-3px",
    margin: "0 0 20px",
    fontWeight: "900",
  },

  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#aaa",
    fontSize: "14px",
    flexWrap: "wrap",
  },

  ratingBox: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#fff",
  },

  dot: {
    color: "#444",
  },

  description: {
    color: "#a1a1aa",
    fontSize: "16px",
    lineHeight: "1.8",
    margin:
      "30px 0",
    maxWidth: "650px",
  },

  /* DETAILS */

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "30px",
  },

  detailCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
  },

  detailIcon: {
    fontSize: "21px",
  },

  detailLabel: {
    display: "block",
    color: "#666",
    fontSize: "10px",
    marginBottom: "3px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  detailValue: {
    display: "block",
    color: "#ddd",
    fontSize: "13px",
  },

  /* ACTIONS */

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  bookButton: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background:
      "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    border: "none",
    padding: "15px 22px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow:
      "0 12px 30px rgba(220,38,38,0.25)",
  },

  arrow: {
    fontSize: "20px",
  },

  secondaryButton: {
    background:
      "rgba(255,255,255,0.05)",
    color: "#ddd",
    border:
      "1px solid rgba(255,255,255,0.12)",
    padding: "14px 18px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  bookingMessage: {
    marginTop: "25px",
    padding: "15px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    background:
      "rgba(220,38,38,0.06)",
    border:
      "1px solid rgba(220,38,38,0.12)",
    borderRadius: "10px",
  },

  loadingContainer: {
    textAlign: "center",
  },

  loadingIcon: {
    fontSize: "45px",
    marginBottom: "20px",
  },

  loader: {
    width: "35px",
    height: "35px",
    border:
      "3px solid #333",
    borderTop:
      "3px solid #ef4444",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation:
      "spin 1s linear infinite",
  },

  loadingTitle: {
    margin: "0",
    fontSize: "22px",
  },

  loadingText: {
    color: "#777",
    fontSize: "13px",
  },

  errorContainer: {
    textAlign: "center",
    padding: "30px",
  },

  errorIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  errorTitle: {
    fontSize: "26px",
    marginBottom: "8px",
  },

  errorText: {
    color: "#888",
    marginBottom: "25px",
  },

  primaryButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "13px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default MovieDetails;