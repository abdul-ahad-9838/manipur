"use client";

import React from "react";
import Link from "next/link";
import "@/styles/AcademicCouncil.css";
import "@/styles/IQAC.css";

const SECTIONS = [
  {
    icon: "🏛️",
    title: "Institutional Information",
    items: [
      {
        label: "Name of the University: Manipur International University (MIU)",
        href: "",
      },
      {
        label:
          "Establishment: Established under the Manipur International University Act, 2018 by the Government of Manipur",
        href: "",
      },
      {
        label:
          "Recognition: Recognised by the University Grants Commission (UGC) under Sections 2(f) and 22 of the UGC Act, 1956",
        href: "",
      },
      { label: "Type: State Private University", href: "" },
    ],
  },
  {
    icon: "⚖️",
    title: "Governance and Administration",
    intro:
      "MIU follows a structured governance framework to ensure efficient decision-making and academic excellence. Key bodies include:",
    items: [
      { label: "Board of Governors", href: "/about/governance" },
      { label: "Academic Council", href: "/about/academic-council" },
      { label: "Finance Committee", href: "" },
      { label: "Internal Quality Assurance Cell (IQAC)", href: "/about/iqac" },
    ],
    note: "These bodies function in accordance with statutory provisions and institutional policies.",
  },
  {
    icon: "🎓",
    title: "Academic Information",
    intro: "The University offers a wide range of:",
    items: [
      { label: "Undergraduate Programs", href: "" },
      { label: "Postgraduate Programs", href: "" },
      { label: "Diploma and Certificate Courses", href: "" },
      { label: "Doctoral (Ph.D.) Programs", href: "" },
      { label: "Skill and Vocational Programs", href: "" },
    ],
    note: "Details regarding program structure, eligibility, curriculum, and academic regulations are available on the website.",
  },
  {
    icon: "📋",
    title: "Admission and Fee Information",
    items: [
      {
        label:
          "Admission procedures are conducted as per University norms and regulatory guidelines",
        href: "",
      },
      {
        label: "Eligibility criteria vary by program and are clearly defined",
        href: "",
      },
      {
        label:
          "Fee structure for all programs is published and updated regularly",
        href: "",
      },
      {
        label:
          "Scholarship schemes and financial assistance options are available for eligible students",
        href: "",
      },
    ],
  },
  {
    icon: "👨‍🏫",
    title: "Faculty Information",
    intro:
      "MIU has qualified and experienced faculty members across disciplines. Information regarding faculty qualifications, experience, and departmental affiliations is made available for transparency.",
    items: [],
  },
  {
    icon: "🏢",
    title: "Infrastructure and Facilities",
    intro: "The University provides:",
    items: [
      { label: "Classrooms and laboratories", href: "" },
      { label: "Library and digital learning resources", href: "" },
      { label: "IT-enabled learning facilities", href: "" },
      { label: "Research and innovation support", href: "" },
      { label: "Student support services and campus amenities", href: "" },
    ],
  },
  {
    icon: "📝",
    title: "Examinations and Evaluation",
    items: [
      { label: "Transparent and systematic examination processes", href: "" },
      {
        label: "Continuous internal assessment and semester-end examinations",
        href: "",
      },
      { label: "Timely declaration of results", href: "" },
      {
        label:
          "Issuance of mark sheets, degrees, and certificates with appropriate security features",
        href: "",
      },
    ],
  },
  {
    icon: "✅",
    title: "Quality Assurance",
    intro:
      "MIU has established an Internal Quality Assurance Cell (IQAC) in accordance with NAAC guidelines to ensure continuous quality improvement in teaching, learning, research, and administration.",
    items: [],
  },
  {
    icon: "📜",
    title: "Policies and Regulations",
    intro: "The University publishes key policies, including:",
    items: [
      { label: "Admission Policy", href: "" },
      { label: "Examination Policy", href: "" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Scholarship Policy", href: "" },
      { label: "Anti-Ragging Policy", href: "/student-life/anti-ragging" },
      { label: "Grievance Redressal Mechanism", href: "" },
    ],
  },
  {
    icon: "🤝",
    title: "Student Support and Grievance Redressal",
    intro: "MIU ensures student welfare through:",
    items: [
      { label: "Academic counseling and mentoring", href: "" },
      { label: "Career guidance and placement support", href: "" },
      { label: "Grievance redressal system for students and staff", href: "" },
      { label: "Anti-ragging and disciplinary committees", href: "" },
    ],
  },
  {
    icon: "🏅",
    title: "Statutory Compliance",
    intro:
      "The University complies with all applicable regulations of statutory bodies and ensures adherence to national education policies and quality standards.",
    items: [],
  },
];

export default function PublicSelfDisclosurePage() {
  return (
    <div className="ac-page">
      {/* Hero */}
      <div className="ac-hero">
        <div className="container">
          <nav className="ac-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/about">About Us</Link>
            <span>›</span>
            <span>Public Self Disclosure</span>
          </nav>
          <span className="section-badge">TRANSPARENCY</span>
          <h1>Public Self-Disclosure</h1>
          <p>
            Manipur International University — Committed to Transparency &
            Accountability
          </p>
        </div>
      </div>

      <div className="container ac-body">
        {/* Overview */}
        <div className="ac-intro-card">
          <span
            className="section-badge"
            style={{ marginBottom: "12px", display: "inline-block" }}
          >
            OVERVIEW
          </span>
          <p className="ac-intro-text">
            Manipur International University (MIU) is committed to maintaining
            transparency, accountability, and good governance in all its
            academic and administrative functions. In line with the guidelines
            of regulatory authorities and best practices in higher education,
            the University provides comprehensive and up-to-date information in
            the public domain for the benefit of students, parents, faculty, and
            other stakeholders.
          </p>
          <p className="ac-intro-text" style={{ marginTop: "12px" }}>
            This Public Self-Disclosure section aims to ensure easy access to
            key institutional information, enabling informed decision-making and
            promoting trust among stakeholders.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="psd-grid">
          {SECTIONS.map((sec, i) => (
            <div key={i} className="iqac-list-card">
              <h3>
                {sec.icon} {sec.title}
              </h3>
              {sec.intro && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "#555",
                    fontWeight: 400,
                    textTransform: "none",
                    marginBottom: "10px",
                    lineHeight: 1.6,
                  }}
                >
                  {sec.intro}
                </p>
              )}
              {sec.items.length > 0 && (
                <ul>
                  {sec.items.map((item, j) => (
                    <li key={j}>
                      {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {sec.note && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "#888",
                    fontWeight: 400,
                    textTransform: "none",
                    marginTop: "10px",
                    fontStyle: "italic",
                  }}
                >
                  {sec.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="iqac-contact-card" style={{ marginTop: "32px" }}>
          <h3>📬 Contact Information</h3>
          <p>For further details or clarifications, please contact:</p>
          <p>
            <strong>Manipur International University (MIU)</strong>
            <br />
            Website:{" "}
            <a
              href="https://www.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.miu.edu.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
