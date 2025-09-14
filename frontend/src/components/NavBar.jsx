// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const base = {
  color: "#fff",
  marginRight: "15px",
  textDecoration: "none",
};

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        borderRadius: "30px",
      }}
    >
      <h2 style={{ margin: 0 }}>Job Tracker</h2>

      <div>
        <NavLink
          to="/resumes"                    // <-- match your route exactly
          style={({ isActive }) => ({
            ...base,
            borderBottom: isActive ? "2px solid #fff" : "none",
          })}
        >
          Resume Manager
        </NavLink>

        <NavLink
          to="/notifications"              // <-- use lowercase, add a route if you want this page
          style={({ isActive }) => ({
            ...base,
            borderBottom: isActive ? "2px solid #fff" : "none",
          })}
        >
          Notifications
        </NavLink>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...base,
            marginRight: 0,
            borderBottom: isActive ? "2px solid #fff" : "none",
          })}
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
}
