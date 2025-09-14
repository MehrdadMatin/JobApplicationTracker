// FilterDropdown.jsx
import React, { useState } from "react";

export default function FilterDropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative", marginRight: "10px", display: "inline-block" }}>
      <button onClick={() => setIsOpen(!isOpen)}>Filter ▾</button>

      {isOpen && (
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
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
