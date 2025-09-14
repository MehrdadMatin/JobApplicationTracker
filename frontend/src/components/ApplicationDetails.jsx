import React, { useState } from "react";
import "./ApplicationDetails.css";

function ApplicationDetails({ application, onClose }) {
    const [company_name, setCompanyName] = useState(application.company_name);
    const [position, setPosition] = useState(application.position);
    const [date_applied, setDateApplied] = useState(application.date_applied);
    const [status, setStatus] = useState(application.status);

    // handle saving edits
    const handleEdit = (e) => {
        e.preventDefault();
        onsubmit()
    } 

    // handle view logs 

    // handle close 


    return (
        <div className="detailsOverlay" onClick={onClose}>
            <div className="application-details" onClick={(e) => e.stopPropagation()}>
                <h2>Application Details</h2>
                <form>
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
                    <label>Notes</label> 
                    <textarea placeholder="" rows="4" cols="50" max-width></textarea>
                </div>
                <div>
                    <button type="submit">Save</button>   
                </div>
                <div>
                    <button type="button">View Logs</button>    
                </div>
                <div>
                    <button type="button" onClick={onClose}>Close</button>
                </div>
                </form>
            </div>
        </div>
    );
}  

export default ApplicationDetails; 