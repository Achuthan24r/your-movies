import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const { name, email, password } = formData;

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ======================================================
  // REGISTER
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log("Register Response:", res.data);

      alert("Registration Successful! 🎉");

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background glow */}

      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div style={styles.topBar}>
        <div
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          🎬{" "}
          <span>
            Movie<span style={styles.logoRed}>Book</span>
          </span>
        </div>

        <div style={styles.topText}>
          Already a member?
          {" "}
          <Link
            to="/login"
            style={styles.loginLink}
          >
            Login
          </Link>
        </div>
      </div>

      {/* ==================================================
          REGISTER CARD
      ================================================== */}

      <main style={styles.main}>
        <div style={styles.card}>

          {/* Icon */}

          <div style={styles.iconCircle}>
            🎟️
          </div>

          <div style={styles.heading}>
            <span style={styles.eyebrow}>
              JOIN MOVIEBOOK
            </span>

            <h1 style={styles.title}>
              Create your account
            </h1>

            <p style={styles.subtitle}>
              Your next great movie experience
              starts here.
            </p>
          </div>

          {/* Error */}

          {error && (
            <div style={styles.errorBox}>
              <span>⚠️</span>

              <span>{error}</span>
            </div>
          )}

          {/* ==================================================
              FORM
          ================================================== */}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                FULL NAME
              </label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  👤
                </span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* EMAIL */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                EMAIL ADDRESS
              </label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  ✉️
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                PASSWORD
              </label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  style={styles.eyeButton}
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>
            </div>

            {/* PASSWORD INFO */}

            <div style={styles.passwordInfo}>
              <span>
                🔐
              </span>

              <span>
                Use at least 6 characters for
                your password.
              </span>
            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.registerButton,
                ...(loading
                  ? styles.disabledButton
                  : {}),
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span style={styles.arrow}>
                    →
                  </span>
                </>
              )}
            </button>

          </form>

          {/* ==================================================
              LOGIN
          ================================================== */}

          <div style={styles.loginBox}>
            <span>
              Already have an account?
            </span>

            <Link
              to="/login"
              style={styles.loginLink}
            >
              Login here
            </Link>
          </div>

          {/* Terms */}

          <p style={styles.terms}>
            By creating an account, you agree
            to our Terms of Service and Privacy
            Policy.
          </p>

        </div>
      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer style={styles.footer}>
        🍿 Your seat is waiting. Enjoy the show.
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
      "radial-gradient(circle at 15% 20%, rgba(220,38,38,0.12), transparent 25%), radial-gradient(circle at 85% 80%, rgba(220,38,38,0.08), transparent 25%), #070707",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glowOne: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(220,38,38,0.08)",
    filter: "blur(100px)",
    left: "-180px",
    top: "150px",
    pointerEvents: "none",
  },

  glowTwo: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(220,38,38,0.06)",
    filter: "blur(100px)",
    right: "-180px",
    bottom: "50px",
    pointerEvents: "none",
  },

  /* ======================================================
     TOP BAR
  ====================================================== */

  topBar: {
    height: "70px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(255,255,255,0.07)",
    background:
      "rgba(7,7,7,0.85)",
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

  topText: {
    color: "#666",
    fontSize: "12px",
  },

  loginLink: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: "800",
  },

  /* ======================================================
     MAIN
  ====================================================== */

  main: {
    minHeight: "calc(100vh - 125px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    position: "relative",
    zIndex: 2,
  },

  /* ======================================================
     CARD
  ====================================================== */

  card: {
    width: "100%",
    maxWidth: "450px",
    background:
      "linear-gradient(145deg, rgba(24,24,26,0.97), rgba(11,11,13,0.97))",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: "20px",
    padding: "38px",
    boxShadow:
      "0 30px 90px rgba(0,0,0,0.55)",
    boxSizing: "border-box",
  },

  iconCircle: {
    width: "58px",
    height: "58px",
    borderRadius: "15px",
    background:
      "linear-gradient(135deg,#ef4444,#991b1b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "27px",
    marginBottom: "20px",
    boxShadow:
      "0 12px 30px rgba(220,38,38,0.2)",
  },

  heading: {
    marginBottom: "25px",
  },

  eyebrow: {
    color: "#ef4444",
    fontSize: "9px",
    letterSpacing: "2px",
    fontWeight: "900",
  },

  title: {
    fontSize: "29px",
    margin: "7px 0",
    fontWeight: "900",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    color: "#777",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: 0,
  },

  /* ======================================================
     ERROR
  ====================================================== */

  errorBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    background:
      "rgba(239,68,68,0.08)",
    border:
      "1px solid rgba(239,68,68,0.25)",
    color: "#f87171",
    borderRadius: "9px",
    padding: "12px",
    marginBottom: "20px",
    fontSize: "12px",
  },

  /* ======================================================
     INPUTS
  ====================================================== */

  inputGroup: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    color: "#777",
    fontSize: "9px",
    letterSpacing: "1.3px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background:
      "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: "9px",
    padding: "0 12px",
    transition: "0.2s",
  },

  inputIcon: {
    fontSize: "16px",
    marginRight: "10px",
    opacity: 0.7,
  },

  input: {
    width: "100%",
    height: "48px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "13px",
    boxSizing: "border-box",
  },

  eyeButton: {
    border: "none",
    background: "transparent",
    color: "#777",
    cursor: "pointer",
    fontSize: "15px",
    padding: "5px",
  },

  passwordInfo: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    color: "#555",
    fontSize: "10px",
    marginBottom: "20px",
  },

  /* ======================================================
     REGISTER BUTTON
  ====================================================== */

  registerButton: {
    width: "100%",
    minHeight: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
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

  arrow: {
    fontSize: "18px",
  },

  spinner: {
    display: "inline-block",
    width: "13px",
    height: "13px",
    border:
      "2px solid rgba(255,255,255,0.35)",
    borderTop:
      "2px solid #fff",
    borderRadius: "50%",
  },

  /* ======================================================
     LOGIN
  ====================================================== */

  loginBox: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginTop: "22px",
    color: "#555",
    fontSize: "11px",
  },

  terms: {
    textAlign: "center",
    color: "#444",
    fontSize: "9px",
    lineHeight: "1.5",
    marginTop: "20px",
  },

  footer: {
    textAlign: "center",
    color: "#333",
    fontSize: "10px",
    padding: "20px",
    position: "relative",
    zIndex: 2,
  },
};

export default Register;