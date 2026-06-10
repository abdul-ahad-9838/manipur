"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/IQAC.css";
import "@/styles/AcademicCouncil.css";
// import "@/styles/SimplePage.css";

const DEFAULT = {
  title: "Internal Quality Assurance Cell (IQAC)",
  subtitle: "Manipur International University",
  established: "8th May 2021",
  regulationsUrl: "",
  about:
    "The Internal Quality Assurance Cell (IQAC) of Manipur International University (MIU) is established in accordance with the guidelines of the National Assessment and Accreditation Council (NAAC). The IQAC functions as a facilitative and participative unit, driving quality enhancement through continuous and systematic efforts. The Cell works towards institutionalizing a culture of quality by developing structured processes for planning, monitoring, and evaluating academic and administrative performance.",
  vision:
    "To ensure continuous quality enhancement and sustain excellence in higher education through innovation, accountability, and best practices, in alignment with NAAC quality benchmarks.",
  mission: [
    "To develop a robust system for quality assurance in line with NAAC accreditation criteria",
    "To promote learner-centric teaching-learning methodologies and outcome-based education (OBE)",
    "To strengthen research, innovation, and extension activities",
    "To ensure transparency, accountability, and efficiency in institutional processes",
    "To foster a culture of continuous improvement and quality sustenance",
  ],
  objectives: [
    "To establish and apply quality benchmarks and parameters for various academic and administrative activities",
    "To facilitate the creation of a learner-centric environment conducive to quality education",
    "To ensure adherence to NAAC's seven criteria for institutional assessment",
    "To develop a system for data collection, analysis, and validation (DVV)",
    "To document and maintain institutional data for AQAR (Annual Quality Assurance Report) and SSR (Self Study Report)",
  ],
  functions: [
    "Development and application of quality benchmarks in academic and administrative domains",
    "Regular collection and analysis of feedback from stakeholders (students, faculty, alumni, employers)",
    "Conduct of academic and administrative audits (AAA)",
    "Preparation and submission of AQAR and support for NAAC accreditation processes",
    "Promotion of research, innovation, and best practices",
    "Organization of seminars, workshops, and faculty development programs",
    "Monitoring of institutional performance based on Key Performance Indicators (KPIs)",
  ],
  keyActivities: [
    "Implementation of Outcome-Based Education (OBE) framework",
    "Quality enhancement initiatives in teaching, learning, and evaluation",
    "Faculty development and capacity-building programs",
    "Student satisfaction surveys (SSS) and feedback analysis",
    "Promotion of research publications, patents, and innovation",
    "Documentation of best practices and institutional distinctiveness",
  ],
  composition: [
    "Chairperson (Head of the Institution)",
    "Senior Administrative Officers",
    "Faculty Members from various departments",
    "External Experts (Academia/Industry)",
    "Representatives from Industry and Employers",
    "Student Representatives",
    "Alumni Members",
    "IQAC Coordinator",
  ],
  studentBenefits: [
    "Enhanced quality of teaching and learning",
    "Transparent and continuous evaluation system",
    "Exposure to research, innovation, and skill-based education",
    "Improved academic support and career readiness",
    "Participation in feedback and quality improvement processes",
  ],
  members: [
    {
      role: "Coordinator",
      name: "Prof. I. Tomba Singh",
      detail: "IQAC Coordinator",
      contact: "+91-9862275312",
      email: "",
    },
    {
      role: "Joint Coordinator",
      name: "Dr. Senjam Jinus Singh",
      detail: "Joint Coordinator",
      contact: "+91-6009073533",
      email: "",
    },
    {
      role: "Eminent Academician",
      name: "Prof. S. Shekhar Sharma",
      detail:
        "Director – South Asian Institute of Agricultural Management (SAIRAM), Imphal",
      contact: "",
      email: "",
    },
    {
      role: "Industry Representative",
      name: "Prof. N. Irabanta Singh",
      detail:
        "Former Director, Institute for Social and Economic Change (ISEC)",
      contact: "",
      email: "",
    },
    {
      role: "Management",
      name: "Dr. Chandibai Potsangbam",
      detail: "Management Representative",
      contact: "",
      email: "",
    },
    {
      role: "Non-Teaching Staff",
      name: "Mr. Tony Singh",
      detail: "Examination Staff",
      contact: "",
      email: "",
    },
    {
      role: "Controller",
      name: "Prof. T. Kamalabati Devi",
      detail: "Controller of Examinations",
      contact: "",
      email: "",
    },
    {
      role: "Student Representative",
      name: "Elangbam Monika Devi",
      detail: "Research Scholar — Reg No: MIU/PHD/2022/W081825",
      contact: "8850052",
      email: "",
    },
    {
      role: "Student Representative",
      name: "Mangalleima Moirangthem",
      detail: "Research Scholar — Reg No: MIU/PHD/2021/Z31A",
      contact: "9774192504",
      email: "",
    },
    {
      role: "Parent Representative",
      name: "Mr. Elangbam Jayenta Singh",
      detail: "Student's Parent",
      contact: "9233129633",
      email: "",
    },
    {
      role: "Parent Representative",
      name: "Moirangthem Tarachand Meitei",
      detail: "Student's Parent",
      contact: "9774987846",
      email: "",
    },
  ],
};

