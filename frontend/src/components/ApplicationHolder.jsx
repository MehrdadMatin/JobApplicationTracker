import React from "react";
import "./ApplicationHolder.css";

function ApplicationHolder({ application }) {
  if (!application) return null;

  return (
    <div className={`application-box box-${application.status}`}>
      {/* left half positioning */}
      <div className="application-left">
        <h3>{application.position} @ {application.company_name}</h3>
      </div>

      {/* right half positioning*/}
      <div className="application-right">
        <p>Applied: {application.date_applied}</p>
        <p>
          <span className={`status-circle status-${application.status}`}></span>
          {application.status}
        </p>
      </div>
    </div>
  );
}

export default ApplicationHolder;
