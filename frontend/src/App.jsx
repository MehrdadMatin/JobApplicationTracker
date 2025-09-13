// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApplicationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
