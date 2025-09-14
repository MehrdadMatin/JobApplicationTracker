// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import ResumeManager from "./pages/ResumeManager.jsx";
import Navbar from "./components/NavBar.jsx";

const NotificationsPage = () => (
  <div style={{ padding: 16 }}>Notifications coming soon…</div>
);

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
