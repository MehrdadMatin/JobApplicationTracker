// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import ResumeManager from "./pages/ResumeManager.jsx";
import NotificationsPage from "./pages/NotificationsPage";
import Navbar from "./components/NavBar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApplicationsPage />} />
        <Route path="/resumes" element={<ResumeManager />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
      </Routes>
    </>
  );
}
