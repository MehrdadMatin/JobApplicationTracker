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
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* App title / logo */}
      <h2 style={{ margin: 0 }}>Job Tracker</h2>

      {/* Navigation links */}
      <div>
        <Link
          to="/Resume_Manager"
          style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}
        >
          Resume Manager
        </Link>
        <Link
          to="/Notifications"
          style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}
        >
          Notifications
        </Link>
        <Link
            to="/"
            style={{ color: "#fff", textDecoration: "none" }}
        >
            Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
