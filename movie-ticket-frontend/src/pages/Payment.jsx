import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingData = location.state;

  // ======================================================
  // CHECK BOOKING DATA
  // ======================================================

  if (
    !bookingData ||
    !bookingData.showId ||
    !bookingData.seats ||
    bookingData.seats.length === 0
  ) {
    return (
      <div style={styles.page}>
        <div style={styles.missingCard}>
          <div style={styles.bigIcon}>🎟️</div>

          <h1 style={styles.missingTitle}>
            Booking Information Missing
          </h1>

          <p style={styles.missingText}>
            We couldn't find your selected show or
            seats. Please select your movie and seats
            again.
          </p>

          <button
            onClick={() => navigate("/movies")}
            style={styles.primaryButton}
          >
            🎬 Browse Movies
          </button>
        </div>
      </div>
    );
  }

  const {
    showId,
    seats,
    totalAmount,
    movieTitle,
    showTime,
    showDate,
    ticketPrice,
  } = bookingData;

  // ======================================================
  // PAYMENT / BOOKING
  // ======================================================

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before booking.");
        setLoading(false);
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          show: showId,
          seats: seats,
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking Response:", response.data);

      if (response.data.success) {
        alert("Booking successful!");

        navigate("/my-bookings");
      }
    } catch (err) {
      console.error("Booking Error:", err);

      if (err.response) {
        console.log(
          "Status:",
          err.response.status
        );

        console.log(
          "Response:",
          err.response.data
        );

        if (err.response.status === 409) {
          const bookedSeats =
            err.response.data.seats || seats;

          setError(
            `These seats are already booked: ${bookedSeats.join(
              ", "
            )}. Please go back and select different seats.`
          );
        } else if (err.response.status === 401) {
          setError(
            "Your login session has expired. Please login again."
          );

          localStorage.removeItem("token");

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setError(
            err.response.data.message ||
              "Booking failed."
          );
        }
      } else {
        setError(
          "Unable to connect to the server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAYMENT PAGE
  // ======================================================

  return (
    <div style={styles.page}>

      {/* Background glow */}
      <div style={styles.glow}></div>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav style={styles.navbar}>

        <div
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          <span style={styles.logoIcon}>
            🎬
          </span>

          <span>
            Movie<span style={styles.logoRed}>
              Book
            </span>
          </span>
        </div>

        <div style={styles.secure}>
          🔒 Secure Checkout
        </div>

      </nav>

      {/* ==================================================
          HEADER
      ================================================== */}

      <header style={styles.header}>

        <div style={styles.stepLabel}>
          STEP 3 OF 3
        </div>

        <h1 style={styles.title}>
          Confirm Your Booking
        </h1>

        <p style={styles.subtitle}>
          Review your tickets before confirming
          your movie night.
        </p>

      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main style={styles.container}>

        {/* LEFT SIDE */}
        <section style={styles.leftColumn}>

          {/* Movie Card */}

          <div style={styles.movieCard}>

            <div style={styles.moviePoster}>
              🎬
            </div>

            <div style={styles.movieInfo}>

              <span style={styles.movieLabel}>
                MOVIE
              </span>

              <h2 style={styles.movieTitle}>
                {movieTitle || "Selected Movie"}
              </h2>

              <div style={styles.movieMeta}>
                🎭 Cinema Experience
              </div>

            </div>

          </div>

          {/* Show Details */}

          <div style={styles.sectionCard}>

            <div style={styles.cardHeader}>
              <span>🎞️</span>

              <h2>
                Show Details
              </h2>
            </div>

            <div style={styles.detailsGrid}>

              <Detail
                icon="📅"
                label="DATE"
                value={showDate || "N/A"}
              />

              <Detail
                icon="⏰"
                label="TIME"
                value={showTime || "N/A"}
              />

              <Detail
                icon="🎟️"
                label="SEATS"
                value={`${seats.length} ${
                  seats.length === 1
                    ? "Seat"
                    : "Seats"
                }`}
              />

              <Detail
                icon="💺"
                label="SELECTED"
                value={seats.join(", ")}
              />

            </div>

          </div>

          {/* Selected Seats */}

          <div style={styles.sectionCard}>

            <div style={styles.cardHeader}>
              <span>💺</span>

              <h2>
                Your Seats
              </h2>
            </div>

            <div style={styles.seatContainer}>

              {seats.map(
                (seat, index) => (
                  <div
                    key={index}
                    style={styles.seat}
                  >
                    {seat}
                  </div>
                )
              )}

            </div>

          </div>

          {/* Security */}

          <div style={styles.securityBox}>

            <div style={styles.securityIcon}>
              🔐
            </div>

            <div>
              <strong>
                Your booking is secure
              </strong>

              <p>
                Your information is protected
                and your seats will be reserved
                after confirmation.
              </p>
            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <aside style={styles.summaryCard}>

          <div style={styles.summaryHeader}>
            <h2>
              Booking Summary
            </h2>

            <span>
              🎟️
            </span>
          </div>

          {/* Ticket price */}

          <div style={styles.priceRow}>

            <span>
              Ticket Price
            </span>

            <strong>
              ₹{ticketPrice || 0}
            </strong>

          </div>

          <div style={styles.priceRow}>

            <span>
              Number of Seats
            </span>

            <strong>
              × {seats.length}
            </strong>

          </div>

          <div style={styles.priceRow}>

            <span>
              Subtotal
            </span>

            <strong>
              ₹{totalAmount || 0}
            </strong>

          </div>

          <div style={styles.divider}></div>

          {/* Total */}

          <div style={styles.totalRow}>

            <div>
              <span style={styles.totalLabel}>
                TOTAL AMOUNT
              </span>

              <strong style={styles.total}>
                ₹{totalAmount || 0}
              </strong>
            </div>

            <span style={styles.currency}>
              INR
            </span>

          </div>

          {/* Error */}

          {error && (
            <div style={styles.errorBox}>

              <span>
                ⚠️
              </span>

              <div>
                <strong>
                  Booking Issue
                </strong>

                <p>
                  {error}
                </p>
              </div>

            </div>
          )}

          {/* Confirm */}

          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              ...styles.confirmButton,
              ...(loading
                ? styles.disabledButton
                : {}),
            }}
          >

            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Processing Booking...
              </>
            ) : (
              <>
                🔒 Confirm & Pay ₹
                {totalAmount || 0}
              </>
            )}

          </button>

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            style={styles.backButton}
          >
            ← Back to Seats
          </button>

          <p style={styles.terms}>
            By confirming this booking, you agree
            to our booking terms and conditions.
          </p>

        </aside>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer style={styles.footer}>
        🍿 Enjoy the show! Your movie adventure
        starts here.
      </footer>

    </div>
  );
};