export default function IQACPage() {
  const [d, setD] = useState(DEFAULT);

  useEffect(() => {
    API.get("/settings/iqac")
      .then(({ data }) => {
        if (data?.content) setD((prev) => ({ ...prev, ...data.content }));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="ac-page">
      {/* Hero */}
      <div className="simple-hero">
        <div className="container">
          <nav className="simple-breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span className="bc-sep">›</span>
            <span>
              <Link href="/about">About Us</Link>
            </span>
            <span className="bc-sep">›</span>
            <span>
              <Link href="/about/governance">Governance</Link>
            </span>
            <span className="bc-sep">›</span>
            <span>IQAC</span>
          </nav>

          <span className="simple-badge">GOVERNANCE</span>

          <h1 className="simple-title">{d.title}</h1>

          <p className="simple-subtitle">{d.subtitle}</p>
        </div>
      </div>

      <div className="container ac-body">
        {/* About + Vision */}
        <div className="iqac-top-grid">
          <div className="ac-intro-card" style={{ margin: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <span
                  className="section-badge"
                  style={{ marginBottom: "8px", display: "inline-block" }}
                >
                  ABOUT IQAC
                </span>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#888",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    textTransform: "none",
                  }}
                >
                  Established: {d.established}
                </p>
              </div>
              {d.regulationsUrl && (
                <a
                  href={d.regulationsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ac-download-btn"
                >
                  📄 Download IQAC Regulations
                </a>
              )}
            </div>
            <p className="ac-intro-text">{d.about}</p>
          </div>

          <div className="iqac-vision-card">
            <div className="iqac-vision-icon">🎯</div>
            <h3>Vision</h3>
            <p>{d.vision}</p>
          </div>
        </div>

        {/* Mission & Objectives */}
        <div className="iqac-two-col" style={{ marginTop: "32px" }}>
          <div className="iqac-list-card">
            <h3>📌 Mission</h3>
            <ul>
              {(d.mission || []).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="iqac-list-card">
            <h3>🎯 Objectives</h3>
            <ul>
              {(d.objectives || []).map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Functions & Key Activities */}
        <div className="iqac-two-col" style={{ marginTop: "24px" }}>
          <div className="iqac-list-card">
            <h3>⚙️ Functions of IQAC</h3>
            <ul>
              {(d.functions || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="iqac-list-card">
            <h3>🚀 Key Activities</h3>
            <ul>
              {(d.keyActivities || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Composition & Student Benefits */}
        <div className="iqac-two-col" style={{ marginTop: "24px" }}>
          <div className="iqac-list-card">
            <h3>👥 Composition of IQAC</h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginBottom: "12px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              As per NAAC guidelines, the IQAC at MIU comprises:
            </p>
            <ul>
              {(d.composition || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="iqac-list-card">
            <h3>🎓 Benefits for Students</h3>
            <ul>
              {(d.studentBenefits || []).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Members */}
        <div className="ac-section" style={{ marginTop: "32px" }}>
          <h2 className="ac-section-title">IQAC Team Members</h2>
          <div className="iqac-members-grid">
            {(d.members || []).map((m, i) => (
              <div key={i} className="iqac-member-card">
                <div className="iqac-member-role">{m.role}</div>
                <h3 className="iqac-member-name">{m.name}</h3>
                <p className="iqac-member-detail">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="iqac-contact-card" style={{ marginTop: "32px" }}>
          <h3>📬 Contact Information</h3>
          <p>
            For further information or queries related to IQAC, please contact:
          </p>
          <p>
            <strong>Internal Quality Assurance Cell (IQAC)</strong>
            <br />
            Manipur International University
            <br />
            Website:{" "}
            <a
              href="https://miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              miu.edu.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
