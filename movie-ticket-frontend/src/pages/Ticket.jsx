import { useLocation, useNavigate } from "react-router-dom";

function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // NO TICKET DATA
  // =========================================================

  if (!state) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
          background:
            "linear-gradient(135deg, #0f172a, #1e1b4b)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "45px 30px",
            textAlign: "center",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "15px",
            }}
          >
            🎟️
          </div>

          <h2
            style={{
              margin: "0 0 12px",
              color: "#111827",
            }}
          >
            No Ticket Details Found
          </h2>

          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}
          >
            Your ticket information is not
            available. Please browse the movies
            and make a booking.
          </p>

          <button
            onClick={() => navigate("/movies")}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            🎬 Browse Movies
          </button>
        </div>
      </div>
    );
  }

  const { booking, show, seats, total } = state;

  // =========================================================
  // SAFE VALUES
  // =========================================================

  const movieTitle =
    show?.movie?.title || "Movie";

  const showDate = show?.showDate
    ? new Date(
        show.showDate
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const showTime =
    show?.showTime || "N/A";

  const selectedSeats =
    Array.isArray(seats) ? seats : [];

  const totalSeats =
    selectedSeats.length;

  const totalAmount =
    total ?? booking?.totalAmount ?? 0;

  const bookingId =
    booking?._id || "N/A";

  // =========================================================
  // MAIN TICKET
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
        padding: "40px 20px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          SUCCESS HEADER
      ===================================================== */}

      <div
        style={{
          textAlign: "center",
          color: "#ffffff",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 18px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "42px",
            boxShadow:
              "0 10px 30px rgba(34,197,94,0.35)",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            margin: 0,
            fontSize:
              "clamp(28px, 5vw, 40px)",
            fontWeight: "800",
          }}
        >
          Booking Confirmed!
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Your movie tickets are ready 🎬
        </p>
      </div>

      {/* =====================================================
          TICKET
      ===================================================== */}

      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.3)",
        }}
      >
        {/* ===================================================
            MOVIE HEADER
        =================================================== */}

        <div
          style={{
            padding: "28px",
            background:
              "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background:
                  "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              🎬
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 5px",
                  fontSize: "12px",
                  opacity: 0.8,
                  textTransform:
                    "uppercase",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                Movie Ticket
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                {movieTitle}
              </h2>
            </div>
          </div>
        </div>

        {/* ===================================================
            TICKET DETAILS
        =================================================== */}

        <div
          style={{
            padding: "30px",
          }}
        >
          {/* BOOKING ID */}

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "15px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                textTransform:
                  "uppercase",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "5px",
              }}
            >
              Booking ID
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#334155",
                fontWeight: "700",
                wordBreak: "break-all",
              }}
            >
              {bookingId}
            </div>
          </div>

          {/* =================================================
              DATE + TIME
          ================================================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {/* DATE */}

            <div
              style={{
                padding: "20px",
                borderRadius: "15px",
                background: "#f5f3ff",
                border:
                  "1px solid #ddd6fe",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#7c3aed",
                  fontWeight: "700",
                  textTransform:
                    "uppercase",
                  marginBottom: "8px",
                }}
              >
                📅 Date
              </div>

              <strong
                style={{
                  color: "#1e1b4b",
                  fontSize: "17px",
                }}
              >
                {showDate}
              </strong>
            </div>

            {/* TIME */}

            <div
              style={{
                padding: "20px",
                borderRadius: "15px",
                background: "#eff6ff",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#2563eb",
                  fontWeight: "700",
                  textTransform:
                    "uppercase",
                  marginBottom: "8px",
                }}
              >
                🕐 Show Time
              </div>

              <strong
                style={{
                  color: "#172554",
                  fontSize: "17px",
                }}
              >
                {showTime}
              </strong>
            </div>
          </div>

          {/* =================================================
              SEATS
          ================================================= */}

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "15px",
              background: "#f8fafc",
              border:
                "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  color: "#475569",
                }}
              >
                💺 Selected Seats
              </span>

              <span
                style={{
                  background: "#ede9fe",
                  color: "#6d28d9",
                  padding:
                    "5px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {totalSeats}{" "}
                {totalSeats === 1
                  ? "Seat"
                  : "Seats"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {selectedSeats.length >
              0 ? (
                selectedSeats.map(
                  (seat) => (
                    <span
                      key={seat}
                      style={{
                        minWidth: "42px",
                        padding:
                          "9px 12px",
                        background:
                          "#4f46e5",
                        color: "#ffffff",
                        borderRadius:
                          "8px",
                        textAlign:
                          "center",
                        fontWeight:
                          "700",
                        fontSize: "14px",
                      }}
                    >
                      {seat}
                    </span>
                  )
                )
              ) : (
                <span
                  style={{
                    color: "#64748b",
                  }}
                >
                  No seats selected
                </span>
              )}
            </div>
          </div>

          {/* =================================================
              TOTAL
          ================================================= */}

          <div
            style={{
              marginTop: "25px",
              padding: "22px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
              border:
                "1px solid #bbf7d0",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#166534",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Total Amount
              </div>

              <div
                style={{
                  color: "#14532d",
                  fontSize: "13px",
                  marginTop: "3px",
                }}
              >
                Payment successful
              </div>
            </div>

            <strong
              style={{
                color: "#15803d",
                fontSize: "28px",
              }}
            >
              ₹{totalAmount}
            </strong>
          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              borderRadius: "14px",
              background: "#f0fdf4",
              border:
                "1px solid #bbf7d0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                marginBottom: "5px",
              }}
            >
              ✅
            </div>

            <strong
              style={{
                color: "#166534",
              }}
            >
              Payment Successful
            </strong>

            <p
              style={{
                margin:
                  "7px 0 0",
                color: "#4d7c5b",
                fontSize: "14px",
              }}
            >
              Your movie tickets have been
              booked successfully.
            </p>
          </div>
        </div>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div
          style={{
            padding: "0 30px 30px",
          }}
        >
          <button
            onClick={() =>
              navigate("/my-bookings")
            }
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow:
                "0 7px 18px rgba(79,70,229,0.25)",
            }}
          >
            🎟️ View My Bookings
          </button>

          <button
            onClick={() =>
              navigate("/movies")
            }
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              background: "#f1f5f9",
              color: "#334155",
              border:
                "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            🎬 Browse More Movies
          </button>
        </div>
      </div>

      {/* FOOTER */}

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
          marginTop: "25px",
        }}
      >
        Enjoy your movie! 🍿
      </p>
    </div>
  );
}

export default Ticket;