/* ========================================================
   DETAIL COMPONENT
======================================================== */

const Detail = ({
  icon,
  label,
  value,
}) => {
  return (
    <div style={styles.detail}>

      <div style={styles.detailIcon}>
        {icon}
      </div>

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
};

/* ========================================================
   STYLES
======================================================== */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 80% 10%, rgba(220,38,38,0.12), transparent 25%), #070707",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(220,38,38,0.08)",
    filter: "blur(100px)",
    right: "-180px",
    top: "250px",
    pointerEvents: "none",
  },

  navbar: {
    height: "72px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    background: "rgba(7,7,7,0.8)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 5,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    fontSize: "22px",
    fontWeight: "900",
    cursor: "pointer",
  },

  logoIcon: {
    fontSize: "28px",
  },

  logoRed: {
    color: "#ef4444",
  },

  secure: {
    color: "#777",
    fontSize: "12px",
    fontWeight: "600",
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "55px 5% 30px",
    position: "relative",
    zIndex: 2,
  },

  stepLabel: {
    color: "#ef4444",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "42px",
    fontWeight: "900",
    letterSpacing: "-1.5px",
  },

  subtitle: {
    color: "#777",
    fontSize: "14px",
    marginTop: "10px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 5% 60px",
    display: "grid",
    gridTemplateColumns: "1.5fr 0.9fr",
    gap: "25px",
    position: "relative",
    zIndex: 2,
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  movieCard: {
    background:
      "linear-gradient(135deg,#171719,#0f0f11)",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  moviePoster: {
    width: "70px",
    height: "90px",
    borderRadius: "8px",
    background:
      "linear-gradient(135deg,#7f1d1d,#dc2626)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },

  movieInfo: {
    flex: 1,
  },

  movieLabel: {
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#ef4444",
    fontWeight: "800",
  },

  movieTitle: {
    margin: "7px 0",
    fontSize: "23px",
    fontWeight: "800",
  },

  movieMeta: {
    color: "#777",
    fontSize: "12px",
  },

  sectionCard: {
    background: "rgba(18,18,20,0.9)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "22px",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
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
    borderRadius: "8px",
    background:
      "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  detailLabel: {
    display: "block",
    color: "#555",
    fontSize: "9px",
    letterSpacing: "1px",
    marginBottom: "4px",
  },

  detailValue: {
    display: "block",
    color: "#ddd",
    fontSize: "13px",
  },

  seatContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  seat: {
    padding: "9px 13px",
    background:
      "rgba(220,38,38,0.1)",
    border:
      "1px solid rgba(220,38,38,0.3)",
    color: "#f87171",
    borderRadius: "7px",
    fontSize: "12px",
    fontWeight: "800",
  },

  securityBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "13px",
    background:
      "rgba(34,197,94,0.05)",
    border:
      "1px solid rgba(34,197,94,0.12)",
    borderRadius: "12px",
    padding: "16px",
    color: "#aaa",
  },

  securityIcon: {
    fontSize: "20px",
  },

  summaryCard: {
    background:
      "linear-gradient(160deg,#171719,#0c0c0d)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "25px",
    height: "fit-content",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.4)",
    position: "sticky",
    top: "20px",
  },

  summaryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
    color: "#777",
    fontSize: "13px",
  },

  divider: {
    borderTop: "1px solid #292929",
    margin: "20px 0",
  },

  totalRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  totalLabel: {
    display: "block",
    color: "#666",
    fontSize: "9px",
    letterSpacing: "1px",
    marginBottom: "5px",
  },

  total: {
    fontSize: "30px",
    fontWeight: "900",
  },

  currency: {
    background: "#222",
    color: "#888",
    padding: "6px 8px",
    borderRadius: "5px",
    fontSize: "9px",
    fontWeight: "800",
  },

  errorBox: {
    display: "flex",
    gap: "10px",
    background:
      "rgba(239,68,68,0.08)",
    border:
      "1px solid rgba(239,68,68,0.25)",
    color: "#f87171",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "11px",
  },

  confirmButton: {
    width: "100%",
    minHeight: "52px",
    background:
      "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "800",
    boxShadow:
      "0 12px 30px rgba(220,38,38,0.2)",
  },

  disabledButton: {
    background: "#444",
    cursor: "not-allowed",
    boxShadow: "none",
  },

  backButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "transparent",
    color: "#777",
    border:
      "1px solid #292929",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
  },

  terms: {
    color: "#444",
    textAlign: "center",
    fontSize: "9px",
    lineHeight: "1.5",
    marginTop: "15px",
  },

  missingCard: {
    maxWidth: "450px",
    textAlign: "center",
    padding: "45px",
    background:
      "linear-gradient(145deg,#171719,#0d0d0f)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
  },

  bigIcon: {
    fontSize: "55px",
    marginBottom: "20px",
  },

  missingTitle: {
    margin: 0,
    fontSize: "26px",
  },

  missingText: {
    color: "#777",
    lineHeight: "1.6",
    fontSize: "13px",
    margin: "12px 0 25px",
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

  spinner: {
    display: "inline-block",
    width: "13px",
    height: "13px",
    border:
      "2px solid rgba(255,255,255,0.4)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    marginRight: "8px",
    verticalAlign: "middle",
  },

  footer: {
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    padding: "25px",
    textAlign: "center",
    color: "#444",
    fontSize: "11px",
    position: "relative",
    zIndex: 2,
  },
};
export default Payment;