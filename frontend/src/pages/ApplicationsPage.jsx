// frontend/src/pages/ApplicationsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { listApplications } from "../api";
import ApplicationHolder from "../components/ApplicationHolder";
import ApplicationForm from "../components/ApplicationForm";
import "./ApplicationsPage.css";

const LABEL = {
  applied: "Applied",
  interviewing: "Interview",
  offered: "Offer",
  rejected: "Rejected",
  on_hold: "On Hold",
};

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await listApplications(); // GET /api/applications/
        setApps(r.data ?? []);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return apps;
    return apps.filter(a => a.status === filter);
  }, [apps, filter]);

  if (loading) return <div style={{padding:16}}>Loading…</div>;
  if (err) return <div style={{padding:16,color:'red'}}>Failed: {String(err)}</div>;

  return (
    <div className="page-container">
      <div className="header">
        <h1>My Job Applications</h1>
        <div style={{ display: "inline-flex", gap: 10 }}>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interview</option>
            <option value="offered">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="on_hold">On Hold</option>
          </select>
          <button className="add" onClick={() => setOpen(true)}>Add Job +</button>
        </div>
      </div>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <ApplicationForm
            onSubmit={(newApp) => {
              // (optional) POST to backend then refresh; for now just add locally:
              setApps(prev => [...prev, { id: crypto.randomUUID(), ...newApp }]);
              setOpen(false);
            }}
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      {filtered.map(app => (
        <ApplicationHolder
          key={app.id}
          application={{
            ...app,
            // Make labels pretty if your holder expects Title Case
            status: LABEL[app.status] ?? app.status,
          }}
        />
      ))}
    </div>
  );
}
