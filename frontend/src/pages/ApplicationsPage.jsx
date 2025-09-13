// ApplicationsPage.jsx
import React from "react";
import ApplicationHolder from "../components/ApplicationHolder";
import "./ApplicationsPage.css";

const applications = [
  { id: 1, company: "Acme Corp", position: "Software Engineer", status: "Applied", date: "2025-09-13" },
  { id: 2, company: "Globex Inc", position: "Frontend Developer", status: "Interview", date: "2025-09-10" },
  { id: 3, company: "Umbrella Corp", position: "Backend Developer", status: "Rejected", date: "2025-09-05" },
];

function ApplicationsPage() {
  return (
    <div className="page-container">
      <div className="header">
        <h1>My Job Applications</h1>
        <div>
          <button className="filter">Filter</button>
          <button className="add">➕</button>
        </div>
      </div>

      {applications.map((app) => (
        <ApplicationHolder key={app.id} application={app} />
      ))}
    </div>
  );
}

export default ApplicationsPage;
