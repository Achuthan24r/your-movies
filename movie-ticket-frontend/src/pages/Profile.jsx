import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ======================================================
  // NOT LOGGED IN
  // ======================================================

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.glow}></div>

        <div style={styles.loginCard}>
          <div style={styles.loginIcon}>🔐</div>

          <h1 style={styles.loginTitle}>
            Login Required
          </h1>

          <p style={styles.loginText}>
            Please login to access your profile,
            bookings and account information.
          </p>

          <button
            onClick={() => navigate("/login")}
            style={styles.primaryButton}
          >
            Login to Continue →
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // PROFILE
  // ======================================================

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      {/* ==================================================
          TOP BAR
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

        <button
          onClick={() => navigate("/movies")}
          style={styles.moviesButton}
        >
          🎬 Browse Movies
        </button>

      </div>

      {/* ==================================================
          PROFILE HEADER
      ================================================== */}

      <div style={styles.header}>

        <span style={styles.eyebrow}>
          ACCOUNT
        </span>

        <h1 style={styles.title}>
          My Profile
        </h1>

        <p style={styles.subtitle}>
          Manage your account and movie bookings.
        </p>

      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main style={styles.container}>

        {/* PROFILE CARD */}

        <section style={styles.profileCard}>

          {/* Avatar */}

          <div style={styles.avatar}>
            {user.name
              ? user.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div style={styles.profileName}>
            <h2>
              {user.name || "Movie Lover"}
            </h2>

            <span style={styles.roleBadge}>
              {user.role || "user"}
            </span>
          </div>

          <p style={styles.memberText}>
            🎟️ MovieBook Member
          </p>

        </section>

        {/* ACCOUNT INFORMATION */}

        <section style={styles.infoCard}>

          <div style={styles.cardTitle}>
            <span>👤</span>

            <h2>
              Account Information
            </h2>
          </div>

          {/* NAME */}

          <div style={styles.infoRow}>

            <div style={styles.infoIcon}>
              👤
            </div>

            <div style={styles.infoContent}>
              <span style={styles.label}>
                FULL NAME
              </span>

              <strong>
                {user.name || "Not provided"}
              </strong>
            </div>

          </div>

          {/* EMAIL */}

          <div style={styles.infoRow}>

            <div style={styles.infoIcon}>
              ✉️
            </div>

            <div style={styles.infoContent}>
              <span style={styles.label}>
                EMAIL ADDRESS
              </span>

              <strong>
                {user.email || "Not provided"}
              </strong>
            </div>

          </div>

          {/* PHONE */}

          <div style={styles.infoRow}>

            <div style={styles.infoIcon}>
              📱
            </div>

            <div style={styles.infoContent}>
              <span style={styles.label}>
                PHONE NUMBER
              </span>

              <strong>
                {user.phone || "Not provided"}
              </strong>
            </div>

          </div>

          {/* ROLE */}

          <div style={styles.infoRow}>

            <div style={styles.infoIcon}>
              🛡️
            </div>

            <div style={styles.infoContent}>
              <span style={styles.label}>
                ACCOUNT TYPE
              </span>

              <strong
                style={{
                  textTransform: "capitalize",
                }}
              >
                {user.role || "user"}
              </strong>
            </div>

          </div>

        </section>

        {/* ACTIONS */}

        <section style={styles.actionsCard}>

          <div style={styles.cardTitle}>
            <span>⚡</span>

            <h2>
              Quick Actions
            </h2>
          </div>

          <div style={styles.actions}>

            {/* BOOKINGS */}

            <button
              onClick={() =>
                navigate("/my-bookings")
              }
              style={styles.actionButton}
            >
              <span style={styles.actionIcon}>
                🎟️
              </span>

              <span style={styles.actionText}>
                <strong>
                  My Bookings
                </strong>

                <small>
                  View your movie tickets
                </small>
              </span>

              <span style={styles.arrow}>
                →
              </span>
            </button>

            {/* MOVIES */}

            <button
              onClick={() =>
                navigate("/movies")
              }
              style={styles.actionButton}
            >
              <span style={styles.actionIcon}>
                🎬
              </span>

              <span style={styles.actionText}>
                <strong>
                  Browse Movies
                </strong>

                <small>
                  Find your next movie
                </small>
              </span>

              <span style={styles.arrow}>
                →
              </span>
            </button>

          </div>

        </section>

        {/* LOGOUT */}

        <button
          onClick={logout}
          style={styles.logoutButton}
        >
          🚪 Logout from MovieBook
        </button>

      </main>

      {/* FOOTER */}

      <footer style={styles.footer}>
        🍿 Enjoy your movie experience with MovieBook.
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
      "radial-gradient(circle at 80% 10%, rgba(220,38,38,0.13), transparent 25%), #070707",
    color: "#fff",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "50px",
  },

  glow: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "rgba(220,38,38,0.08)",
    filter: "blur(110px)",
    right: "-200px",
    top: "250px",
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
      "1px solid rgba(255,255,255,0.08)",
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

  moviesButton: {
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
    maxWidth: "850px",
    margin: "0 auto",
    padding: "55px 25px 30px",
    position: "relative",
    zIndex: 2,
  },

  eyebrow: {
    color: "#ef4444",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "800",
  },

  title: {
    fontSize: "42px",
    margin: "8px 0 5px",
    fontWeight: "900",
    letterSpacing: "-1px",
  },

  subtitle: {
    color: "#777",
    fontSize: "14px",
    margin: 0,
  },

  /* ======================================================
     CONTAINER
  ====================================================== */

  container: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "0 25px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    position: "relative",
    zIndex: 2,
  },

  /* ======================================================
     PROFILE CARD
  ====================================================== */

  profileCard: {
    background:
      "linear-gradient(135deg,#171719,#0d0d0f)",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  avatar: {
    width: "82px",
    height: "82px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ef4444,#991b1b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "900",
    boxShadow:
      "0 10px 30px rgba(220,38,38,0.25)",
  },

  profileName: {
    flex: 1,
  },

  profileNameH2: {
    margin: 0,
  },

  roleBadge: {
    display: "inline-block",
    marginTop: "7px",
    padding: "5px 10px",
    borderRadius: "20px",
    background:
      "rgba(220,38,38,0.1)",
    border:
      "1px solid rgba(220,38,38,0.25)",
    color: "#f87171",
    fontSize: "10px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  memberText: {
    color: "#555",
    fontSize: "11px",
  },

  /* ======================================================
     INFORMATION
  ====================================================== */

  infoCard: {
    background:
      "rgba(18,18,20,0.92)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "25px",
  },

  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "15px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
  },

  infoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "9px",
    background:
      "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  label: {
    color: "#555",
    fontSize: "9px",
    letterSpacing: "1.2px",
    fontWeight: "700",
  },

  /* ======================================================
     ACTIONS
  ====================================================== */

  actionsCard: {
    background:
      "rgba(18,18,20,0.92)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "25px",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  actionButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px",
    background:
      "rgba(255,255,255,0.025)",
    border:
      "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
  },

  actionIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "9px",
    background:
      "rgba(220,38,38,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "19px",
  },

  actionText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  arrow: {
    color: "#666",
    fontSize: "18px",
  },

  /* ======================================================
     LOGOUT
  ====================================================== */

  logoutButton: {
    width: "100%",
    padding: "14px",
    background:
      "rgba(220,38,38,0.07)",
    color: "#f87171",
    border:
      "1px solid rgba(220,38,38,0.2)",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
  },

  /* ======================================================
     LOGIN
  ====================================================== */

  loginCard: {
    width: "min(90%, 420px)",
    margin: "150px auto",
    padding: "45px 35px",
    textAlign: "center",
    background:
      "linear-gradient(145deg,#171719,#0d0d0f)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    position: "relative",
    zIndex: 2,
  },

  loginIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  loginTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "900",
  },

  loginText: {
    color: "#777",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "12px 0 25px",
  },

  primaryButton: {
    background:
      "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    border: "none",
    padding: "13px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "800",
  },

  /* ======================================================
     FOOTER
  ====================================================== */

  footer: {
    textAlign: "center",
    color: "#444",
    fontSize: "11px",
    marginTop: "45px",
    padding: "20px",
  },
};

export default Profile;