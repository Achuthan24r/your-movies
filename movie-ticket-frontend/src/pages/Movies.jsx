import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    let mounted = true;

    const loadMovies = async () => {
      try {
        const res = await API.get("/movies");

        if (mounted) {
          setMovies(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);

        if (mounted) {
          setError("Failed to load movies");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingIcon}>🎬</div>

          <div style={styles.loader}></div>

          <h2 style={styles.loadingTitle}>
            Finding Movies
          </h2>

          <p style={styles.loadingText}>
            Preparing your movie collection...
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
        <div style={styles.errorBox}>
          <div style={styles.errorIcon}>😕</div>

          <h2>{error}</h2>

          <p>
            Please check your connection and try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     GENRES
  ========================= */

  const genres = [
    "All",
    ...new Set(
      movies
        .map((movie) => movie.genre)
        .filter(Boolean)
    ),
  ];

  /* =========================
     FILTER
  ========================= */

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div style={styles.page}>

      {/* Background glow */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav style={styles.navbar}>

        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>
            🎬
          </span>

          <span>
            Movie<span style={styles.logoRed}>Book</span>
          </span>
        </Link>

        <div style={styles.navLinks}>

          <Link to="/" style={styles.navLink}>
            Home
          </Link>

          <Link
            to="/movies"
            style={{
              ...styles.navLink,
              color: "#fff",
            }}
          >
            Movies
          </Link>

          <Link
            to="/my-bookings"
            style={styles.navLink}
          >
            My Bookings
          </Link>

        </div>

        <Link
          to="/movies"
          style={styles.navButton}
        >
          🎟️ Book Now
        </Link>

      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section style={styles.hero}>

        <div>
          <div style={styles.heroBadge}>
            🎥 EXPLORE THE MAGIC OF CINEMA
          </div>

          <h1 style={styles.heroTitle}>
            Find your next
            <br />
            <span style={styles.heroRed}>
              favourite movie.
            </span>
          </h1>

          <p style={styles.heroDescription}>
            Discover the latest releases, explore
            different genres and book your perfect
            movie experience.
          </p>
        </div>

        {/* Search */}
        <div style={styles.searchBox}>

          <span style={styles.searchIcon}>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              style={styles.clearButton}
            >
              ✕
            </button>
          )}

        </div>

      </section>

      {/* =========================
          GENRE FILTER
      ========================= */}

      <section style={styles.filterSection}>

        <div style={styles.filterHeader}>
          <h2 style={styles.sectionTitle}>
            Browse Movies
          </h2>

          <span style={styles.movieCount}>
            {filteredMovies.length} movies
          </span>
        </div>

        <div style={styles.genreContainer}>

          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                setSelectedGenre(genre)
              }
              style={{
                ...styles.genreButton,
                ...(selectedGenre === genre
                  ? styles.genreActive
                  : {}),
              }}
            >
              {genre}
            </button>
          ))}

        </div>

      </section>

      {/* =========================
          MOVIES
      ========================= */}

      <main style={styles.movieContainer}>

        {filteredMovies.length === 0 ? (
          <div style={styles.emptyState}>

            <div style={styles.emptyIcon}>
              🎬
            </div>

            <h2>
              No Movies Found
            </h2>

            <p>
              Try searching for another movie
              or choose a different genre.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedGenre("All");
              }}
              style={styles.resetButton}
            >
              Reset Filters
            </button>

          </div>
        ) : (
          <div style={styles.grid}>

            {filteredMovies.map((movie) => (

              <Link
                key={movie._id}
                to={`/movie/${movie._id}`}
                style={styles.cardLink}
              >

                <article style={styles.card}>

                  {/* Poster */}
                  <div style={styles.posterContainer}>

                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        style={styles.poster}
                      />
                    ) : (
                      <div style={styles.noPoster}>
                        <span>
                          🎬
                        </span>

                        <small>
                          No Poster
                        </small>
                      </div>
                    )}

                    {/* Poster overlay */}
                    <div style={styles.posterOverlay}></div>

                    {/* Status */}
                    {movie.status && (
                      <span style={styles.status}>
                        {movie.status}
                      </span>
                    )}

                    {/* Rating */}
                    <div style={styles.ratingBadge}>
                      ⭐ {movie.rating || "N/A"}
                    </div>

                    {/* Hover button */}
                    <div style={styles.viewOverlay}>
                      <span style={styles.playCircle}>
                        ▶
                      </span>

                      <span>
                        View Details
                      </span>
                    </div>

                  </div>

                  {/* Information */}
                  <div style={styles.cardContent}>

                    <h2 style={styles.movieTitle}>
                      {movie.title}
                    </h2>

                    <div style={styles.meta}>

                      <span>
                        🎭 {movie.genre || "Movie"}
                      </span>

                      <span>
                        ⏱️{" "}
                        {movie.duration
                          ? `${movie.duration}m`
                          : "N/A"}
                      </span>

                    </div>

                    <div style={styles.bottomRow}>

                      <span style={styles.language}>
                        🌐 {movie.language || "N/A"}
                      </span>

                      <span style={styles.arrow}>
                        →
                      </span>

                    </div>

                  </div>

                </article>

              </Link>

            ))}

          </div>
        )}

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer style={styles.footer}>

        <div style={styles.footerLogo}>
          🎬 Movie<span>Book</span>
        </div>

        <p>
          Your movie night starts here. 🍿
        </p>

      </footer>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 80% 10%, rgba(220,38,38,0.12), transparent 25%), #050505",
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
    justifyContent: "center",
    alignItems: "center",
    fontFamily:
      "Inter, system-ui, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(220,38,38,0.12)",
    filter: "blur(100px)",
    top: "200px",
    right: "-150px",
    pointerEvents: "none",
  },

  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "rgba(239,68,68,0.08)",
    filter: "blur(100px)",
    bottom: "100px",
    left: "-150px",
    pointerEvents: "none",
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
    background:
      "rgba(5,5,5,0.75)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 10,
    boxSizing: "border-box",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "800",
  },

  logoIcon: {
    fontSize: "29px",
  },

  logoRed: {
    color: "#ef4444",
  },

  navLinks: {
    display: "flex",
    gap: "32px",
  },

  navLink: {
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },

  navButton: {
    textDecoration: "none",
    background: "#dc2626",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
  },

  /* HERO */

  hero: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "70px 5% 45px",
    position: "relative",
    zIndex: 2,
  },

  heroBadge: {
    display: "inline-block",
    color: "#f87171",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "15px",
  },

  heroTitle: {
    fontSize: "clamp(42px, 6vw, 70px)",
    lineHeight: "1",
    letterSpacing: "-3px",
    margin: "0",
    fontWeight: "900",
  },

  heroRed: {
    color: "#ef4444",
  },

  heroDescription: {
    maxWidth: "600px",
    color: "#888",
    lineHeight: "1.7",
    fontSize: "15px",
    margin:
      "20px 0 30px",
  },

  /* SEARCH */

  searchBox: {
    maxWidth: "650px",
    height: "55px",
    display: "flex",
    alignItems: "center",
    background: "#111113",
    border:
      "1px solid #292929",
    borderRadius: "11px",
    padding: "0 16px",
    boxSizing: "border-box",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.25)",
  },

  searchIcon: {
    fontSize: "17px",
    marginRight: "10px",
  },

  searchInput: {
    flex: 1,
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    fontSize: "14px",
  },

  clearButton: {
    background: "transparent",
    border: "none",
    color: "#777",
    cursor: "pointer",
  },

  /* FILTER */

  filterSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 5% 25px",
    position: "relative",
    zIndex: 2,
  },

  filterHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
  },

  movieCount: {
    color: "#666",
    fontSize: "12px",
  },

  genreContainer: {
    display: "flex",
    gap: "9px",
    flexWrap: "wrap",
  },

  genreButton: {
    background: "#111",
    color: "#888",
    border:
      "1px solid #292929",
    padding: "8px 15px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  genreActive: {
    background: "#dc2626",
    color: "#fff",
    border:
      "1px solid #dc2626",
  },

  /* MOVIE GRID */

  movieContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px 5% 70px",
    position: "relative",
    zIndex: 2,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(210px, 1fr))",
    gap: "22px",
  },

  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },

  card: {
    background: "#101012",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    transition:
      "transform 0.25s ease, border-color 0.25s ease",
    cursor: "pointer",
  },

  posterContainer: {
    height: "300px",
    position: "relative",
    overflow: "hidden",
    background: "#151515",
  },

  poster: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition:
      "transform 0.4s ease",
  },

  posterOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(transparent 45%, rgba(0,0,0,0.85))",
    pointerEvents: "none",
  },

  noPoster: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#555",
    fontSize: "35px",
  },

  status: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#dc2626",
    color: "#fff",
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "9px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  ratingBadge: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    background:
      "rgba(0,0,0,0.75)",
    backdropFilter: "blur(8px)",
    padding: "6px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
  },

  viewOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background:
      "rgba(0,0,0,0.45)",
    opacity: 0,
    color: "#fff",
    fontSize: "13px",
    fontWeight: "700",
  },

  playCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    paddingLeft: "2px",
  },

  cardContent: {
    padding: "16px",
  },

  movieTitle: {
    margin: "0 0 12px",
    fontSize: "17px",
    fontWeight: "750",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    color: "#777",
    fontSize: "11px",
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    paddingTop: "12px",
    borderTop:
      "1px solid #222",
  },

  language: {
    color: "#999",
    fontSize: "11px",
  },

  arrow: {
    color: "#ef4444",
    fontSize: "19px",
    fontWeight: "700",
  },

  /* EMPTY */

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#777",
  },

  emptyIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },

  resetButton: {
    marginTop: "15px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "11px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  /* LOADING */

  loadingBox: {
    textAlign: "center",
  },

  loadingIcon: {
    fontSize: "50px",
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
  },

  loadingTitle: {
    margin: "0",
  },

  loadingText: {
    color: "#666",
    fontSize: "13px",
  },

  /* ERROR */

  errorBox: {
    textAlign: "center",
    color: "#fff",
  },

  errorIcon: {
    fontSize: "55px",
  },

  retryButton: {
    marginTop: "15px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  /* FOOTER */

  footer: {
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    padding: "30px",
    color: "#555",
    position: "relative",
    zIndex: 2,
  },

  footerLogo: {
    color: "#ddd",
    fontWeight: "800",
    fontSize: "17px",
  },
};

export default Movies;