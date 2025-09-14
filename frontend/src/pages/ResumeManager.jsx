import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2, Download, Upload, Briefcase, User, Mail, MapPin, Phone, Star } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"
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

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 50%, #e8eaf6 100%)',
    padding: '24px'
  },
  maxWidth: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #000000, #000000)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.125rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '24px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f3f4f6',
    overflow: 'hidden'
  },
  cardGradient: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'
  },
  cardHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #f3f4f6',
    background: 'linear-gradient(135deg, #000000, #000000)',
    color: 'white'
  },
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: 0
  },
  cardBody: {
    padding: '24px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#2563eb',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    fontSize: '1rem',
    resize: 'none',
    minHeight: '120px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  button: {
    fontWeight: '600',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem'
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #000000, #000000)',
    color: 'white',
    padding: '12px 16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  buttonSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '12px 16px'
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '8px 12px'
  },
  buttonSuccess: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 16px'
  },
  buttonLarge: {
    padding: '16px 24px',
    fontSize: '1.125rem'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  flexRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  experienceCard: {
    padding: '16px',
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    marginBottom: '16px'
  },
  checkboxGroup: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem'
  },
  checkboxInput: {
    accentColor: '#2563eb',
    width: '16px',
    height: '16px'
  },
  message: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  messageSuccess: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0'
  },
  messageWarning: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fde68a'
  },
  messageError: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca'
  },
  spinner: {
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite'
  },
  preview: {
    display: 'flex',
    justifyContent: 'center'
  },
  previewPage: {
    backgroundColor: 'white',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    width: '794px',
    minHeight: '1123px',
    padding: '48px 56px',
    transform: 'scale(0.8)',
    transformOrigin: 'top center',
    boxSizing: 'border-box'
  },
  previewHeader: {
    textAlign: 'center',
    borderBottom: '2px solid #2563eb',
    paddingBottom: '16px',
    marginBottom: '24px'
  },
  previewName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  },
  previewContact: {
    color: '#6b7280',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  section: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
    borderBottom: '1px solid #d1d5db',
    paddingBottom: '4px',
    marginBottom: '12px'
  },
  skillTag: {
    padding: '4px 12px',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
    margin: '4px'
  },
  experienceItem: {
    marginBottom: '24px'
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  experienceTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#111827'
  },
  experienceCompany: {
    color: '#2563eb',
    fontWeight: '600'
  },
  experienceDate: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  experienceList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#374151'
  },
  experienceListItem: {
    marginBottom: '4px'
  }
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 1024px) {
    .grid-responsive {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

/** Enhanced UI Components */
const Card = ({ title, children, gradient = false }) => (
  <div style={{...styles.card, ...(gradient ? styles.cardGradient : {})}}>
    {title && (
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>
          {title === "Personal Information" && <User size={20} />}
          {title === "Professional Summary" && <Star size={20} />}
          {title === "Skills & Technologies" && <Briefcase size={20} />}
          {title === "🎯 Tailor to Job Application" && <Star size={20} />}
          {title === "📄 Resume Preview" && <User size={20} />}
          {title === "Work Experience" && <Briefcase size={20} />}
          {title === "Export Actions" && <Download size={20} />}
          {title}
        </h2>
      </div>
    )}
    <div style={styles.cardBody}>
      {children}
    </div>
  </div>
);

const Row = ({ label, children, icon }) => (
  <div style={styles.formGroup}>
    <label style={styles.label}>
      {icon}
      {label}
    </label>
    {children}
  </div>
);

const Input = ({ style = {}, onFocus, onBlur, ...props }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <input 
      style={{
        ...styles.input,
        ...(focused ? styles.inputFocus : {}),
        ...style
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...props}
    />
  );
};

const Button = ({ variant = "primary", size = "md", children, disabled, onClick, style = {} }) => {
  let buttonStyle = { ...styles.button };
  
  if (variant === "primary") buttonStyle = { ...buttonStyle, ...styles.buttonPrimary };
  if (variant === "secondary") buttonStyle = { ...buttonStyle, ...styles.buttonSecondary };
  if (variant === "danger") buttonStyle = { ...buttonStyle, ...styles.buttonDanger };
  if (variant === "success") buttonStyle = { ...buttonStyle, ...styles.buttonSuccess };
  if (size === "lg") buttonStyle = { ...buttonStyle, ...styles.buttonLarge };
  if (disabled) buttonStyle = { ...buttonStyle, ...styles.buttonDisabled };
  
  return (
    <button 
      style={{...buttonStyle, ...style}}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

/** Main Component */
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

  // Build a PDF blob from the preview
const makePdfBlob = async () => {
  const node = previewRef.current;
  if (!node) throw new Error("Preview not ready");

  // Load libs on demand
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  // Temporarily remove visual scale so it's crisp in the PDF
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

    // Add extra pages if needed
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

// Trigger the download
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
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>Resume Manager</h1>
          <p style={styles.subtitle}>Create and tailor professional resumes for your job applications</p>
        </div>

        <div style={{...styles.grid}} className="grid-responsive">
          {/* LEFT PANEL - Controls */}
          <div style={styles.leftPanel}>
            {/* Job Selection */}
            <Card title="🎯 Tailor to Job Application" gradient>
              <div style={styles.flexCol}>
                <select 
                  value={appId} 
                  onChange={(e) => setAppId(e.target.value)}
                  style={styles.select}
                >
                  <option value="">— Select Application —</option>
                  {apps.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.company_name} — {a.position}
                    </option>
                  ))}
                </select>
                <Button 
                  onClick={prefillForSelectedJob} 
                  disabled={!appId}
                  style={{width: '100%'}}
                >
                  <Star size={16} />
                  Tailor to Selected Job
                </Button>
              </div>
            </Card>

            {/* Header Info */}
            <Card title="Personal Information">
              <div style={styles.flexCol}>
                <Row label="Full Name" icon={<User size={16} />}>
                  <Input value={form.name} onChange={(e)=>update({name: e.target.value})} />
                </Row>
                <Row label="Email Address" icon={<Mail size={16} />}>
                  <Input value={form.email} onChange={(e)=>update({email: e.target.value})} type="email" />
                </Row>
                <Row label="Location" icon={<MapPin size={16} />}>
                  <Input value={form.location} onChange={(e)=>update({location: e.target.value})} />
                </Row>
                <Row label="Phone Number" icon={<Phone size={16} />}>
                  <Input value={form.phone} onChange={(e)=>update({phone: e.target.value})} type="tel" />
                </Row>
                <div style={styles.checkboxGroup}>
                  <label style={styles.checkbox}>
                    <input 
                      type="checkbox" 
                      checked={form.showLocation} 
                      onChange={(e)=>update({showLocation: e.target.checked})}
                      style={styles.checkboxInput}
                    />
                    <span>Show Location</span>
                  </label>
                  <label style={styles.checkbox}>
                    <input 
                      type="checkbox" 
                      checked={form.showPhone} 
                      onChange={(e)=>update({showPhone: e.target.checked})}
                      style={styles.checkboxInput}
                    />
                    <span>Show Phone</span>
                  </label>
                </div>
              </div>
            </Card>

            {/* Professional Summary */}
            <Card title="Professional Summary">
              <textarea
                value={form.summary}
                onChange={(e)=>update({summary: e.target.value})}
                style={styles.textarea}
                placeholder="Write a compelling professional summary..."
              />
            </Card>

            {/* Skills */}
            <Card title="Skills & Technologies">
              <div style={styles.flexCol}>
                {form.skills.map((s, i) => (
                  <div key={i} style={styles.flexRow}>
                    <Input 
                      value={s} 
                      onChange={(e)=>setSkill(i, e.target.value)}
                      style={{flex: 1}}
                      placeholder="Enter skill..."
                    />
                    <Button 
                      variant="danger" 
                      onClick={()=>removeSkill(i)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" onClick={addSkill} style={{width: '100%'}}>
                  <Plus size={16} />
                  Add Skill
                </Button>
              </div>
            </Card>

            {/* Experience */}
            <Card title="Work Experience">
              <div style={styles.flexCol}>
                {form.experience.map((ex, i) => (
                  <div key={i} style={styles.experienceCard}>
                    <div style={styles.flexCol}>
                      <Row label="Job Title">
                        <Input value={ex.role} onChange={(e)=>setExpField(i, "role", e.target.value)} />
                      </Row>
                      <Row label="Company">
                        <Input value={ex.company} onChange={(e)=>setExpField(i, "company", e.target.value)} />
                      </Row>
                      <Row label="Employment Dates">
                        <Input value={ex.dates} onChange={(e)=>setExpField(i, "dates", e.target.value)} />
                      </Row>
                      <div>
                        <div style={styles.label}>Key Achievements</div>
                        {ex.bullets.map((b, bi) => (
                          <div key={bi} style={{...styles.flexRow, marginBottom: '8px'}}>
                            <Input 
                              value={b} 
                              onChange={(e)=>setExpBullet(i, bi, e.target.value)}
                              style={{flex: 1}}
                              placeholder="Describe your achievement..."
                            />
                            <Button 
                              variant="danger"
                              onClick={()=>setExpField(i, "bullets", ex.bullets.filter((_, x)=>x!==bi))}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ))}
                        <div style={styles.flexRow}>
                          <Button variant="secondary" onClick={()=>addExpBullet(i)}>
                            <Plus size={14} />
                            Add Achievement
                          </Button>
                          <Button variant="danger" onClick={()=>removeExp(i)}>
                            <Trash2 size={14} />
                            Remove Experience
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" onClick={addExperience} style={{width: '100%'}}>
                  <Plus size={16} />
                  Add Work Experience
                </Button>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card title="Export Actions">
              <div style={styles.flexCol}>
                <Button 
                  onClick={handleSaveMaster} 
                  disabled={loading}
                  style={{width: '100%'}}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Save Master Resume
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleTailorToJob} 
                  disabled={loading}
                  variant="success"
                  style={{width: '100%'}}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Export & Attach to Job
                    </>
                  )}
                </Button>

                <Button onClick={downloadPdf} variant="secondary" className="w-full" size="lg">
                  <Download size={16} />
                  Download Preview PDF
                </Button>
              </div>
              {msg && (
                <div style={{
                  ...styles.message,
                  ...(msg.includes("✅") || msg.includes("✨") 
                    ? styles.messageSuccess
                    : msg.includes("⚠️")
                    ? styles.messageWarning
                    : styles.messageError)
                }}>
                  {msg}
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT PANEL - Preview */}
          <div>
            <Card title="📄 Resume Preview">
              <div style={styles.preview}>
                <div ref={previewRef} style={styles.previewPage}>
                  {/* Header */}
                  <div style={styles.previewHeader}>
                    <div style={styles.previewName}>
                      {form.name}
                    </div>
                    <div style={styles.previewContact}>
                      <span>📧 {form.email}</span>
                      {form.showLocation && <span>📍 {form.location}</span>}
                      {form.showPhone && form.phone && <span>📞 {form.phone}</span>}
                    </div>
                  </div>

                  {/* Skills */}
                  <Section title="SKILLS">
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                      {form.skills.filter(Boolean).map((s, i) => (
                        <span key={i} style={styles.skillTag}>{s}</span>
                      ))}
                    </div>
                  </Section>

                  {/* Summary */}
                  <Section title="PROFESSIONAL SUMMARY">
                    <div style={{color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap'}}>
                      {form.summary}
                    </div>
                  </Section>

                  {/* Experience */}
                  <Section title="EXPERIENCE">
                    {form.experience.map((ex, i) => (
                      <div key={i} style={styles.experienceItem}>
                        <div style={styles.experienceHeader}>
                          <div>
                            <div style={styles.experienceTitle}>{ex.role}</div>
                            <div style={styles.experienceCompany}>{ex.company}</div>
                          </div>
                          <div style={styles.experienceDate}>{ex.dates}</div>
                        </div>
                        <ul style={styles.experienceList}>
                          {ex.bullets.filter(Boolean).map((b, bi) => (
                            <li key={bi} style={styles.experienceListItem}>{b}</li>
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
                            <div style={{fontWeight: 'bold', color: '#111827'}}>{ed.school}</div>
                            <div style={{color: '#374151'}}>{ed.credential}</div>
                          </div>
                          <div style={styles.experienceDate}>{ed.dates}</div>
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
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}