import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH MY BOOKINGS
  // ======================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/bookings/my");

      console.log("MY BOOKINGS RESPONSE:", res.data);

      if (res.data.success) {
        setBookings(res.data.data || []);
      } else {
        setError(
          res.data.message || "Failed to load bookings"
        );
      }
    } catch (err) {
      console.error("Fetch Booking Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD BOOKINGS
  // ======================================================

  useEffect(() => {
    let cancelled = false;

    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/bookings/my");

        console.log("MY BOOKINGS RESPONSE:", res.data);

        if (!cancelled) {
          if (res.data.success) {
            setBookings(res.data.data || []);
          } else {
            setError(
              res.data.message ||
                "Failed to load bookings"
            );
          }
        }
      } catch (err) {
        console.error("Fetch Booking Error:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch bookings"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  // ======================================================
  // CANCEL BOOKING
  // ======================================================

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const res = await API.put(
        `/bookings/cancel/${bookingId}`
      );

      console.log("CANCEL RESPONSE:", res.data);

      if (res.data.success) {
        alert("Booking cancelled successfully");

        await fetchBookings();
      } else {
        alert(
          res.data.message ||
            "Failed to cancel booking"
        );
      }
    } catch (err) {
      console.error("Cancel Booking Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to cancel booking"
      );
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingIcon}>
            🎟️
          </div>

          <div style={styles.loader}></div>

          <h2 style={styles.loadingTitle}>
            Loading Your Bookings
          </h2>

          <p style={styles.loadingText}>
            We're getting your tickets ready...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.errorBox}>
          <div style={styles.errorIcon}>
            😕
          </div>

          <h2>
            Couldn't Load Bookings
          </h2>

          <p style={styles.errorText}>
            {error}
          </p>

          <button
            onClick={fetchBookings}
            style={styles.primaryButton}
          >
            ↻ Try Again
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // NO BOOKINGS
  // ======================================================

  if (bookings.length === 0) {
    return (
      <div style={styles.page}>

        <Navbar />

        <div style={styles.emptyState}>

          <div style={styles.emptyIcon}>
            🎟️
          </div>

          <h1 style={styles.emptyTitle}>
            No Bookings Yet
          </h1>

          <p style={styles.emptyText}>
            Your movie tickets will appear here
            after you make your first booking.
          </p>

          <Link
            to="/movies"
            style={styles.primaryLink}
          >
            🎬 Explore Movies →
          </Link>

        </div>

      </div>
    );
  }

  // ======================================================
  // BOOKINGS
  // ======================================================

  return (
    <div style={styles.page}>

      {/* Background */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <Navbar />

      {/* Header */}
      <header style={styles.header}>

        <div>
          <div style={styles.smallLabel}>
            YOUR CINEMA JOURNEY
          </div>

          <h1 style={styles.title}>
            My Bookings
          </h1>

          <p style={styles.subtitle}>
            Keep track of your movie adventures
            and tickets.
          </p>
        </div>

        <Link
          to="/movies"
          style={styles.bookMoreButton}
        >
          🎬 Book Another Movie
        </Link>

      </header>

      {/* Booking count */}
      <div style={styles.countBar}>
        <span>
          🎟️ {bookings.length}{" "}
          {bookings.length === 1
            ? "Booking"
            : "Bookings"}
        </span>

        <span style={styles.countLine}></span>

        <span style={styles.countHint}>
          Your tickets
        </span>
      </div>

      {/* Booking cards */}
      <main style={styles.container}>

        {bookings.map((booking) => {
          const show = booking.show;
          const movie = show?.movie;
          const screen = show?.screen;
          const theatre = screen?.theatre;

          const isCancelled =
            booking.status === "Cancelled";

          return (
            <article
              key={booking._id}
              style={{
                ...styles.ticket,
                ...(isCancelled
                  ? styles.cancelledTicket
                  : {}),
              }}
            >

              {/* =====================================
                  TOP
              ===================================== */}

              <div style={styles.ticketTop}>

                <div style={styles.movieSection}>

                  {movie?.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={styles.poster}
                    />
                  ) : (
                    <div style={styles.noPoster}>
                      🎬
                    </div>
                  )}

                  <div style={styles.movieInfo}>

                    <span style={styles.ticketLabel}>
                      MOVIE TICKET
                    </span>

                    <h2 style={styles.movieTitle}>
                      {movie?.title || "Movie"}
                    </h2>

                    <div style={styles.rating}>
                      ⭐{" "}
                      {movie?.rating || "N/A"}
                    </div>

                  </div>

                </div>

                {/* Status */}
                <div
                  style={{
                    ...styles.status,
                    ...(isCancelled
                      ? styles.cancelledStatus
                      : {}),
                  }}
                >
                  {isCancelled
                    ? "✕ Cancelled"
                    : "✓ Confirmed"}
                </div>

              </div>

              {/* Dashed divider */}
              <div style={styles.ticketDivider}>
                <span style={styles.cutLeft}></span>
                <span style={styles.dashed}></span>
                <span style={styles.cutRight}></span>
              </div>

              {/* =====================================
                  DETAILS
              ===================================== */}

              <div style={styles.detailsGrid}>

                <TicketDetail
                  icon="🏢"
                  label="THEATRE"
                  value={
                    theatre?.name ||
                    screen?.theatreName ||
                    "Theatre"
                  }
                />

                <TicketDetail
                  icon="🎞️"
                  label="SCREEN"
                  value={
                    screen?.name ||
                    "Screen"
                  }
                />

                <TicketDetail
                  icon="📅"
                  label="DATE"
                  value={
                    show?.showDate
                      ? new Date(
                          show.showDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"
                  }
                />

                <TicketDetail
                  icon="⏰"
                  label="SHOW TIME"
                  value={
                    show?.startTime
                      ? `${show.startTime}${
                          show?.endTime
                            ? ` - ${show.endTime}`
                            : ""
                        }`
                      : "N/A"
                  }
                />

              </div>

              {/* =====================================
                  SEATS + AMOUNT
              ===================================== */}

              <div style={styles.bottomSection}>

                <div style={styles.seatsBox}>

                  <span style={styles.bottomLabel}>
                    YOUR SEATS
                  </span>

                  <div style={styles.seats}>
                    {Array.isArray(
                      booking.seats
                    ) &&
                    booking.seats.length > 0
                      ? booking.seats.map(
                          (seat, index) => (
                            <span
                              key={index}
                              style={styles.seat}
                            >
                              {seat}
                            </span>
                          )
                        )
                      : "N/A"}
                  </div>

                  <span style={styles.seatCount}>
                    {booking.seats?.length || 0}{" "}
                    {booking.seats?.length === 1
                      ? "Seat"
                      : "Seats"}
                  </span>

                </div>

                <div style={styles.amountBox}>

                  <span style={styles.bottomLabel}>
                    TOTAL AMOUNT
                  </span>

                  <strong style={styles.amount}>
                    ₹{booking.totalAmount || 0}
                  </strong>

                </div>

              </div>

              {/* =====================================
                  BOOKING INFO
              ===================================== */}

              <div style={styles.bookingInfo}>

                <span>
                  Booking ID:{" "}
                  <strong>
                    {booking._id?.slice(-8)}
                  </strong>
                </span>

                {booking.createdAt && (
                  <span>
                    Booked on{" "}
                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                )}

              </div>

              {/* =====================================
                  ACTION
              ===================================== */}

              {!isCancelled ? (
                <button
                  onClick={() =>
                    handleCancel(
                      booking._id
                    )
                  }
                  style={styles.cancelButton}
                >
                  Cancel Booking
                </button>
              ) : (
                <div style={styles.cancelledMessage}>
                  ❌ This booking has been cancelled.
                </div>
              )}

            </article>
          );
        })}

      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        🍿 MovieBook — Your movie night starts here.
      </footer>

    </div>
  );
}

/* =====================================================
   NAVBAR
===================================================== */

function Navbar() {
  return (
    <nav style={styles.navbar}>

      <Link to="/" style={styles.logo}>
        <span style={styles.logoIcon}>
          🎬
        </span>

        <span>
          Movie<span style={styles.logoRed}>
            Book
          </span>
        </span>
      </Link>

      <div style={styles.navLinks}>

        <Link
          to="/"
          style={styles.navLink}
        >
          Home
        </Link>

        <Link
          to="/movies"
          style={styles.navLink}
        >
          Movies
        </Link>

        <Link
          to="/my-bookings"
          style={{
            ...styles.navLink,
            color: "#fff",
          }}
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
  );
}

/* =====================================================
   TICKET DETAIL COMPONENT
===================================================== */

function TicketDetail({
  icon,
  label,
  value,
}) {
  return (
    <div style={styles.detail}>

      <span style={styles.detailIcon}>
        {icon}
      </span>

      <div>
        <span style={styles.detailLabel}>
          {label}
        </span>

        <strong style={styles.detailValue}>
          {value}
        </strong>
      </div>

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
      "radial-gradient(circle at 80% 10%, rgba(220,38,38,0.1), transparent 25%), #050505",
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
      "rgba(220,38,38,0.1)",
    filter: "blur(100px)",
    top: "250px",
    right: "-150px",
    pointerEvents: "none",
  },

  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "rgba(239,68,68,0.07)",
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

  /* HEADER */

  header: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "65px 5% 25px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "30px",
    position: "relative",
    zIndex: 2,
  },

  smallLabel: {
    color: "#ef4444",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "48px",
    letterSpacing: "-2px",
    fontWeight: "900",
  },

  subtitle: {
    margin:
      "10px 0 0",
    color: "#777",
    fontSize: "14px",
  },

  bookMoreButton: {
    textDecoration: "none",
    background:
      "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    padding: "13px 18px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    boxShadow:
      "0 10px 25px rgba(220,38,38,0.2)",
  },

  /* COUNT */

  countBar: {
    maxWidth: "900px",
    margin: "0 auto 25px",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#aaa",
    fontSize: "12px",
    position: "relative",
    zIndex: 2,
  },

  countLine: {
    height: "1px",
    flex: 1,
    background: "#222",
  },

  countHint: {
    color: "#555",
  },

  /* CONTAINER */

  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "10px 5% 70px",
    position: "relative",
    zIndex: 2,
  },

  /* TICKET */

  ticket: {
    background:
      "linear-gradient(145deg,#151517,#0d0d0f)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    marginBottom: "25px",
    overflow: "hidden",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.35)",
  },

  cancelledTicket: {
    opacity: 0.72,
    border:
      "1px solid rgba(255,255,255,0.06)",
  },

  ticketTop: {
    padding: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  movieSection: {
    display: "flex",
    alignItems: "center",
    gap: "17px",
  },

  poster: {
    width: "75px",
    height: "105px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  noPoster: {
    width: "75px",
    height: "105px",
    borderRadius: "8px",
    background: "#202020",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  movieInfo: {
    minWidth: 0,
  },

  ticketLabel: {
    color: "#ef4444",
    fontSize: "9px",
    letterSpacing: "2px",
    fontWeight: "800",
  },

  movieTitle: {
    margin: "7px 0",
    fontSize: "23px",
    fontWeight: "800",
  },

  rating: {
    color: "#fbbf24",
    fontSize: "12px",
  },

  status: {
    background:
      "rgba(34,197,94,0.1)",
    color: "#4ade80",
    border:
      "1px solid rgba(34,197,94,0.2)",
    padding: "7px 11px",
    borderRadius: "50px",
    fontSize: "10px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  cancelledStatus: {
    background:
      "rgba(239,68,68,0.1)",
    color: "#f87171",
    border:
      "1px solid rgba(239,68,68,0.2)",
  },

  /* DIVIDER */

  ticketDivider: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  dashed: {
    flex: 1,
    borderTop:
      "1px dashed #333",
  },

  cutLeft: {
    width: "14px",
    height: "28px",
    background: "#050505",
    borderRadius: "0 15px 15px 0",
  },

  cutRight: {
    width: "14px",
    height: "28px",
    background: "#050505",
    borderRadius: "15px 0 0 15px",
  },

  /* DETAILS */

  detailsGrid: {
    padding: "25px",
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "20px",
  },

  detail: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  detailIcon: {
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    background:
      "rgba(255,255,255,0.05)",
    fontSize: "17px",
  },

  detailLabel: {
    display: "block",
    color: "#555",
    fontSize: "9px",
    letterSpacing: "1px",
    fontWeight: "700",
    marginBottom: "4px",
  },

  detailValue: {
    display: "block",
    color: "#ddd",
    fontSize: "13px",
  },

  /* BOTTOM */

  bottomSection: {
    margin:
      "0 25px",
    padding:
      "20px 0",
    borderTop:
      "1px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
  },

  seatsBox: {
    flex: 1,
  },

  amountBox: {
    textAlign: "right",
  },

  bottomLabel: {
    display: "block",
    color: "#555",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "9px",
  },

  seats: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  seat: {
    background:
      "rgba(220,38,38,0.1)",
    color: "#f87171",
    border:
      "1px solid rgba(220,38,38,0.25)",
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "11px",
    fontWeight: "700",
  },

  seatCount: {
    display: "block",
    color: "#555",
    fontSize: "10px",
    marginTop: "7px",
  },

  amount: {
    fontSize: "25px",
    color: "#fff",
  },

  /* BOOKING INFO */

  bookingInfo: {
    padding:
      "14px 25px",
    borderTop:
      "1px solid #222",
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    color: "#555",
    fontSize: "10px",
  },

  /* CANCEL */

  cancelButton: {
    margin:
      "0 25px 25px",
    padding: "10px 17px",
    background:
      "rgba(239,68,68,0.08)",
    color: "#f87171",
    border:
      "1px solid rgba(239,68,68,0.2)",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700",
  },

  cancelledMessage: {
    margin:
      "0 25px 25px",
    padding: "11px",
    background:
      "rgba(239,68,68,0.05)",
    color: "#f87171",
    borderRadius: "7px",
    textAlign: "center",
    fontSize: "11px",
    fontWeight: "700",
  },

  /* EMPTY */

  emptyState: {
    minHeight:
      "calc(100vh - 75px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
    position: "relative",
    zIndex: 2,
  },

  emptyIcon: {
    width: "90px",
    height: "90px",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(220,38,38,0.08)",
    border:
      "1px solid rgba(220,38,38,0.15)",
    fontSize: "42px",
    marginBottom: "25px",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "30px",
  },

  emptyText: {
    color: "#777",
    maxWidth: "400px",
    lineHeight: "1.6",
    fontSize: "14px",
    margin:
      "12px 0 25px",
  },

  primaryLink: {
    textDecoration: "none",
    background: "#dc2626",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "8px",
    fontSize: "13px",
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
    margin: 0,
  },

  loadingText: {
    color: "#666",
    fontSize: "13px",
  },

  /* ERROR */

  errorBox: {
    textAlign: "center",
    maxWidth: "400px",
    padding: "30px",
  },

  errorIcon: {
    fontSize: "55px",
  },

  errorText: {
    color: "#888",
    fontSize: "14px",
    marginBottom: "25px",
  },

  primaryButton: {
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
    padding: "30px",
    textAlign: "center",
    color: "#555",
    fontSize: "11px",
    position: "relative",
    zIndex: 2,
  },
};

export default MyBookings;