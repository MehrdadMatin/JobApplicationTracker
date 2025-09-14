import React, { useState } from "react";
import ApplicationHolder from "../components/ApplicationHolder";
import ApplicationForm from "../components/ApplicationForm";
import "./ApplicationsPage.css";

// mock data
const applicationsData = [
  { id: 1, company_name: "Acme Corp", position: "Software Engineer", status: "Applied", date_applied: "2025-09-13" },
  { id: 2, company_name: "Globex Inc", position: "Frontend Developer", status: "Interview", date_applied: "2025-09-10" },
  { id: 3, company_name: "Umbrella Corp", position: "Backend Developer", status: "Rejected", date_applied: "2025-09-05" },
  { id: 4, company_name: "Acme Corp", position: "Software Engineer", status: "Applied", date_applied: "2025-09-13" },
  { id: 5, company_name: "Globex Inc", position: "Frontend Developer", status: "Interview", date_applied: "2025-09-10" },
  { id: 6, company_name: "Umbrella Corp", position: "Backend Developer", status: "Offer", date_applied: "2025-09-05" },
];

function ApplicationsPage() {
  const [applications, setApplications] = useState(applicationsData);
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const options = ["All", "Applied", "Interview", "Rejected", "Offer"];

  // filter logic
  const filteredApps = filter === "All"
    ? applications
    : applications.filter(app => app.status === filter);

  // creating new application
  const handleFormSubmit = (newApp) => {
    setApplications((prev) => [
      ...prev,
      { id: prev.length + 1, ...newApp }
    ]);
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>My Job Applications</h1>
        <div style={{ display: "inline-flex", gap: "10px" }}>
          {/* Filter button with dropdown */}
          <div style={{ position: "relative" }}>
            <button className="filter" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Filter ▾
            </button>
            {isDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                zIndex: 10
              }}>
                {options.map(option => (
                  <div
                    key={option}
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => {
                      setFilter(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add button */}
          <button className="add" onClick={() => setShowForm(true)}>+</button>
        </div>
      </div>

      {/* Show the form if add is clicked */}
      {showForm && (
  <div className="overlay" onClick={() => setShowForm(false)}>
    <ApplicationForm
      onSubmit={handleFormSubmit}
      onClose={() => setShowForm(false)}
    />
  </div>
)}

      {filteredApps.map((app) => (
        <ApplicationHolder key={app.id} application={app} />
      ))}
    </div>
  );
}

export default ApplicationsPage;
