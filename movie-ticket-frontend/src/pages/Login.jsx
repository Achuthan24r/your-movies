import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        if (res.data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );
        }

        alert("Login Successful!");

        navigate("/");
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Background Glow */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🎬</span>

          <span>
            Movie<span style={styles.logoRed}>Book</span>
          </span>
        </Link>

        <Link to="/" style={styles.homeLink}>
          ← Back to Home
        </Link>
      </nav>

      {/* Login Area */}
      <main style={styles.container}>

        <div style={styles.loginCard}>

          {/* Logo */}
          <div style={styles.loginIcon}>
            🎬
          </div>

          <h1 style={styles.title}>
            Welcome Back
          </h1>

          <p style={styles.subtitle}>
            Sign in to continue your movie experience
          </p>

          {/* Form */}
          <form onSubmit={onSubmit}>

            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email Address
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
                  onChange={onChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Password
              </label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                  required
                  style={styles.input}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={styles.eyeButton}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.loginButton,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}>⏳</span>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span style={styles.arrow}>→</span>
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div style={styles.dividerContainer}>
            <div style={styles.line}></div>
            <span style={styles.orText}>OR</span>
            <div style={styles.line}></div>
          </div>

          {/* Register */}
          <p style={styles.registerText}>
            Don't have an account?
          </p>

          <Link
            to="/register"
            style={styles.registerButton}
          >
            Create New Account
          </Link>

        </div>

        {/* Bottom Text */}
        <p style={styles.bottomText}>
          🎟️ Your next movie adventure is waiting for you
        </p>

      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.15), transparent 30%), radial-gradient(circle at 80% 80%, rgba(239,68,68,0.08), transparent 30%), #050505",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(220,38,38,0.15)",
    filter: "blur(100px)",
    top: "100px",
    left: "-150px",
    pointerEvents: "none",
  },

  glow2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(239,68,68,0.1)",
    filter: "blur(100px)",
    bottom: "-150px",
    right: "-100px",
    pointerEvents: "none",
  },

  navbar: {
    height: "75px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    background: "rgba(5,5,5,0.75)",
    backdropFilter: "blur(15px)",
    position: "relative",
    zIndex: 5,
    boxSizing: "border-box",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
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

  homeLink: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },

  container: {
    minHeight: "calc(100vh - 75px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
  },

  loginCard: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    boxSizing: "border-box",
    background: "rgba(18,18,20,0.88)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.6)",
    backdropFilter: "blur(20px)",
  },

  loginIcon: {
    width: "65px",
    height: "65px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, #dc2626, #991b1b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    margin: "0 auto 20px",
    boxShadow:
      "0 10px 30px rgba(220,38,38,0.3)",
  },

  title: {
    textAlign: "center",
    margin: "0",
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  subtitle: {
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
    margin:
      "10px 0 32px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    color: "#ddd",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#0d0d0f",
    border:
      "1px solid #292929",
    borderRadius: "10px",
    padding: "0 13px",
    transition: "0.2s",
  },

  inputIcon: {
    fontSize: "15px",
    marginRight: "10px",
    opacity: 0.7,
  },

  input: {
    width: "100%",
    height: "48px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  eyeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "15px",
    padding: "5px",
    opacity: 0.7,
  },

  loginButton: {
    width: "100%",
    height: "50px",
    marginTop: "8px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #ef4444, #b91c1c)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    boxShadow:
      "0 10px 30px rgba(220,38,38,0.25)",
  },

  arrow: {
    fontSize: "20px",
  },

  spinner: {
    fontSize: "14px",
  },

  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "28px 0",
  },

  line: {
    flex: 1,
    height: "1px",
    background: "#292929",
  },

  orText: {
    color: "#666",
    fontSize: "11px",
    fontWeight: "700",
  },

  registerText: {
    textAlign: "center",
    color: "#888",
    fontSize: "13px",
    margin: "0 0 12px",
  },

  registerButton: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "#f87171",
    border:
      "1px solid rgba(239,68,68,0.3)",
    background:
      "rgba(239,68,68,0.05)",
    padding: "13px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "700",
  },

  bottomText: {
    color: "#555",
    fontSize: "12px",
    marginTop: "25px",
    textAlign: "center",
  },
};

export default Login;