import React from "react";

function ApplicationHolder({ application }) {
  if (!application) return null;

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
        display: "flex",           // make children side by side
        justifyContent: "space-between", // spread them across the box
        alignItems: "center",      // vertical alignment
        backgroundColor: "#F2EEE9"
      }}
    >
      <span><strong>{application.position}</strong> </span>
      <span> <strong>@</strong> {application.company}</span>
      <span><strong>Applied:</strong> {application.date}</span>
      <span><strong>Status:</strong> {application.status}</span>
    </div>
  );
}

export default ApplicationHolder;
