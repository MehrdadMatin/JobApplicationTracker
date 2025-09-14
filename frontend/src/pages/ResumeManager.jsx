import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2, Download, Upload, Briefcase, User, Mail, MapPin, Phone, Star } from "lucide-react";

// Mock API functions for demo
const mockApi = {
  listApplications: async () => ({
    data: [
      { id: 1, company_name: "Google", position: "Software Engineer" },
      { id: 2, company_name: "Microsoft", position: "Product Manager" },
      { id: 3, company_name: "Amazon", position: "Data Scientist" }
    ]
  }),
  uploadMasterResume: async (file) => ({ success: true }),
  uploadTailoredResumeForApp: async (id, file) => ({ success: true })
};

// Simple, consistent styling similar to ApplicationsPage
const styles = `
  .resume-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background: #f9f9f9;
    min-height: 100vh;
  }

  .resume-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .resume-header h1 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 2rem;
  }

  .resume-header p {
    color: #666;
    margin: 0;
  }

  .resume-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .resume-grid {
      grid-template-columns: 1fr;
    }
  }

  .resume-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .card-header {
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 15px 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-body {
    padding: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .form-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .form-input:focus {
    outline: none;
    border-color: #007bff;
  }

  .form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    min-height: 100px;
    box-sizing: border-box;
  }

  .form-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background: white;
    box-sizing: border-box;
  }

  .btn {
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: #333;
  }

  .btn:hover {
    background: #f5f5f5;
  }

  .btn-primary {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  .btn-success {
    background: #28a745;
    color: white;
    border-color: #28a745;
  }

  .btn-success:hover {
    background: #1e7e34;
  }

  .btn-danger {
    background: #dc3545;
    color: white;
    border-color: #dc3545;
    padding: 8px 12px;
  }

  .btn-danger:hover {
    background: #c82333;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-block {
    width: 100%;
    justify-content: center;
  }

  .flex-row {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .experience-item {
    border: 2px dashed #ddd;
    border-radius: 6px;
    padding: 15px;
    background: #fafafa;
    margin-bottom: 15px;
  }

  .checkbox-group {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .message {
    margin-top: 15px;
    padding: 12px;
    border-radius: 4px;
    font-size: 14px;
  }

  .message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message.warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  }

  .message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .preview-container {
    display: flex;
    justify-content: center;
    background: #eee;
    padding: 20px;
    border-radius: 8px;
  }

  .preview-page {
    background: white;
    width: 8.5in;
    min-height: 11in;
    padding: 1in;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    box-sizing: border-box;
    transform: scale(0.7);
    transform-origin: top center;
  }

  .preview-header {
    text-align: center;
    border-bottom: 2px solid #333;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }

  .preview-name {
    font-size: 28px;
    font-weight: bold;
    margin: 0 0 8px 0;
  }

  .preview-contact {
    color: #666;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #ccc;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }

  .skill-tag {
    display: inline-block;
    background: #e9ecef;
    color: #333;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    margin: 2px;
  }

  .experience-entry {
    margin-bottom: 20px;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .experience-title {
    font-weight: bold;
  }

  .experience-company {
    color: #666;
  }

  .experience-date {
    color: #666;
    font-size: 14px;
  }

  .experience-list {
    margin: 0;
    padding-left: 20px;
  }

  .experience-list li {
    margin-bottom: 4px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Simple components
const Card = ({ title, children, icon }) => (
  <div className="resume-card">
    {title && (
      <div className="card-header">
        {icon}
        {title}
      </div>
    )}
    <div className="card-body">
      {children}
    </div>
  </div>
);

const FormGroup = ({ label, children, icon }) => (
  <div className="form-group">
    <label>
      {icon}
      {label}
    </label>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="section">
    <div className="section-title">{title}</div>
    <div>{children}</div>
  </div>
);

export default function ResumeManager() {
  const [form, setForm] = useState({
    name: "ASHLYN USER",
    email: "ashlynbenoy2004@gmail.com",
    location: "Edmonton",
    phone: "",
    showLocation: true,
    showPhone: false,
    summary: "Passionate and driven computer science student with experience in software development, data analysis, and project management. Seeking opportunities to apply technical skills and contribute to innovative solutions in a collaborative environment.",
    skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "Agile Methodology"],
    experience: [
      {
        role: "Software Development Intern",
        company: "Tech Solutions Inc.",
        dates: "May 2024 – Aug 2024",
        bullets: [
          "Developed and maintained web applications using React and Node.js",
          "Collaborated with cross-functional teams to deliver high-quality software solutions",
          "Improved application performance by 25% through code optimization"
        ],
      },
    ],
    education: [
      { school: "University of Alberta", credential: "B.Sc. Computer Science", dates: "2022 – 2026" },
    ],
  });

  const [apps, setApps] = useState([]);
  const [appId, setAppId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await mockApi.listApplications();
        setApps(r.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const selectedApp = useMemo(
    () => apps.find((a) => String(a.id) === String(appId)) || null,
    [apps, appId]
  );

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
  
  const addSkill = () => update({ skills: [...form.skills, ""] });
  const setSkill = (i, v) => {
    const next = [...form.skills]; next[i] = v; update({ skills: next });
  };
  const removeSkill = (i) => {
    const next = form.skills.filter((_, idx) => idx !== i); update({ skills: next });
  };

  const addExperience = () => update({
    experience: [...form.experience, { role: "", company: "", dates: "", bullets: [""] }],
  });
  const setExpField = (i, field, v) => {
    const next = form.experience.map((e, idx) => idx === i ? { ...e, [field]: v } : e);
    update({ experience: next });
  };
  
  const setExpBullet = (i, bi, v) => {
    const next = form.experience.map((e, idx) => {
      if (idx !== i) return e;
      const bullets = [...e.bullets]; bullets[bi] = v;
      return { ...e, bullets };
    });
    update({ experience: next });
  };
  const addExpBullet = (i) => setExpField(i, "bullets", [...form.experience[i].bullets, ""]);
  const removeExp = (i) => update({ experience: form.experience.filter((_, idx) => idx !== i) });

  const handleSaveMaster = async () => {
    setLoading(true);
    setMsg("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await mockApi.uploadMasterResume(new File([], "master_resume.pdf"));
      setMsg("Master resume uploaded successfully! ✅");
    } catch (e) {
      setMsg("Failed to upload master resume. ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleTailorToJob = async () => {
    if (!appId) { setMsg("Please choose an application first. ⚠️"); return; }
    setLoading(true);
    setMsg("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await mockApi.uploadTailoredResumeForApp(appId, new File([], "tailored_resume.pdf"));
      setMsg("Tailored resume attached to application successfully! ✅");
    } catch (e) {
      setMsg("Failed to attach tailored resume. ❌");
    } finally {
      setLoading(false);
    }
  };

  const prefillForSelectedJob = () => {
    if (!selectedApp) return;
    const jobFocusedSummary = `Motivated professional seeking the ${selectedApp.position} role at ${selectedApp.company_name}. ${form.summary}`;
    update({ summary: jobFocusedSummary });
    setMsg("Resume tailored for selected job! ✨");
  };

  const makePdfBlob = async () => {
    const node = previewRef.current;
    if (!node) throw new Error("Preview not ready");

    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const prevTransform = node.style.transform;
    node.style.transform = "";

    try {
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      let y = 0;
      pdf.addImage(imgData, "PNG", 0, y, imgW, imgH, undefined, "FAST");

      let heightLeft = imgH - pageH;
      while (heightLeft > 0) {
        y -= pageH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, y, imgW, imgH, undefined, "FAST");
        heightLeft -= pageH;
      }

      return pdf.output("blob");
    } finally {
      node.style.transform = prevTransform;
    }
  };

  const downloadPdf = async () => {
    try {
      setMsg("");
      const blob = await makePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${form.name.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMsg("PDF downloaded ✔");
    } catch (e) {
      console.error(e);
      setMsg("Failed to generate PDF ❌");
      alert(e.message || String(e));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="resume-container">
        <div className="resume-header">
          <h1>Resume Manager</h1>
          <p>Create and tailor professional resumes for your job applications</p>
        </div>

        <div className="resume-grid">
          {/* LEFT PANEL - Controls */}
          <div>
            {/* Job Selection */}
            <Card title="Tailor to Job Application">
              <div className="flex-col">
                <select 
                  value={appId} 
                  onChange={(e) => setAppId(e.target.value)}
                  className="form-select"
                >
                  <option value="">— Select Application —</option>
                  {apps.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.company_name} — {a.position}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={prefillForSelectedJob} 
                  disabled={!appId}
                  className="btn btn-primary btn-block"
                >
                  <Star size={16} />
                  Tailor to Selected Job
                </button>
              </div>
            </Card>

            {/* Personal Info */}
            <Card title="Personal Information">
              <div className="flex-col">
                <FormGroup label="Full Name">
                  <input 
                    value={form.name} 
                    onChange={(e)=>update({name: e.target.value})} 
                    className="form-input"
                  />
                </FormGroup>
                <FormGroup label="Email Address">
                  <input 
                    value={form.email} 
                    onChange={(e)=>update({email: e.target.value})} 
                    type="email" 
                    className="form-input"
                  />
                </FormGroup>
                <FormGroup label="Location">
                  <input 
                    value={form.location} 
                    onChange={(e)=>update({location: e.target.value})} 
                    className="form-input"
                  />
                </FormGroup>
                <FormGroup label="Phone Number">
                  <input 
                    value={form.phone} 
                    onChange={(e)=>update({phone: e.target.value})} 
                    type="tel" 
                    className="form-input"
                  />
                </FormGroup>
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={form.showLocation} 
                      onChange={(e)=>update({showLocation: e.target.checked})}
                    />
                    Show Location
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={form.showPhone} 
                      onChange={(e)=>update({showPhone: e.target.checked})}
                    />
                    Show Phone
                  </label>
                </div>
              </div>
            </Card>

            {/* Summary */}
            <Card title="Professional Summary">
              <textarea
                value={form.summary}
                onChange={(e)=>update({summary: e.target.value})}
                className="form-textarea"
                placeholder="Write a compelling professional summary..."
              />
            </Card>

            {/* Skills */}
            <Card title="Skills & Technologies">
              <div className="flex-col">
                {form.skills.map((s, i) => (
                  <div key={i} className="flex-row">
                    <input 
                      value={s} 
                      onChange={(e)=>setSkill(i, e.target.value)}
                      className="form-input"
                      style={{flex: 1}}
                      placeholder="Enter skill..."
                    />
                    <button 
                      className="btn btn-danger" 
                      onClick={()=>removeSkill(i)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button 
                  className="btn btn-block" 
                  onClick={addSkill}
                >
                  <Plus size={16} />
                  Add Skill
                </button>
              </div>
            </Card>

            {/* Experience */}
            <Card title="Work Experience">
              <div className="flex-col">
                {form.experience.map((ex, i) => (
                  <div key={i} className="experience-item">
                    <div className="flex-col">
                      <FormGroup label="Job Title">
                        <input 
                          value={ex.role} 
                          onChange={(e)=>setExpField(i, "role", e.target.value)} 
                          className="form-input"
                        />
                      </FormGroup>
                      <FormGroup label="Company">
                        <input 
                          value={ex.company} 
                          onChange={(e)=>setExpField(i, "company", e.target.value)} 
                          className="form-input"
                        />
                      </FormGroup>
                      <FormGroup label="Employment Dates">
                        <input 
                          value={ex.dates} 
                          onChange={(e)=>setExpField(i, "dates", e.target.value)} 
                          className="form-input"
                        />
                      </FormGroup>
                      <div>
                        <label style={{marginBottom: '10px', display: 'block', fontWeight: '500'}}>
                          Key Achievements
                        </label>
                        {ex.bullets.map((b, bi) => (
                          <div key={bi} className="flex-row" style={{marginBottom: '8px'}}>
                            <input 
                              value={b} 
                              onChange={(e)=>setExpBullet(i, bi, e.target.value)}
                              className="form-input"
                              style={{flex: 1}}
                              placeholder="Describe your achievement..."
                            />
                            <button 
                              className="btn btn-danger"
                              onClick={()=>setExpField(i, "bullets", ex.bullets.filter((_, x)=>x!==bi))}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <div className="flex-row">
                          <button 
                            className="btn" 
                            onClick={()=>addExpBullet(i)}
                          >
                            <Plus size={14} />
                            Add Achievement
                          </button>
                          <button 
                            className="btn btn-danger" 
                            onClick={()=>removeExp(i)}
                          >
                            <Trash2 size={14} />
                            Remove Experience
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  className="btn btn-block" 
                  onClick={addExperience}
                >
                  <Plus size={16} />
                  Add Work Experience
                </button>
              </div>
            </Card>

            {/* Export Actions */}
            <Card title="Export Actions">
              <div className="flex-col">
                <button 
                  onClick={handleSaveMaster} 
                  disabled={loading}
                  className="btn btn-primary btn-block"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Save Master Resume
                    </>
                  )}
                </button>
                <button 
                  onClick={handleTailorToJob} 
                  disabled={loading}
                  className="btn btn-success btn-block"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Export & Attach to Job
                    </>
                  )}
                </button>
                <button 
                  onClick={downloadPdf} 
                  className="btn btn-block"
                >
                  <Download size={16} />
                  Download Preview PDF
                </button>
              </div>
              {msg && (
                <div className={`message ${
                  msg.includes("✅") || msg.includes("✨") ? "success" :
                  msg.includes("⚠️") ? "warning" : "error"
                }`}>
                  {msg}
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT PANEL - Preview */}
          <div>
            <Card title="Resume Preview">
              <div className="preview-container">
                <div ref={previewRef} className="preview-page">
                  {/* Header */}
                  <div className="preview-header">
                    <div className="preview-name">
                      {form.name}
                    </div>
                    <div className="preview-contact">
                      <span>📧 {form.email}</span>
                      {form.showLocation && <span>📍 {form.location}</span>}
                      {form.showPhone && form.phone && <span>📞 {form.phone}</span>}
                    </div>
                  </div>

                  {/* Skills */}
                  <Section title="SKILLS">
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                      {form.skills.filter(Boolean).map((s, i) => (
                        <span key={i} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </Section>

                  {/* Summary */}
                  <Section title="PROFESSIONAL SUMMARY">
                    <div style={{color: '#333', lineHeight: '1.6', whiteSpace: 'pre-wrap'}}>
                      {form.summary}
                    </div>
                  </Section>

                  {/* Experience */}
                  <Section title="EXPERIENCE">
                    {form.experience.map((ex, i) => (
                      <div key={i} className="experience-entry">
                        <div className="experience-header">
                          <div>
                            <div className="experience-title">{ex.role}</div>
                            <div className="experience-company">{ex.company}</div>
                          </div>
                          <div className="experience-date">{ex.dates}</div>
                        </div>
                        <ul className="experience-list">
                          {ex.bullets.filter(Boolean).map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Section>

                  {/* Education */}
                  <Section title="EDUCATION">
                    {form.education.map((ed, i) => (
                      <div key={i} style={{marginBottom: '12px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <div style={{fontWeight: 'bold', color: '#333'}}>{ed.school}</div>
                            <div style={{color: '#666'}}>{ed.credential}</div>
                          </div>
                          <div className="experience-date">{ed.dates}</div>
                        </div>
                      </div>
                    ))}
                  </Section>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}