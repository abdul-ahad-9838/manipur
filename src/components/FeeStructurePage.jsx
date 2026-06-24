import "@/styles/FeeStructurePage.css";
import Link from "next/link";

export default function FeeStructurePage() {
  const ugPrograms = [
    {
      icon: "📊",
      title: "B.Com / B.Com (Hons)",
      fee: "Contact Admissions",
      duration: "3 Years",
      color: "orange",
    },
    {
      icon: "💻",
      title: "BCA",
      fee: "Contact Admissions",
      duration: "3 Years",
      color: "blue",
    },
    {
      icon: "⚙️",
      title: "B.Tech",
      fee: "Contact Admissions",
      duration: "4 Years",
      color: "green",
    },
    {
      icon: "🏢",
      title: "BBA",
      fee: "Contact Admissions",
      duration: "3 Years",
      color: "purple",
    },
    {
      icon: "🔬",
      title: "B.Sc (All Streams)",
      fee: "Contact Admissions",
      duration: "3 Years",
      color: "red",
    },
  ];

  const pgPrograms = [
    {
      icon: "💹",
      title: "M.Com",
      fee: "Contact Admissions",
      duration: "2 Years",
      color: "orange",
    },
    {
      icon: "🖥️",
      title: "MCA",
      fee: "Contact Admissions",
      duration: "2 Years",
      color: "blue",
    },
    {
      icon: "👔",
      title: "MBA",
      fee: "Contact Admissions",
      duration: "2 Years",
      color: "green",
    },
    {
      icon: "🔬",
      title: "M.Sc / M.Tech",
      fee: "Contact Admissions",
      duration: "2 Years",
      color: "purple",
    },
  ];

  return (
    <div className="fee-page">
      <div className="fee-hero">
        <div className="container">
          <nav className="fee-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/admissions">Admissions</Link>
            <span>›</span>
            <span>Fee Structure</span>
          </nav>
          <span className="fee-badge">ADMISSIONS</span>
          <h1>Fee Structure</h1>
          <p className="fee-hero-subtitle">
            Transparent and affordable fee structure for all programs at Manipur
            International University.
          </p>
        </div>
      </div>

      <div className="fee-body">
        <div className="container">
          {/* Introduction */}
          <div className="fee-intro-card">
            <div className="fee-intro-icon">💰</div>
            <h2>Fee Structure 2026–27</h2>
            <p>
              The fee structure at MIU is designed to be affordable while
              maintaining the highest standards of education. Fees are approved
              by the competent authority and are subject to revision as per
              regulatory guidelines.
            </p>
          </div>

          {/* Undergraduate Programs */}
          <div className="fee-section">
            <div className="fee-section-header">
              <span className="fee-section-icon">🎓</span>
              <div>
                <h2>Undergraduate Programs</h2>
                <p className="fee-section-subtitle">
                  Bachelor's Degree Programs
                </p>
              </div>
            </div>

            <div className="fee-programs-grid">
              {ugPrograms.map((program, idx) => (
                <div
                  key={idx}
                  className={`fee-program-card fee-${program.color}`}
                >
                  <div className="fee-program-icon-wrapper">
                    <span className="fee-program-icon">{program.icon}</span>
                  </div>
                  <h3 className="fee-program-title">{program.title}</h3>
                  <div className="fee-program-details">
                    <div className="fee-detail-item">
                      <span className="fee-detail-label">Annual Fee</span>
                      <span className="fee-detail-value">{program.fee}</span>
                    </div>
                    <div className="fee-detail-divider"></div>
                    <div className="fee-detail-item">
                      <span className="fee-detail-label">Duration</span>
                      <span className="fee-detail-value">
                        {program.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Postgraduate Programs */}
          <div className="fee-section">
            <div className="fee-section-header">
              <span className="fee-section-icon">🎯</span>
              <div>
                <h2>Postgraduate Programs</h2>
                <p className="fee-section-subtitle">Master's Degree Programs</p>
              </div>
            </div>

            <div className="fee-programs-grid">
              {pgPrograms.map((program, idx) => (
                <div
                  key={idx}
                  className={`fee-program-card fee-${program.color}`}
                >
                  <div className="fee-program-icon-wrapper">
                    <span className="fee-program-icon">{program.icon}</span>
                  </div>
                  <h3 className="fee-program-title">{program.title}</h3>
                  <div className="fee-program-details">
                    <div className="fee-detail-item">
                      <span className="fee-detail-label">Annual Fee</span>
                      <span className="fee-detail-value">{program.fee}</span>
                    </div>
                    <div className="fee-detail-divider"></div>
                    <div className="fee-detail-item">
                      <span className="fee-detail-label">Duration</span>
                      <span className="fee-detail-value">
                        {program.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="fee-scholarship-card">
            <div className="fee-scholarship-header">
              <span className="fee-scholarship-icon">🏆</span>
              <h2>Scholarships & Fee Waivers</h2>
            </div>
            <p>
              MIU offers merit-based scholarships and need-based financial
              assistance to deserving students. We believe that financial
              constraints should not hinder quality education.
            </p>
            <div className="fee-scholarship-actions">
              <a href="mailto:admission@miu.edu.in" className="btn btn-primary">
                Contact for Details
              </a>
            </div>
          </div>

          {/* Contact Note */}
          <div className="fee-contact-note">
            <div className="fee-contact-icon">📞</div>
            <div className="fee-contact-content">
              <h3>Need More Information?</h3>
              <p>
                For detailed fee structure and payment plans, please contact the
                Admissions Office at{" "}
                <a href="mailto:admission@miu.edu.in">admission@miu.edu.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
