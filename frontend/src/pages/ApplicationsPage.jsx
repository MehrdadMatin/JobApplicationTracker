import React, { useState } from "react";
import ApplicationHolder from "../components/ApplicationHolder";
import "./ApplicationsPage.css";

// mock data - *still gotta connect to backend 
const applications = [
  { id: 1, company: "Acme Corp", position: "Software Engineer", status: "Applied", date: "2025-09-13" },
  { id: 2, company: "Globex Inc", position: "Frontend Developer", status: "Interview", date: "2025-09-10" },
  { id: 3, company: "Umbrella Corp", position: "Backend Developer", status: "Rejected", date: "2025-09-05" },
  { id: 4, company: "Acme Corp", position: "Software Engineer", status: "Offer", date: "2025-09-13" },
  { id: 5, company: "Globex Inc", position: "Frontend Developer", status: "Interview", date: "2025-09-10" },
  { id: 6, company: "Umbrella Corp", position: "Backend Developer", status: "Rejected", date: "2025-09-05" },
];

function ApplicationsPage() {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // managing filtering logic
  const filteredApps = filter === "All"
    ? applications
    : applications.filter(app => app.status === filter);
  const options = ["All", "Applied", "Interview", "Rejected", "Offer"];

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
          <button className="add">+</button>
        </div>
      </div>
      {filteredApps.map((app) => (
        <ApplicationHolder key={app.id} application={app} />
      ))}
    </div>
  );
}

export default ApplicationsPage;
