import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function TheatreSelection() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH THEATRES
  // =========================================================

  useEffect(() => {
    if (!movieId) {
      return;
    }

    let cancelled = false;

    const fetchTheatres = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(
          `/theatres/movie/${movieId}`
        );

        if (cancelled) {
          return;
        }

        console.log(
          "Theatre Response:",
          res.data
        );

        const data =
          res.data?.data ||
          res.data?.theatres ||
          [];

        setTheatres(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Theatre Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load theatres"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTheatres();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  // =========================================================
  // MISSING MOVIE ID
  // =========================================================

  if (!movieId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a, #1e1b4b)",
          padding: "20px",
          boxSizing: "border-box",
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
            🎬
          </div>

          <h2
            style={{
              margin: "0 0 12px",
              color: "#111827",
              fontSize: "28px",
            }}
          >
            Movie Not Found
          </h2>

          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              marginBottom: "28px",
            }}
          >
            We couldn't find the selected movie.
            Please choose a movie again.
          </p>

          <button
            onClick={() =>
              navigate("/movies")
            }
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f172a, #1e1b4b)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            🎭
          </div>

          <h2
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            Finding Theatres...
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: "10px",
            }}
          >
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a, #1e1b4b)",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            width: "100%",
            maxWidth: "500px",
            padding: "40px",
            borderRadius: "22px",
            textAlign: "center",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Unable to Load Theatres
          </h2>

          <p
            style={{
              color: "#ef4444",
              background: "#fef2f2",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {error}
          </p>

          <button
            onClick={() =>
              navigate(-1)
            }
            style={{
              marginTop: "15px",
              padding: "13px 25px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 300px, #f8fafc 300px)",
        paddingBottom: "60px",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "45px 20px 35px",
          color: "#ffffff",
        }}
      >
        <button
          onClick={() =>
            navigate(-1)
          }
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            padding: "9px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "25px",
            fontSize: "14px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
            }}
          >
            🎬
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize:
                  "clamp(30px, 5vw, 44px)",
                fontWeight: "800",
              }}
            >
              Select Your Theatre
            </h1>

            <p
              style={{
                margin:
                  "8px 0 0",
                color: "#cbd5e1",
                fontSize: "16px",
              }}
            >
              Choose a theatre near you
              and find the perfect show.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          THEATRE CONTENT
      ===================================================== */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {theatres.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "55px 25px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "15px",
              }}
            >
              🍿
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                color: "#111827",
              }}
            >
              No Theatres Available
            </h2>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "25px",
              }}
            >
              There are currently no theatres
              showing this movie.
            </p>

            <button
              onClick={() =>
                navigate("/movies")
              }
              style={{
                padding: "13px 25px",
                border: "none",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <>
            {/* NUMBER OF THEATRES */}

            <div
              style={{
                marginBottom: "22px",
                color: "#475569",
                fontWeight: "600",
              }}
            >
              {theatres.length}{" "}
              {theatres.length === 1
                ? "theatre"
                : "theatres"}{" "}
              available
            </div>

            {/* =================================================
                THEATRE GRID
            ================================================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {theatres.map(
                (theatre) => (
                  <div
                    key={theatre._id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow:
                        "0 8px 25px rgba(15,23,42,0.08)",
                      border:
                        "1px solid #e5e7eb",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 40px rgba(15,23,42,0.14)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(15,23,42,0.08)";
                    }}
                  >
                    {/* CARD TOP */}

                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        padding: "25px",
                        color: "#ffffff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "38px",
                          }}
                        >
                          🎥
                        </div>

                        <span
                          style={{
                            background:
                              "rgba(255,255,255,0.18)",
                            padding:
                              "6px 10px",
                            borderRadius:
                              "20px",
                            fontSize: "12px",
                            fontWeight:
                              "700",
                          }}
                        >
                          CINEMA
                        </span>
                      </div>

                      <h2
                        style={{
                          margin:
                            "20px 0 0",
                          fontSize: "22px",
                          fontWeight:
                            "800",
                        }}
                      >
                        {theatre.name}
                      </h2>
                    </div>

                    {/* CARD BODY */}

                    <div
                      style={{
                        padding: "25px",
                      }}
                    >
                      {/* CITY */}

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom:
                            "18px",
                        }}
                      >
                        <span
                          style={{
                            fontSize:
                              "22px",
                          }}
                        >
                          📍
                        </span>

                        <div>
                          <div
                            style={{
                              fontSize:
                                "12px",
                              color:
                                "#94a3b8",
                              fontWeight:
                                "700",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Location
                          </div>

                          <div
                            style={{
                              color:
                                "#1e293b",
                              fontWeight:
                                "600",
                              marginTop:
                                "3px",
                            }}
                          >
                            {theatre.city ||
                              "City not available"}
                          </div>
                        </div>
                      </div>

                      {/* ADDRESS */}

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom:
                            "18px",
                        }}
                      >
                        <span
                          style={{
                            fontSize:
                              "22px",
                          }}
                        >
                          🏢
                        </span>

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              fontSize:
                                "12px",
                              color:
                                "#94a3b8",
                              fontWeight:
                                "700",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Address
                          </div>

                          <div
                            style={{
                              color:
                                "#475569",
                              lineHeight:
                                "1.5",
                              marginTop:
                                "3px",
                            }}
                          >
                            {theatre.address ||
                              "Address not available"}
                          </div>
                        </div>
                      </div>

                      {/* SEATS */}

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                          background:
                            "#f8fafc",
                          padding: "13px",
                          borderRadius:
                            "12px",
                          marginBottom:
                            "20px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "#64748b",
                            fontSize:
                              "14px",
                          }}
                        >
                          💺 Total Seats
                        </span>

                        <strong
                          style={{
                            color:
                              "#111827",
                          }}
                        >
                          {theatre.totalSeats ||
                            "N/A"}
                        </strong>
                      </div>

                      {/* BUTTON */}

                      <button
                        onClick={() =>
                          navigate(
                            `/movie/${movieId}/theatres/${theatre._id}/shows`
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: "none",
                          borderRadius:
                            "12px",
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight:
                            "700",
                          cursor: "pointer",
                          boxShadow:
                            "0 6px 15px rgba(79,70,229,0.25)",
                        }}
                      >
                        View Shows →
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TheatreSelection;