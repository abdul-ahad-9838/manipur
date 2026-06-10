"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/Jobs.css";

const JOBS = [
  {
    id: 1,
    title: "Assistant Professor – Computer Science",
    department: "School of Information Technology",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "2+ Years",
    qualification: "Ph.D / M.Tech (CS/IT)",
    salary: "₹ 40,000 – ₹ 70,000 / month",
    deadline: "30 June 2026",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    description:
      "We are looking for a passionate and qualified Assistant Professor to join our School of Information Technology. The candidate will be responsible for teaching undergraduate and postgraduate courses, conducting research, and mentoring students.",
    responsibilities: [
      "Deliver lectures in core CS subjects including Data Structures, Algorithms, DBMS, and AI",
      "Guide students in projects, dissertations, and research activities",
      "Develop and update course materials and syllabi",
      "Participate in departmental meetings and academic committees",
      "Publish research papers in reputed journals",
    ],
    requirements: [
      "Ph.D. or M.Tech in Computer Science / Information Technology",
      "Minimum 2 years of teaching or industry experience",
      "Strong communication and presentation skills",
      "Experience with modern teaching methodologies",
    ],
  },
  {
    id: 2,
    title: "Assistant Professor – Management",
    department: "School of Management",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "2+ Years",
    qualification: "MBA / Ph.D (Management)",
    salary: "₹ 40,000 – ₹ 65,000 / month",
    deadline: "30 June 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    description:
      "Join our dynamic School of Management as an Assistant Professor. You will teach MBA and BBA students, conduct research in management disciplines, and contribute to the academic growth of the department.",
    responsibilities: [
      "Teach subjects like Marketing, HR, Finance, and Strategic Management",
      "Conduct case study sessions and industry interaction programs",
      "Guide MBA students in their research projects and dissertations",
      "Coordinate with industry partners for guest lectures and internships",
    ],
    requirements: [
      "MBA / Ph.D. in Management or related field",
      "Minimum 2 years of teaching or corporate experience",
      "Strong analytical and interpersonal skills",
      "NET/SET qualified preferred",
    ],
  },
  {
    id: 3,
    title: "Assistant Professor – Commerce",
    department: "School of Commerce",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "1+ Years",
    qualification: "M.Com / Ph.D (Commerce)",
    salary: "₹ 35,000 – ₹ 60,000 / month",
    deadline: "15 July 2026",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    description:
      "We seek a dedicated faculty member for our School of Commerce to teach B.Com and M.Com students. The role involves teaching, research, and active participation in departmental activities.",
    responsibilities: [
      "Teach Accountancy, Taxation, Business Law, and Financial Management",
      "Prepare students for competitive examinations like CA, CMA",
      "Conduct seminars and workshops on commerce topics",
      "Maintain academic records and student progress reports",
    ],
    requirements: [
      "M.Com / Ph.D. in Commerce or Accounting",
      "NET/SET qualification preferred",
      "Knowledge of GST, Tally, and financial software",
      "Good communication skills in English and Hindi",
    ],
  },
  {
    id: 4,
    title: "Assistant Professor – Engineering",
    department: "School of Engineering",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "2+ Years",
    qualification: "M.Tech / Ph.D (Engineering)",
    salary: "₹ 45,000 – ₹ 75,000 / month",
    deadline: "15 July 2026",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description:
      "We are hiring Assistant Professors for our School of Engineering across Civil, Mechanical, Electrical, and Computer Science Engineering disciplines. Candidates with strong academic and research backgrounds are encouraged to apply.",
    responsibilities: [
      "Deliver lectures and conduct lab sessions in core engineering subjects",
      "Supervise B.Tech and M.Tech projects and research",
      "Develop lab manuals and course materials",
      "Participate in accreditation and quality assurance activities",
    ],
    requirements: [
      "M.Tech / Ph.D. in relevant engineering discipline",
      "GATE qualified preferred",
      "Minimum 2 years of teaching or industry experience",
      "Ability to handle both theory and practical sessions",
    ],
  },
  {
    id: 5,
    title: "Admissions Counsellor",
    department: "Admissions Office",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "1+ Years",
    qualification: "Any Graduate",
    salary: "₹ 20,000 – ₹ 35,000 / month",
    deadline: "31 May 2026",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    description:
      "We are looking for an enthusiastic Admissions Counsellor to guide prospective students through the admission process, answer queries, and help achieve enrollment targets.",
    responsibilities: [
      "Handle student enquiries via phone, email, and walk-ins",
      "Guide students and parents through the admission process",
      "Coordinate with schools and colleges for outreach programs",
      "Maintain CRM records and follow up with leads",
      "Achieve monthly enrollment targets",
    ],
    requirements: [
      "Any graduate with excellent communication skills",
      "Minimum 1 year experience in admissions or counselling",
      "Proficiency in MS Office and CRM tools",
      "Fluency in English, Hindi, and Meitei preferred",
    ],
  },
  {
    id: 6,
    title: "IT Support Executive",
    department: "IT Department",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "1+ Years",
    qualification: "B.Tech / BCA / Diploma (IT)",
    salary: "₹ 18,000 – ₹ 30,000 / month",
    deadline: "31 May 2026",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description:
      "We need a skilled IT Support Executive to manage the university's IT infrastructure, provide technical support to staff and students, and ensure smooth operation of all digital systems.",
    responsibilities: [
      "Provide first-level technical support for hardware and software issues",
      "Manage network infrastructure, servers, and internet connectivity",
      "Maintain and update the university website and portals",
      "Ensure data backup and cybersecurity protocols are followed",
      "Support online examination and e-learning platforms",
    ],
    requirements: [
      "B.Tech / BCA / Diploma in IT or Computer Science",
      "Knowledge of networking, Windows Server, and Linux",
      "Experience with web hosting and domain management",
      "Good problem-solving and communication skills",
    ],
  },
  {
    id: 7,
    title: "Accounts Officer",
    department: "Finance & Accounts",
    type: "Full Time",
    location: "Imphal, Manipur",
    experience: "2+ Years",
    qualification: "B.Com / M.Com / CA Inter",
    salary: "₹ 25,000 – ₹ 45,000 / month",
    deadline: "15 June 2026",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800",
    description:
      "We are seeking a detail-oriented Accounts Officer to manage the university's financial records, handle fee collections, process payroll, and ensure compliance with financial regulations.",
    responsibilities: [
      "Maintain day-to-day accounting records using Tally/ERP",
      "Process student fee collections and generate receipts",
      "Prepare monthly financial statements and reports",
      "Handle GST filings, TDS, and other statutory compliances",
      "Coordinate with auditors during annual audits",
    ],
    requirements: [
      "B.Com / M.Com or CA Inter with 2+ years of experience",
      "Proficiency in Tally ERP and MS Excel",
      "Knowledge of GST, TDS, and income tax regulations",
      "Strong attention to detail and analytical skills",
    ],
  },
];

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: job.title,
          department: job.department,
          name: form.name,
          email: form.email,
          phone: form.phone,
          qualification: form.qualification,
          experience: form.experience,
          message: form.message,
        }),
      });
    } catch {}
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div
      className="job-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="job-modal">
        <button className="job-modal-close" onClick={onClose}>
          ✕
        </button>
        {submitted ? (
          <div className="job-modal-success">
            <div className="job-success-icon">✓</div>
            <h3>Application Submitted!</h3>
            <p>We'll review your application and get back to you soon.</p>
          </div>
        ) : (
          <>
            <div className="job-modal-header">
              <span className="job-modal-badge">APPLY NOW</span>
              <h2>{job.title}</h2>
              <p>
                {job.department} · {job.location}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="job-modal-form">
              <div className="job-form-row">
                <div className="job-form-field">
                  <label>Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div className="job-form-field">
                  <label>Phone Number *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div className="job-form-row">
                <div className="job-form-field">
                  <label>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@email.com"
                  />
                </div>
                <div className="job-form-field">
                  <label>Highest Qualification *</label>
                  <input
                    required
                    value={form.qualification}
                    onChange={(e) =>
                      setForm({ ...form, qualification: e.target.value })
                    }
                    placeholder="e.g. M.Tech, MBA, Ph.D"
                  />
                </div>
              </div>
              <div className="job-form-field">
                <label>Years of Experience</label>
                <input
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  placeholder="e.g. 3 years"
                />
              </div>
              <div className="job-form-field">
                <label>Cover Letter / Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us why you're a great fit..."
                />
              </div>
              <p className="job-form-note">
                📎 Please email your CV to <strong>hr@miu.edu.in</strong> with
                subject: "Application – {job.title}"
              </p>
              <button type="submit" className="btn btn-orange job-submit-btn">
                Submit Application →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function JobCard({ job, onApply }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`job-card ${expanded ? "expanded" : ""}`}>
      <div className="job-card-img">
        <img src={job.image} alt={job.title} />
        <div className="job-card-img-overlay" />
        <span className="job-type-badge">{job.type}</span>
      </div>
      <div className="job-card-body">
        <div className="job-card-dept">{job.department}</div>
        <h3 className="job-card-title">{job.title}</h3>
        <div className="job-card-meta">
          <span>📍 {job.location}</span>
          <span>🎓 {job.qualification}</span>
          <span>⏱ {job.experience}</span>
          <span>💰 {job.salary}</span>
        </div>
        <p className="job-card-desc">{job.description}</p>

        {expanded && (
          <div className="job-card-details">
            <div className="job-detail-block">
              <h4>Key Responsibilities</h4>
              <ul>
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="job-detail-block">
              <h4>Requirements</h4>
              <ul>
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="job-deadline">
              ⏰ Application Deadline: <strong>{job.deadline}</strong>
            </div>
          </div>
        )}

        <div className="job-card-actions">
          <button
            className="job-toggle-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less ↑" : "View Details ↓"}
          </button>
          <button
            className="btn btn-orange job-apply-btn"
            onClick={() => onApply(job)}
          >
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("All");

  const departments = ["All", ...new Set(JOBS.map((j) => j.department))];
  const filtered =
    filter === "All" ? JOBS : JOBS.filter((j) => j.department === filter);

  return (
    <div className="jobs-page">
      {/* Hero */}
      <div className="jobs-hero">
        <div className="jobs-hero-overlay" />
        <div className="container jobs-hero-content">
          <span className="section-badge">CAREERS AT MIU</span>
          <h1>Jobs &amp; Careers</h1>
          <p>
            Join a team of passionate educators and professionals shaping the
            future of higher education in Northeast India.
          </p>
          <div className="jobs-hero-stats">
            <div>
              <strong>7+</strong>
              <span>Open Positions</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Departments</span>
            </div>
            <div>
              <strong>₹ 18K–75K</strong>
              <span>Salary Range</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container jobs-body">
        {/* Filter tabs */}
        <div className="jobs-filter-bar">
          {departments.map((d) => (
            <button
              key={d}
              className={`jobs-filter-btn ${filter === d ? "active" : ""}`}
              onClick={() => setFilter(d)}
            >
              {d === "All"
                ? `All (${JOBS.length})`
                : d.replace("School of ", "")}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="jobs-grid">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onApply={setSelectedJob} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="jobs-cta-box">
          <h3>Don't see a suitable opening?</h3>
          <p>
            Send your CV to <a href="mailto:hr@miu.edu.in">hr@miu.edu.in</a> and
            we'll keep you in mind for future opportunities.
          </p>
          <a href="mailto:hr@miu.edu.in" className="btn btn-orange">
            Send Your CV →
          </a>
        </div>
      </div>

      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
