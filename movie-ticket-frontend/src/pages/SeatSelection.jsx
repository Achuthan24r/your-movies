import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH SHOW
  // ======================================================

  useEffect(() => {
    let cancelled = false;

    const fetchShow = async () => {
      try {
        setError("");

        const res = await API.get(
          `/shows/${showId}`
        );

        if (
          !cancelled &&
          res.data.success
        ) {
          setShow(res.data.data);
        }
      } catch (err) {
        console.error(
          "Failed to load show:",
          err
        );

        if (!cancelled) {
          setError(
            "Failed to load show information."
          );
        }
      }
    };

    if (showId) {
      fetchShow();
    }

    return () => {
      cancelled = true;
    };
  }, [showId]);

  // ======================================================
  // TOGGLE SEAT
  // ======================================================

  const toggleSeat = (seat) => {
    const seatNumber = String(seat);

    if (
      show.bookedSeats?.includes(seatNumber)
    ) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) => s !== seat
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (!show && !error) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingIcon}>
          🎬
        </div>

        <h2>
          Loading Cinema...
        </h2>

        <p>
          Preparing your seat map
        </p>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.errorIcon}>
          ⚠️
        </div>

        <h2>{error}</h2>

        <button
          onClick={() =>
            navigate("/movies")
          }
          style={styles.backButton}
        >
          ← Back to Movies
        </button>
      </div>
    );
  }

  // ======================================================
  // SEATS
  // ======================================================

  const seats = Array.from(
    { length: 50 },
    (_, i) => i + 1
  );

  const totalAmount =
    selectedSeats.length *
    show.ticketPrice;

  // ======================================================
  // PAYMENT
  // ======================================================

  const continueToPayment = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    navigate("/payment", {
      state: {
        showId: show._id,
        seats: selectedSeats,
        totalAmount,
        movieTitle:
          show.movie?.title,
        showTime: show.showTime,
        showDate: show.showDate,
        ticketPrice:
          show.ticketPrice,
      },
    });
  };

  // ======================================================
  // UI
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
          onClick={() =>
            navigate("/")
          }
        >
          🎬{" "}
          <span>
            Movie
            <span style={styles.logoRed}>
              Book
            </span>
          </span>
        </div>

        <button
          onClick={() =>
            navigate("/movies")
          }
          style={styles.navButton}
        >
          ← Movies
        </button>

      </nav>

      {/* ==================================================
          HEADER
      ================================================== */}

      <header style={styles.header}>

        <div>

          <span style={styles.eyebrow}>
            STEP 1 OF 2
          </span>

          <h1 style={styles.title}>
            Select Your Seats
          </h1>

          <p style={styles.subtitle}>
            Choose the perfect seats for
            your movie experience.
          </p>

        </div>

        {/* SHOW INFO */}

        <div style={styles.showInfo}>

          <div style={styles.movieIcon}>
            🎞️
          </div>

          <div>

            <span style={styles.movieLabel}>
              NOW BOOKING
            </span>

            <h2 style={styles.movieTitle}>
              {show.movie?.title ||
                "Movie"}
            </h2>

            <p style={styles.movieMeta}>
              🕐 {show.showTime || "N/A"}
              {"  "}•{"  "}
              📅{" "}
              {show.showDate
                ? new Date(
                    show.showDate
                  ).toLocaleDateString(
                    "en-IN"
                  )
                : "N/A"}
            </p>

          </div>

        </div>

      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main style={styles.container}>

        {/* ==================================================
            CINEMA AREA
        ================================================== */}

        <section style={styles.cinemaCard}>

          {/* SCREEN */}

          <div style={styles.screenArea}>

            <div style={styles.screenGlow}></div>

            <div style={styles.screen}>
              <span>
                SCREEN
              </span>
            </div>

            <p style={styles.screenText}>
              All eyes this way
            </p>

          </div>

          {/* ==================================================
              LEGEND
          ================================================== */}

          <div style={styles.legend}>

            <div style={styles.legendItem}>
              <span
                style={{
                  ...styles.legendSeat,
                  background:
                    "#27272a",
                }}
              ></span>

              Available
            </div>

            <div style={styles.legendItem}>
              <span
                style={{
                  ...styles.legendSeat,
                  background:
                    "#dc2626",
                }}
              ></span>

              Selected
            </div>

            <div style={styles.legendItem}>
              <span
                style={{
                  ...styles.legendSeat,
                  background:
                    "#52525b",
                }}
              ></span>

              Booked
            </div>

          </div>

          {/* ==================================================
              SEAT MAP
          ================================================== */}

          <div style={styles.seatMap}>

            {/* ROW LABEL */}

            {[
              "A",
              "B",
              "C",
              "D",
              "E",
            ].map(
              (row, rowIndex) => {

                const rowSeats =
                  seats.slice(
                    rowIndex * 10,
                    rowIndex * 10 + 10
                  );

                return (
                  <div
                    key={row}
                    style={styles.seatRow}
                  >

                    <span
                      style={
                        styles.rowLabel
                      }
                    >
                      {row}
                    </span>

                    {rowSeats.map(
                      (seat, index) => {

                        const isBooked =
                          show.bookedSeats?.includes(
                            String(seat)
                          );

                        const isSelected =
                          selectedSeats.includes(
                            seat
                          );

                        const seatStyle = {
                          ...styles.seat,

                          background:
                            isBooked
                              ? "#3f3f46"
                              : isSelected
                              ? "#dc2626"
                              : "#27272a",

                          color:
                            isBooked
                              ? "#777"
                              : isSelected
                              ? "#fff"
                              : "#ddd",

                          border:
                            isSelected
                              ? "1px solid #ef4444"
                              : "1px solid rgba(255,255,255,0.08)",

                          cursor:
                            isBooked
                              ? "not-allowed"
                              : "pointer",

                          boxShadow:
                            isSelected
                              ? "0 0 18px rgba(220,38,38,0.35)"
                              : "none",

                          opacity:
                            isBooked
                              ? 0.55
                              : 1,
                        };

                        return (
                          <div
                            key={seat}
                            style={
                              styles.seatWrapper
                            }
                          >

                            {index === 5 && (
                              <div
                                style={
                                  styles.aisle
                                }
                              />
                            )}

                            <button
                              onClick={() =>
                                toggleSeat(
                                  seat
                                )
                              }
                              disabled={
                                isBooked
                              }
                              style={
                                seatStyle
                              }
                              title={
                                isBooked
                                  ? "Seat already booked"
                                  : `Seat ${row}${index + 1}`
                              }
                            >
                              {index + 1}
                            </button>

                          </div>
                        );
                      }
                    )}

                  </div>
                );
              }
            )}

          </div>

          {/* SEAT NOTE */}

          <p style={styles.seatNote}>
            💡 Click on an available seat
            to select it.
          </p>

        </section>

        {/* ==================================================
            BOOKING SUMMARY
        ================================================== */}

        <aside style={styles.summaryCard}>

          <div style={styles.summaryHeader}>

            <div>

              <span style={styles.summaryLabel}>
                YOUR SELECTION
              </span>

              <h2>
                Booking Summary
              </h2>

            </div>

            <div style={styles.ticketIcon}>
              🎟️
            </div>

          </div>

          {/* MOVIE */}

          <div style={styles.summaryMovie}>

            <div style={styles.summaryPoster}>
              🎬
            </div>

            <div>

              <strong>
                {show.movie?.title ||
                  "Movie"}
              </strong>

              <span>
                {show.showTime ||
                  "Show time"}
              </span>

            </div>

          </div>

          {/* DETAILS */}

          <div style={styles.summaryDetails}>

            <div style={styles.summaryRow}>
              <span>
                🎫 Ticket Price
              </span>

              <strong>
                ₹{show.ticketPrice}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>
                💺 Selected
              </span>

              <strong>
                {selectedSeats.length}
              </strong>
            </div>

          </div>

          {/* SELECTED SEATS */}

          <div style={styles.selectedSection}>

            <span style={styles.summaryLabel}>
              SELECTED SEATS
            </span>

            {selectedSeats.length ===
            0 ? (
              <div
                style={
                  styles.emptySeats
                }
              >
                No seats selected
              </div>
            ) : (
              <div
                style={
                  styles.selectedSeats
                }
              >
                {selectedSeats
                  .sort(
                    (a, b) =>
                      a - b
                  )
                  .map((seat) => (
                    <span
                      key={seat}
                      style={
                        styles.selectedSeat
                      }
                    >
                      {seat}
                    </span>
                  ))}
              </div>
            )}

          </div>

          {/* TOTAL */}

          <div style={styles.divider}></div>

          <div style={styles.totalRow}>

            <div>
              <span style={styles.totalLabel}>
                TOTAL AMOUNT
              </span>

              <strong style={styles.total}>
                ₹{totalAmount}
              </strong>
            </div>

            <span style={styles.currency}>
              INR
            </span>

          </div>

          {/* CONTINUE */}

          <button
            onClick={
              continueToPayment
            }
            disabled={
              selectedSeats.length ===
              0
            }
            style={{
              ...styles.paymentButton,

              ...(selectedSeats.length ===
              0
                ? styles.disabledButton
                : {}),
            }}
          >
            {selectedSeats.length ===
            0
              ? "Select Seats"
              : "Continue to Payment →"}
          </button>

          <p style={styles.secureText}>
            🔒 Secure booking • Instant
            confirmation
          </p>

        </aside>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer style={styles.footer}>
        🍿 Sit back. Relax. Enjoy the
        show.
      </footer>

    </div>
  );
}

