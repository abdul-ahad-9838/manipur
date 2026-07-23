import "@/styles/AdmissionRulesPage.css";
import Link from "next/link";

export default function AdmissionRulesPage() {
  const generalRules = [
    {
      icon: "📌",
      title: "Eligibility",
      desc: "Applicants must meet the minimum eligibility requirements as prescribed for different programs.",
      color: "orange",
    },
    {
      icon: "📄",
      title: "Document Verification",
      desc: "Original documents will have to be presented at the time of admission for documents verification.",
      color: "blue",
    },
    {
      icon: "⏳",
      title: "Provisional Admission",
      desc: "Admission is provisional till the complete process of verification of documents & payments of fees.",
      color: "green",
    },
    {
      icon: "⚠️",
      title: "Cancellation",
      desc: "Admission can be canceled if found that any of the information furnished is misleading or false.",
      color: "red",
    },
  ];

  const reservationPolicy = [
    {
      icon: "🏷️",
      title: "SC/ST Reservation",
      desc: "Seats reserved as per Government of Manipur reservation policy.",
      color: "orange",
    },
    {
      icon: "🏷️",
      title: "OBC Reservation",
      desc: "Other Backward Classes reservation as per applicable norms.",
      color: "blue",
    },
    {
      icon: "🏷️",
      title: "EWS Reservation",
      desc: "Economically Weaker Section reservation as per government guidelines.",
      color: "green",
    },
    {
      icon: "🏷️",
      title: "PwD Reservation",
      desc: "Persons with Disabilities reservation as per UGC guidelines.",
      color: "purple",
    },
  ];

  return (
    <div className="admission-rules-page">
      <div className="admission-rules-hero">
        <div className="container">
          <nav className="admission-rules-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/admissions/process">Admissions</Link>
            <span>›</span>
            <span>Rules for Admission</span>
          </nav>
          <span className="admission-rules-badge">ADMISSIONS</span>
          <h1>Rules for Admission</h1>
          <p className="admission-rules-hero-subtitle">
            Admission rules and regulations of Manipur International University.
          </p>
        </div>
      </div>

      <div className="admission-rules-body">
        <div className="container">
          {/* General Rules Section */}
          <div className="admission-rules-section">
            <div className="admission-rules-section-header">
              <span className="admission-rules-section-icon">📋</span>
              <div>
                <h2>General Rules</h2>
                <p className="admission-rules-section-subtitle">
                  Important Guidelines for Candidates
                </p>
              </div>
            </div>

            <div className="admission-rules-grid">
              {generalRules.map((rule, idx) => (
                <div
                  key={idx}
                  className={`admission-rule-card admission-rule-${rule.color}`}
                >
                  <div className="admission-rule-icon-wrapper">
                    <span className="admission-rule-icon">{rule.icon}</span>
                  </div>
                  <h3 className="admission-rule-title">{rule.title}</h3>
                  <p className="admission-rule-desc">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Policy Section */}
          <div className="admission-rules-section">
            <div className="admission-rules-section-header">
              <span className="admission-rules-section-icon">🎯</span>
              <div>
                <h2>Reservation Policy</h2>
                <p className="admission-rules-section-subtitle">
                  Seat Reservation as per Government Guidelines
                </p>
              </div>
            </div>

            <div className="admission-rules-grid">
              {reservationPolicy.map((policy, idx) => (
                <div
                  key={idx}
                  className={`admission-rule-card admission-rule-${policy.color}`}
                >
                  <div className="admission-rule-icon-wrapper">
                    <span className="admission-rule-icon">{policy.icon}</span>
                  </div>
                  <h3 className="admission-rule-title">{policy.title}</h3>
                  <p className="admission-rule-desc">{policy.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code of Conduct Card */}
          <div className="admission-conduct-card">
            <div className="admission-conduct-header">
              <span className="admission-conduct-icon">⚖️</span>
              <h2>Code of Conduct</h2>
            </div>
            <p>
              All admitted students are expected to follow the university code
              of conduct, uphold academic integrity and treat fellow students,
              faculty and staff with respect. Any violation of these standards
              may result in disciplinary action, including suspension or
              expulsion.
            </p>
          </div>

          {/* Important Notice */}
          <div className="admission-notice-card">
            <div className="admission-notice-icon">ℹ️</div>
            <div className="admission-notice-content">
              <h3>Important Notice</h3>
              <p>
                The University reserves the right to revise its admission rules
                and regulation as pre the requirements. For updated information,
                please get in touch with the university at
                <a href="mailto:admission@miu.edu.in">admission@miu.edu.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
