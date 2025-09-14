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

/** Enhanced UI Components */
const Card = ({ title, children, className = "", gradient = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${gradient ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''} ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          {title === "Resume Header" && <User size={20} />}
          {title === "Professional Summary" && <Star size={20} />}
          {title === "Skills" && <Briefcase size={20} />}
          {title}
        </h2>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Row = ({ label, children, icon }) => (
  <label className="block mb-4">
    <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
      {icon}
      {label}
    </div>
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input 
    className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
    {...props}
  />
);

const Button = ({ variant = "primary", size = "md", children, className = "", ...props }) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
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
      // Simulate PDF generation and upload
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Resume Manager
            </h1>
            <p className="text-gray-600 text-lg">Create and tailor professional resumes for your job applications</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* LEFT PANEL - Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Selection */}
              <Card title="🎯 Tailor to Job Application" gradient>
                <div className="space-y-4">
                  <select 
                    value={appId} 
                    onChange={(e) => setAppId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full"
                  >
                    <Star size={16} />
                    Tailor to Selected Job
                  </Button>
                </div>
              </Card>

              {/* Header Info */}
              <Card title="Personal Information">
                <div className="space-y-4">
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
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="checkbox" 
                        checked={form.showLocation} 
                        onChange={(e)=>update({showLocation: e.target.checked})}
                        style={{
                          accentColor: '#2563eb',
                          width: '16px',
                          height: '16px'
                        }}
                      />
                      <span style={{ color: '#374151' }}>Show Location</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="checkbox" 
                        checked={form.showPhone} 
                        onChange={(e)=>update({showPhone: e.target.checked})}
                        style={{
                          accentColor: '#2563eb',
                          width: '16px',
                          height: '16px'
                        }}
                      />
                      <span style={{ color: '#374151' }}>Show Phone</span>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Professional Summary */}
              <Card title="Professional Summary">
                <textarea
                  rows={5}
                  value={form.summary}
                  onChange={(e)=>update({summary: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write a compelling professional summary..."
                />
              </Card>

              {/* Skills */}
              <Card title="Skills & Technologies">
                <div className="space-y-3">
                  {form.skills.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <Input 
                        value={s} 
                        onChange={(e)=>setSkill(i, e.target.value)}
                        className="flex-1"
                        placeholder="Enter skill..."
                      />
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={()=>removeSkill(i)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={addSkill} className="w-full">
                    <Plus size={16} />
                    Add Skill
                  </Button>
                </div>
              </Card>

              {/* Experience */}
              <Card title="Work Experience">
                <div className="space-y-6">
                  {form.experience.map((ex, i) => (
                    <div key={i} className="p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                      <div className="space-y-3">
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
                          <div className="text-sm font-semibold text-gray-700 mb-2">Key Achievements</div>
                          {ex.bullets.map((b, bi) => (
                            <div key={bi} className="flex gap-2 mb-2">
                              <Input 
                                value={b} 
                                onChange={(e)=>setExpBullet(i, bi, e.target.value)}
                                className="flex-1"
                                placeholder="Describe your achievement..."
                              />
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={()=>setExpField(i, "bullets", ex.bullets.filter((_, x)=>x!==bi))}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={()=>addExpBullet(i)}>
                              <Plus size={14} />
                              Add Achievement
                            </Button>
                            <Button variant="danger" size="sm" onClick={()=>removeExp(i)}>
                              <Trash2 size={14} />
                              Remove Experience
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={addExperience} className="w-full">
                    <Plus size={16} />
                    Add Work Experience
                  </Button>
                </div>
              </Card>

              {/* Action Buttons */}
              <Card title="Export Actions">
                <div className="space-y-3">
                  <Button 
                    onClick={handleSaveMaster} 
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Export & Attach to Job
                      </>
                    )}
                  </Button>
                </div>
                {msg && (
                  <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${
                    msg.includes("✅") || msg.includes("✨") 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : msg.includes("⚠️")
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {msg}
                  </div>
                )}
              </Card>
            </div>

            {/* RIGHT PANEL - Preview */}
            <div className="lg:col-span-3">
              <Card title="📄 Resume Preview" className="h-fit">
                <div className="flex justify-center">
                  <div
                    ref={previewRef}
                    className="bg-white shadow-2xl"
                    style={{
                      width: "794px",
                      minHeight: "1123px",
                      padding: "48px 56px",
                      transform: "scale(0.8)",
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Header */}
                    <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {form.name}
                      </div>
                      <div className="text-gray-600 flex justify-center items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          📧 {form.email}
                        </span>
                        {form.showLocation && (
                          <span className="flex items-center gap-1">
                            📍 {form.location}
                          </span>
                        )}
                        {form.showPhone && form.phone && (
                          <span className="flex items-center gap-1">
                            📞 {form.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <Section title="SKILLS">
                      <div className="flex flex-wrap gap-2">
                        {form.skills.filter(Boolean).map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </Section>

                    {/* Summary */}
                    <Section title="PROFESSIONAL SUMMARY">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {form.summary}
                      </div>
                    </Section>

                    {/* Experience */}
                    <Section title="EXPERIENCE">
                      {form.experience.map((ex, i) => (
                        <div key={i} className="mb-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="text-lg font-bold text-gray-900">
                                {ex.role}
                              </div>
                              <div className="text-blue-600 font-semibold">
                                {ex.company}
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                              {ex.dates}
                            </div>
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
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
                        <div key={i} className="mb-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-900">{ed.school}</div>
                              <div className="text-gray-700">{ed.credential}</div>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                              {ed.dates}
                            </div>
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
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="text-lg font-bold pb-1 mb-3" style={{ 
        color: '#1f2937', 
        borderBottom: '1px solid #d1d5db' 
      }}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}