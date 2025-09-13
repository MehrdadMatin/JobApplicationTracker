// src/pages/ApplicationDetailsPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

function ApplicationDetailsPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Application Details (ID: {id})</h2>
      <p>Details will be added here later.</p>
      <Link to="/">← Back to all applications</Link>
    </div>
  );
}

export default ApplicationDetailsPage;
