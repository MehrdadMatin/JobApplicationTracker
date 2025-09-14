import React, { useState } from "react";
import "./ApplicationForm.css";

function ApplicationForm({ onSubmit, onClose }) {
  const [company_name, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [date_applied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ company_name, position, date_applied, status });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="application-form" onClick={(e) => e.stopPropagation()}>
        <h2>Add Application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Company</label>
            <input
              type="text"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date Applied</label>
            <input
              type="date"
              value={date_applied}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div> 
            <label>Resume</label>
          </div> 
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
