import React from "react";
import "./ApplicationHolder.css";

function ApplicationHolder({ application }) {
  if (!application) return null;

  return (
    <div className="application-box">
      {/* Left side */}
      <div className="application-left">
        <h3>{application.position} @ {application.company}</h3>
      </div>

      {/* Right side */}
      <div className="application-right">
        <p>Applied: {application.date}</p>
        <p>
          <span className={`status-circle status-${application.status}`}></span>
          {application.status}
        </p>
      </div>
    </div>
  );
}

export default ApplicationHolder;
