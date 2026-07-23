import "@/styles/AdmissionProcess.css";
import Link from "next/link";

export default function AdmissionProcess() {
  const steps = [
    {
      num: "01",
      title: "Check Eligibility",
      desc: "Check the eligibility criteria of your program from our Programs page.",
    },
    {
      num: "02",
      title: "Application Form",
      desc: "Submit the online application form.",
    },
    {
      num: "03",
      title: "Document Upload",
      desc: "Upload the necessary documents including mark sheets of 10th & 12th, identification proof, passport-size photo and certificate for category if any.",
    },
    {
      num: "04",
      title: "Entrance Test / Merit",
      desc: "Clear the entrance test (if required) or merit yourself based on the criteria for your course.",
    },
    {
      num: "05",
      title: "Counselling & Seat Allotment",
      desc: "Participate in the counseling process and receive your seat allotment.",
    },
    {
      num: "06",
      title: "Fee Payment",
      desc: "Make payment of admission fee in the stipulated time.",
    },
    {
      num: "07",
      title: "Registration",
      desc: "Proceed with your registration and obtain your student ID. Documents to be Submitted",
    },
  ];

  const documents = [
    {
      icon: "📋",
      title: "Marksheet of 10th & 12th",
      desc: "Your original and attested copies of marksheets.",
    },
    {
      icon: "🪪",
      title: "Identitification Proof",
      desc: "A valid government-issued ID either the Aadhar card, Passport, or voter ID.",
    },
    {
      icon: "📸",
      title: "Passport Size Photographs",
      desc: "Four recent colored passport size photographs on a white background.",
    },
    {
      icon: "📄",
      title: "Category Certificate",
      desc: "If you come under any reserved category.",
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
            An open and transparent admission procedure aimed at making your
            admission a smooth sailing process.
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
              The following steps will get you admission in MIU.
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
