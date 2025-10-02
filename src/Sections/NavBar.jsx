// Navbar.jsx
import React, { useState } from "react";

export default function Navbar({ currentAccount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>🟦 Web3 Drive</div>

      {/* Hamburger for mobile */}
      <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Links */}
      <div
        style={{
          ...styles.links,
          ...(menuOpen ? styles.linksMobileOpen : styles.linksMobileClosed),
        }}
      >
        <span style={styles.link}>My Drive</span>
        <span style={styles.link}>Shared with me</span>
        <span style={styles.link}>Recent</span>
      </div>

      {/* Wallet */}
      <div style={styles.wallet}>
        {currentAccount
          ? `Connected: ${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
          : "Not Connected"}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#f1f3f4", // Google Drive light gray
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
    position: "relative",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  links: {
    display: "flex",
    gap: "15px",
    transition: "all 0.3s ease",
  },
  link: {
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "background 0.2s",
  },
  wallet: {
    fontSize: "14px",
    background: "#e8f0fe",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  hamburger: {
    display: "none",
    cursor: "pointer",
    fontSize: "24px",
  },
  linksMobileOpen: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    background: "#f1f3f4",
    padding: "10px 0",
    gap: "10px",
  },
  linksMobileClosed: {
    display: "none",
  },
};

// Media query using JS approach (optional)
// For a full responsive design, consider moving to a CSS file or using Tailwind / styled-components