/* ========================================================
   STYLES
======================================================== */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 15% 10%, rgba(220,38,38,0.10), transparent 25%), radial-gradient(circle at 90% 50%, rgba(220,38,38,0.07), transparent 25%), #070707",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },

  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "rgba(220,38,38,0.06)",
    filter: "blur(110px)",
    right: "-200px",
    top: "400px",
    pointerEvents: "none",
  },

  /* ======================================================
     NAVBAR
  ====================================================== */

  navbar: {
    height: "70px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(255,255,255,0.07)",
    background:
      "rgba(7,7,7,0.88)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 5,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "22px",
    fontWeight: "900",
    cursor: "pointer",
  },

  logoRed: {
    color: "#ef4444",
  },

  navButton: {
    background: "transparent",
    color: "#aaa",
    border:
      "1px solid rgba(255,255,255,0.12)",
    padding: "9px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  /* ======================================================
     HEADER
  ====================================================== */

  header: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "45px 25px 25px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "25px",
    position: "relative",
    zIndex: 2,
  },

  eyebrow: {
    color: "#ef4444",
    fontSize: "9px",
    letterSpacing: "2px",
    fontWeight: "900",
  },

  title: {
    margin: "7px 0 5px",
    fontSize: "38px",
    fontWeight: "900",
    letterSpacing: "-1px",
  },

  subtitle: {
    margin: 0,
    color: "#777",
    fontSize: "13px",
  },

  /* ======================================================
     SHOW INFO
  ====================================================== */

  showInfo: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    background:
      "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "12px 16px",
    minWidth: "260px",
  },

  movieIcon: {
    width: "45px",
    height: "55px",
    borderRadius: "7px",
    background:
      "linear-gradient(135deg,#ef4444,#7f1d1d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  movieLabel: {
    color: "#ef4444",
    fontSize: "8px",
    letterSpacing: "1.5px",
    fontWeight: "900",
  },

  movieTitle: {
    margin: "4px 0",
    fontSize: "16px",
  },

  movieMeta: {
    margin: 0,
    color: "#777",
    fontSize: "10px",
  },

  /* ======================================================
     MAIN
  ====================================================== */

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "0 25px 50px",
    display: "grid",
    gridTemplateColumns:
      "1fr 330px",
    gap: "22px",
    position: "relative",
    zIndex: 2,
  },

  /* ======================================================
     CINEMA
  ====================================================== */

  cinemaCard: {
    background:
      "rgba(15,15,17,0.94)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "30px 25px",
  },

  screenArea: {
    textAlign: "center",
    marginBottom: "30px",
  },

  screenGlow: {
    width: "60%",
    height: "35px",
    margin: "0 auto -18px",
    background:
      "rgba(239,68,68,0.25)",
    filter: "blur(25px)",
  },

  screen: {
    width: "65%",
    height: "45px",
    margin: "0 auto",
    background:
      "linear-gradient(to bottom,#e5e7eb,#9ca3af)",
    clipPath:
      "polygon(5% 0,95% 0,100% 100%,0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#222",
    fontSize: "9px",
    letterSpacing: "4px",
    fontWeight: "900",
    boxShadow:
      "0 10px 30px rgba(255,255,255,0.08)",
  },

  screenText: {
    color: "#444",
    fontSize: "9px",
    marginTop: "9px",
  },

  /* ======================================================
     LEGEND
  ====================================================== */

  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "28px",
    color: "#777",
    fontSize: "10px",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  legendSeat: {
    width: "12px",
    height: "12px",
    borderRadius: "3px",
    display: "inline-block",
  },

  /* ======================================================
     SEATS
  ====================================================== */

  seatMap: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    overflowX: "auto",
    paddingBottom: "10px",
  },

  seatRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  rowLabel: {
    width: "18px",
    color: "#555",
    fontSize: "10px",
    fontWeight: "800",
    textAlign: "center",
  },

  seatWrapper: {
    display: "flex",
    alignItems: "center",
  },

  seat: {
    width: "38px",
    height: "34px",
    borderRadius: "7px 7px 4px 4px",
    fontSize: "10px",
    fontWeight: "800",
    transition:
      "transform 0.15s ease",
  },

  aisle: {
    width: "12px",
  },

  seatNote: {
    textAlign: "center",
    color: "#444",
    fontSize: "9px",
    marginTop: "25px",
  },

  /* ======================================================
     SUMMARY
  ====================================================== */

  summaryCard: {
    background:
      "linear-gradient(160deg,#171719,#0c0c0d)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "23px",
    height: "fit-content",
    position: "sticky",
    top: "20px",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.4)",
  },

  summaryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  summaryLabel: {
    display: "block",
    color: "#555",
    fontSize: "8px",
    letterSpacing: "1.5px",
    fontWeight: "800",
    marginBottom: "5px",
  },

  ticketIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "9px",
    background:
      "rgba(220,38,38,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryMovie: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "18px",
    borderBottom:
      "1px solid rgba(255,255,255,0.07)",
  },

  summaryPoster: {
    width: "45px",
    height: "55px",
    borderRadius: "6px",
    background:
      "linear-gradient(135deg,#ef4444,#7f1d1d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryMovieText: {
    display: "flex",
    flexDirection: "column",
  },

  summaryDetails: {
    padding: "18px 0",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#777",
    fontSize: "11px",
    marginBottom: "12px",
  },

  selectedSection: {
    marginTop: "5px",
  },

  emptySeats: {
    background:
      "rgba(255,255,255,0.03)",
    border:
      "1px dashed rgba(255,255,255,0.1)",
    color: "#555",
    padding: "13px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "10px",
  },

  selectedSeats: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  selectedSeat: {
    padding: "6px 9px",
    borderRadius: "5px",
    background:
      "rgba(220,38,38,0.12)",
    border:
      "1px solid rgba(220,38,38,0.3)",
    color: "#f87171",
    fontSize: "10px",
    fontWeight: "800",
  },

  divider: {
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    margin: "18px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  totalLabel: {
    display: "block",
    color: "#555",
    fontSize: "8px",
    letterSpacing: "1.3px",
    marginBottom: "4px",
  },

  total: {
    fontSize: "28px",
    fontWeight: "900",
  },

  currency: {
    background: "#222",
    color: "#777",
    padding: "5px 7px",
    borderRadius: "4px",
    fontSize: "8px",
    fontWeight: "800",
  },

  paymentButton: {
    width: "100%",
    minHeight: "50px",
    background:
      "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "800",
    boxShadow:
      "0 12px 30px rgba(220,38,38,0.2)",
  },

  disabledButton: {
    background: "#333",
    color: "#666",
    cursor: "not-allowed",
    boxShadow: "none",
  },

  secureText: {
    textAlign: "center",
    color: "#444",
    fontSize: "9px",
    marginTop: "12px",
  },

  /* ======================================================
     FOOTER
  ====================================================== */

  footer: {
    textAlign: "center",
    color: "#333",
    fontSize: "10px",
    padding: "20px",
  },

  /* ======================================================
     LOADING
  ====================================================== */

  loadingPage: {
    minHeight: "100vh",
    background: "#070707",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
  },

  loadingIcon: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  errorIcon: {
    fontSize: "50px",
    marginBottom: "15px",
  },

  backButton: {
    marginTop: "15px",
    padding: "12px 20px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default SeatSelection;