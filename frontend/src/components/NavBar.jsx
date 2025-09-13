// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",         // dark background
        color: "#fff",                   // white text
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* App title / logo */}
      <h2 style={{ margin: 0 }}>Job Tracker</h2>

      {/* Navigation links */}
      <div>
        <Link
          to="/"
          style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}
        >
          Resume Manager
        </Link>
        <Link
          to="/about"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Notifications
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
