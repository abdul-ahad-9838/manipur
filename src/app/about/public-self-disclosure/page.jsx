import "@/styles/AcademicCouncil.css";
import "@/styles/IQAC.css";
import "@/styles/SimplePage.css";
import Link from "next/link";

const SECTIONS = [
  {
    icon: "🏛️",
    title: "Institutional Information",
    items: [
      {
        label:
          "Institutional information: Manipur International University (MIU)",
        href: "/about",
      },
      {
        label:
          "Date of Establishment: Manipur International University was established under the Manipur International University Act, 2018 by the Governments of Manipur.",
        href: "/about/affiliations-accreditation",
      },
      {
        label:
          "Recognition: MIU is recognized by University Grant Commission (UGC) under Sections 2(f) and 22 of the UGC Act, 1956.",
        href: "/about/affiliations-accreditation",
      },
      { label: "Type: State Private University", href: "/about" },
    ],
  },
  {
    icon: "⚖️",
    title: "Governance and Administration",
    intro:
      "There are various committees/governing bodies in the university that govern the academic/administrative affairs of the university.Some of these committees are:",
    items: [
      { label: "Board of Governors", href: "/about/governance" },
      { label: "Academic Council", href: "/about/academic-council" },
      { label: "Finance Committee", href: "" },
      { label: "Internal Quality Assurance Cell (IQAC)", href: "/about/iqac" },
    ],
    note: "These committees function as per the rules and regulations of the university.",
  },

  {
    icon: "🎓",
    title: "Academic Programs",
    intro: "MIU offers diverse academic programs, which include the following:",
    items: [
      { label: "UG Programs", href: "" },
      { label: "PG Programs", href: "" },
      { label: "Diploma and Certificate Courses", href: "" },
      { label: "Ph.D. Programs", href: "" },

      {
        label: "Skill and Vocational Programs",
        href: "https://vocational.miu.edu.in/",
      },
    ],
    note: "Details about eligibility, course structure and academic regulations are available on the university website.",
  },

  {
    icon: "📋",
    title: "Admission and Fee",
    items: [
      {
        label:
          "Admission for all programs is conducted according to the University rules",
        href: "/admissions/process",
      },
      {
        label:
          "Eligibility requirements for each program are published and updated regularly",
        href: "/admissions/process",
      },
      {
        label: "The fee structure for all courses is available on the website",
        href: "",
      },
      {
        label:
          "Scholarship and financial assistance are offered to eligible students",
        href: "",
      },
    ],
  },

  {
    icon: "👨‍🏫",
    title: "Faculty",
    intro:
      "The University has qualified and experienced faculty members from different academic fields. Information about faculty qualifications and departments is available on the website.",
    items: [],
  },

  {
    icon: "🏫",
    title: "Campus Facilities",
    intro:
      "MIU provides facilities to support learning and students life, including:",
    items: [
      { label: "Classrooms and Laboratories", href: "" },
      { label: "Library and Digital Learning Resources", href: "" },
      { label: "Computer and IT Facilities", href: "" },
      { label: "Research and Innovation Support", href: "" },
    ],
  },
  {
    icon: "👨‍💼",
    title: "Students Support Services",
    intro:
      "MIU offers comprehensive support services to enhance the overall student experience, including:",
    items: [
      { label: "Academic Counseling", href: "" },
      { label: "Career Guidance", href: "" },
      { label: "Mental Health and Wellness", href: "" },
      { label: "Student Grievance Redressal", href: "" },
    ],
  },

  {
    icon: "📝",
    title: "Examinations",
    intro:
      "The university follows a fair and transparent examination system. Internal assessments and semester examinations are conducted with the following features:",
    items: [
      { label: "Fair and transparent examination processes", href: "" },
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
      "The Internal Quality Assurance  Cell (IQAC) works to improve the quality of teaching, learning, research and other academic activities.",
    items: [],
  },

  {
    icon: "📜",
    title: "Policies",
    intro: "The university publishes important policies including:",
    items: [
      { label: "Admission Policy", href: "" },
      { label: "Examination Policy", href: "" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Scholarship Policy", href: "" },
      { label: "Anti-Ragging Policy", href: "/student-life/anti-ragging" },
      {
        label: "Grievance Redressal Mechanism",
        href: "/student-life/grievance-cell",
      },
    ],
  },

  {
    icon: "🤝",
    title: "Students Support",
    intro: "MIU ensures student welfare through:",
    items: [
      { label: "Academic counseling and mentoring", href: "" },
      { label: "Career guidance and placement support", href: "" },
      {
        label: "Grievance redressal system for students and staff",
        href: "/student-life/grievance-cell",
      },
      {
        label: "Anti-ragging and disciplinary committees",
        href: "/student-life/anti-ragging",
      },
    ],
  },

  {
    icon: "🏅",
    title: "Statutory Compliance",
    intro:
      "The university follows the rules and guidance issued by the UGC and other statutory bodies. It also complies with national education policies and maintains the required academic standards. ",
    items: [],
  },
];

export default function PublicSelfDisclosurePage() {
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
            <span>Public Self Disclosure</span>
          </nav>

          <span className="simple-badge">TRANSPARENCY</span>

          <h1 className="simple-title">Public Self-Disclosure</h1>

          <p className="simple-subtitle">
            Manipur International University — Committed to Transparency &amp;
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
            Manipur International University (MIU) is dedicated to transparency
            and sound governance. MIU provides vital information related to the
            institution for the benefit of students, parents, faculty, and other
            interested stakeholders.
          </p>
          <p className="ac-intro-text" style={{ marginTop: "12px" }}>
            Below is the information related to the institution, its academic
            programs, policies, facilities and services.
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
