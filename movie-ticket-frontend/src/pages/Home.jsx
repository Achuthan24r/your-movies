import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      {/* Background Glow */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🎬</span>
          <span>Movie<span style={styles.logoRed}>Book</span></span>
        </Link>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>

          <Link to="/movies" style={styles.navLink}>
            Movies
          </Link>

          <Link to="/my-bookings" style={styles.navLink}>
            My Bookings
          </Link>
        </div>

        <Link to="/movies" style={styles.navButton}>
          Book Tickets
        </Link>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero}>
        {/* Left Content */}
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span>🔥</span>
            <span>YOUR MOVIE NIGHT STARTS HERE</span>
          </div>

          <h1 style={styles.title}>
            Movies that make
            <br />
            <span style={styles.titleHighlight}>memories.</span>
          </h1>

          <p style={styles.description}>
            Discover the latest movies, choose your favourite theatre,
            pick your perfect seats and enjoy an unforgettable movie
            experience.
          </p>

          {/* Buttons */}
          <div style={styles.buttons}>
            <Link to="/movies" style={styles.primaryButton}>
              🎟️ Browse Movies
              <span style={styles.arrow}>→</span>
            </Link>

            <Link to="/movies" style={styles.secondaryButton}>
              Explore Shows
            </Link>
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            <div>
              <h3 style={styles.statNumber}>100+</h3>
              <p style={styles.statText}>Movies</p>
            </div>

            <div style={styles.divider}></div>

            <div>
              <h3 style={styles.statNumber}>50+</h3>
              <p style={styles.statText}>Theatres</p>
            </div>

            <div style={styles.divider}></div>

            <div>
              <h3 style={styles.statNumber}>10K+</h3>
              <p style={styles.statText}>Happy Users</p>
            </div>
          </div>
        </div>

        {/* Right Movie Visual */}
        <div style={styles.visualContainer}>
          <div style={styles.posterGlow}></div>

          <div style={styles.movieCard}>
            <div style={styles.movieImage}>
              <div style={styles.imageOverlay}></div>

              <div style={styles.playButton}>▶</div>

              <div style={styles.movieInfo}>
                <span style={styles.movieTag}>NOW SHOWING</span>

                <h2 style={styles.movieTitle}>Your Next</h2>
                <h2 style={styles.movieTitleAccent}>Movie Adventure</h2>

                <div style={styles.rating}>
                  ⭐ <strong>8.9</strong>
                  <span> • </span>
                  <span>Action · Drama</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div style={styles.floatingCard}>
            <span style={styles.ticketIcon}>🎟️</span>

            <div>
              <strong style={{ color: "#fff" }}>Easy Booking</strong>
              <p style={{ margin: "3px 0 0", color: "#9ca3af" }}>
                Book in seconds
              </p>
            </div>
          </div>

          <div style={styles.ratingCard}>
            <span>⭐</span>
            <div>
              <strong style={{ color: "#fff" }}>4.9/5</strong>
              <p style={{ margin: "2px 0 0", color: "#9ca3af" }}>
                User rating
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Feature Section */}
      <section style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🎬</div>
          <div>
            <h3 style={styles.featureTitle}>Latest Movies</h3>
            <p style={styles.featureText}>
              Discover the newest releases.
            </p>
          </div>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>💺</div>
          <div>
            <h3 style={styles.featureTitle}>Best Seats</h3>
            <p style={styles.featureText}>
              Pick the seat you love.
            </p>
          </div>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>⚡</div>
          <div>
            <h3 style={styles.featureTitle}>Quick Booking</h3>
            <p style={styles.featureText}>
              Fast and hassle-free booking.
            </p>
          </div>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>🔒</div>
          <div>
            <h3 style={styles.featureTitle}>Secure</h3>
            <p style={styles.featureText}>
              Your bookings are protected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 75% 20%, #3b0a0a 0%, transparent 30%), linear-gradient(135deg, #050505 0%, #0b0b0f 45%, #120707 100%)",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: "hidden",
    position: "relative",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(220, 38, 38, 0.15)",
    filter: "blur(100px)",
    top: "150px",
    right: "-100px",
    pointerEvents: "none",
  },

  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(239, 68, 68, 0.08)",
    filter: "blur(100px)",
    bottom: "0",
    left: "-100px",
    pointerEvents: "none",
  },

  navbar: {
    height: "75px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(5,5,5,0.65)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 10,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  logoIcon: {
    fontSize: "30px",
  },

  logoRed: {
    color: "#ef4444",
  },

  navLinks: {
    display: "flex",
    gap: "35px",
  },

  navLink: {
    color: "#b8b8b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.2s",
  },

  navButton: {
    textDecoration: "none",
    color: "#fff",
    background: "#dc2626",
    padding: "11px 20px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: "0 8px 25px rgba(220,38,38,0.25)",
  },

  hero: {
    maxWidth: "1250px",
    margin: "0 auto",
    minHeight: "calc(100vh - 75px)",
    padding: "70px 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "60px",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  heroContent: {
    maxWidth: "620px",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 13px",
    borderRadius: "50px",
    background: "rgba(220,38,38,0.1)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#fca5a5",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "25px",
  },

  title: {
    fontSize: "clamp(48px, 6vw, 78px)",
    lineHeight: "0.98",
    letterSpacing: "-4px",
    margin: "0 0 25px",
    fontWeight: "900",
  },

  titleHighlight: {
    color: "#ef4444",
  },

  description: {
    color: "#a1a1aa",
    fontSize: "17px",
    lineHeight: "1.7",
    maxWidth: "570px",
    marginBottom: "35px",
  },

  buttons: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
    background: "#dc2626",
    color: "#fff",
    padding: "15px 22px",
    borderRadius: "9px",
    fontWeight: "700",
    boxShadow: "0 12px 30px rgba(220,38,38,0.25)",
  },

  arrow: {
    fontSize: "20px",
  },

  secondaryButton: {
    textDecoration: "none",
    color: "#ddd",
    padding: "14px 22px",
    border: "1px solid #333",
    borderRadius: "9px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.03)",
  },

  stats: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    marginTop: "50px",
  },

  statNumber: {
    margin: "0",
    fontSize: "24px",
    fontWeight: "800",
  },

  statText: {
    margin: "4px 0 0",
    color: "#777",
    fontSize: "12px",
  },

  divider: {
    height: "35px",
    width: "1px",
    background: "#333",
  },

  visualContainer: {
    width: "450px",
    height: "540px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  posterGlow: {
    position: "absolute",
    width: "300px",
    height: "420px",
    background: "#dc2626",
    opacity: "0.18",
    filter: "blur(70px)",
    borderRadius: "30px",
  },

  movieCard: {
    width: "320px",
    height: "450px",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    transform: "rotate(3deg)",
    position: "relative",
    zIndex: 2,
  },

  movieImage: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(160deg, #3b1111 0%, #150606 45%, #050505 100%)",
    position: "relative",
    overflow: "hidden",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 30%, rgba(239,68,68,0.45), transparent 30%), linear-gradient(transparent 30%, rgba(0,0,0,0.95) 90%)",
  },

  playButton: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    paddingLeft: "4px",
  },

  movieInfo: {
    position: "absolute",
    bottom: "25px",
    left: "25px",
    right: "20px",
  },

  movieTag: {
    color: "#f87171",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  movieTitle: {
    margin: "10px 0 0",
    fontSize: "30px",
    lineHeight: "1",
  },

  movieTitleAccent: {
    margin: "5px 0 15px",
    fontSize: "30px",
    lineHeight: "1",
    color: "#ef4444",
  },

  rating: {
    color: "#aaa",
    fontSize: "13px",
  },

  floatingCard: {
    position: "absolute",
    zIndex: 5,
    bottom: "45px",
    left: "0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 16px",
    background: "rgba(20,20,20,0.9)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
    backdropFilter: "blur(15px)",
    fontSize: "13px",
  },

  ticketIcon: {
    fontSize: "25px",
  },

  ratingCard: {
    position: "absolute",
    zIndex: 5,
    top: "70px",
    right: "0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 15px",
    background: "rgba(20,20,20,0.9)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
    backdropFilter: "blur(15px)",
    fontSize: "13px",
  },

  features: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "25px 5% 50px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    position: "relative",
    zIndex: 5,
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.025)",
  },

  featureIcon: {
    fontSize: "22px",
  },

  featureTitle: {
    margin: "0 0 3px",
    fontSize: "13px",
  },

  featureText: {
    margin: 0,
    color: "#777",
    fontSize: "11px",
  },
};

export default Home;