import "@/styles/AdmissionProcess.css";
import Link from "next/link";

export default function AdmissionProcess() {
  const steps = [
    {
      num: "01",
      title: "Check Eligibility",
      desc: "Review the eligibility criteria for your desired program on our Programs page.",
    },
    {
      num: "02",
      title: "Fill Application Form",
      desc: "Complete the online application form with accurate personal and academic details.",
    },
    {
      num: "03",
      title: "Submit Documents",
      desc: "Upload required documents: 10th & 12th marksheets, ID proof, passport photo, and category certificate if applicable.",
    },
    {
      num: "04",
      title: "Entrance Test / Merit",
      desc: "Appear for the entrance test (if applicable) or qualify on merit basis as per program requirements.",
    },
    {
      num: "05",
      title: "Counselling & Seat Allotment",
      desc: "Attend counselling session and receive seat allotment based on merit and preference.",
    },
    {
      num: "06",
      title: "Fee Payment",
      desc: "Pay the admission fee within the stipulated time to confirm your seat.",
    },
    {
      num: "07",
      title: "Enrollment",
      desc: "Complete enrollment formalities and receive your student ID and academic schedule.",
    },
  ];

  const documents = [
    {
      icon: "📋",
      title: "10th & 12th Marksheets",
      desc: "Original and self-attested copies of your academic certificates.",
    },
    {
      icon: "🪪",
      title: "Identity Proof",
      desc: "Valid government ID - Aadhaar Card, Passport, or Voter ID.",
    },
    {
      icon: "📸",
      title: "Passport Photographs",
      desc: "Four recent passport size color photographs with white background.",
    },
    {
      icon: "📄",
      title: "Category Certificate",
      desc: "SC/ST/OBC/EWS certificate if applicable for reservation benefits.",
    },
  ];

  return (
    <div className="admission-process-page">
      {/* Hero */}
      <div className="ap-hero">
        <div className="ap-hero-content">
          <nav className="ap-breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep">›</span>
            <Link href="/admissions/process">Admissions</Link>
            <span className="bc-sep">›</span>
            <span>Admission Process</span>
          </nav>
          <span className="ap-badge">ADMISSIONS 2026</span>
          <h1>Your Journey Starts Here</h1>
          <p className="ap-hero-subtitle">
            A transparent, student-friendly admission process designed to make
            your enrollment seamless and stress-free.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="ap-body">
        {/* Steps Section */}
        <div className="ap-section">
          <div className="ap-section-header">
            <span className="ap-section-badge">STEP BY STEP</span>
            <h2 className="ap-section-title">Admission Process</h2>
            <p className="ap-section-subtitle">
              Follow these simple steps to secure your seat at MIU
            </p>
          </div>

          <div className="ap-timeline">
            {steps.map((step, i) => (
              <div key={i} className="ap-timeline-item">
                <div className="ap-timeline-marker">
                  <span className="ap-step-number">{step.num}</span>
                </div>
                <div className="ap-timeline-content">
                  <h3 className="ap-timeline-title">{step.title}</h3>
                  <p className="ap-timeline-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="ap-section ap-docs-section">
          <div className="ap-section-header">
            <span className="ap-section-badge">REQUIREMENTS</span>
            <h2 className="ap-section-title">Documents Checklist</h2>
            <p className="ap-section-subtitle">
              Keep these documents ready for a smooth application process
            </p>
          </div>

          <div className="ap-docs-grid">
            {documents.map((doc, i) => (
              <div key={i} className="ap-doc-card">
                <div className="ap-doc-icon-wrapper">
                  <span className="ap-doc-icon">{doc.icon}</span>
                </div>
                <h3 className="ap-doc-title">{doc.title}</h3>
                <p className="ap-doc-desc">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ap-cta">
          <div className="ap-cta-content">
            <h3>Ready to Begin Your Journey?</h3>
            <p>
              Join thousands of students who have transformed their future at
              Manipur International University.
            </p>
            <div className="ap-cta-buttons">
              <Link href="/contact" className="btn btn-orange">
                Get Started
              </Link>
              <Link href="/admissions/process" className="btn btn-outline">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
