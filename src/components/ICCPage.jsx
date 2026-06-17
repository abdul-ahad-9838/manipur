import React from "react";
import Link from "next/link";
import "@/styles/ICCPage.css";

export default function ICCPage() {
  const mandates = [
    {
      icon: "🛡️",
      title: "Prevention",
      desc: "Proactive measures to prevent sexual harassment through awareness programs.",
      color: "blue",
    },
    {
      icon: "⚖️",
      title: "Prohibition",
      desc: "Strict prohibition of any form of sexual harassment within the university premises.",
      color: "red",
    },
    {
      icon: "📋",
      title: "Redressal",
      desc: "Fair and time-bound inquiry process for complaints received by the committee.",
      color: "green",
    },
  ];

  return (
    <div className="icc-page">
      <div className="icc-hero">
        <div className="container">
          <nav className="icc-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/student-life">Student Life</Link>
            <span>›</span>
            <span>Internal Complaints Committee</span>
          </nav>
          <span className="icc-badge">STUDENT LIFE</span>
          <h1>Internal Complaints Committee</h1>
          <p className="icc-hero-subtitle">
            MIU is committed to providing a safe, respectful, and
            harassment-free environment for all.
          </p>
        </div>
      </div>

      <div className="icc-body">
        <div className="container">
          <div className="icc-about-card">
            <span className="icc-about-icon">ℹ️</span>
            <h2>About ICC</h2>
            <p>
              The Internal Complaints Committee (ICC) at MIU is constituted as
              per the Sexual Harassment of Women at Workplace (Prevention,
              Prohibition and Redressal) Act, 2013.
            </p>
          </div>

          <div className="icc-mandate-section">
            <h2 className="icc-section-title">Our Mandate</h2>
            <div className="icc-mandate-grid">
              {mandates.map((mandate, idx) => (
                <div
                  key={idx}
                  className={`icc-mandate-card icc-${mandate.color}`}
                >
                  <div className="icc-mandate-icon-wrapper">
                    <span className="icc-mandate-icon">{mandate.icon}</span>
                  </div>
                  <h3 className="icc-mandate-title">{mandate.title}</h3>
                  <p className="icc-mandate-desc">{mandate.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="icc-contact-card">
            <div className="icc-contact-header">
              <span className="icc-contact-icon">📞</span>
              <h2>Contact ICC</h2>
            </div>
            <p>
              For ICC-related matters, contact the Presiding Officer at the
              Student Affairs Office or email{" "}
              <strong>admission@miu.edu.in</strong> with subject{" "}
              <strong>"ICC Complaint"</strong>.
            </p>
            <div className="icc-contact-actions">
              <Link href="/contact" className="btn btn-orange">
                Contact Student Affairs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
