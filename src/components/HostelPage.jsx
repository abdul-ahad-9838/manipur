import "@/styles/HostelPage.css";
import Link from "next/link";

export default function HostelPage() {
  const facilities = [
    {
      icon: "🏠",
      title: "Separate Hostels",
      desc: "Separate well-maintained hostels for boys and girls with 24/7 security.",
      color: "orange",
    },
    {
      icon: "🍽️",
      title: "Mess & Dining",
      desc: "Hygienic and nutritious meals served in the hostel mess.",
      color: "green",
    },
    {
      icon: "📶",
      title: "Wi-Fi Connectivity",
      desc: "High-speed internet connectivity throughout the hostel premises.",
      color: "blue",
    },
    {
      icon: "🔒",
      title: "24/7 Security",
      desc: "Round-the-clock security with CCTV surveillance for student safety.",
      color: "red",
    },
  ];

  return (
    <div className="hostel-page">
      {/* Hero */}
      <div className="hostel-hero">
        <div className="container">
          <nav className="hostel-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/student-life">Student Life</Link>
            <span>›</span>
            <span>Hostel</span>
          </nav>
          <span className="hostel-badge">STUDENT LIFE</span>
          <h1>Hostel Facilities</h1>
          <p className="hostel-hero-subtitle">
            Safe, comfortable, and affordable residential facilities for MIU
            students.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="hostel-body">
        <div className="container">
          {/* Facilities Grid */}
          <div className="hostel-facilities-grid">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className={`hostel-facility-card hostel-${facility.color}`}
              >
                <div className="hostel-facility-icon-wrapper">
                  <span className="hostel-facility-icon">{facility.icon}</span>
                </div>
                <h3 className="hostel-facility-title">{facility.title}</h3>
                <p className="hostel-facility-desc">{facility.desc}</p>
                <div className="hostel-facility-accent"></div>
              </div>
            ))}
          </div>

          {/* Admission Info */}
          <div className="hostel-admission-section">
            <div className="hostel-admission-card">
              <div className="hostel-admission-header">
                <span className="hostel-admission-icon">🎓</span>
                <h2>Hostel Admission</h2>
              </div>
              <div className="hostel-admission-content">
                <p>
                  Hostel accommodation is allotted on a{" "}
                  <strong>first-come, first-served basis</strong> subject to
                  availability.
                </p>
                <p>
                  Contact the <strong>Student Affairs Office</strong> for
                  hostel-related queries.
                </p>
              </div>
              <div className="hostel-admission-actions">
                <Link href="/contact" className="btn btn-orange">
                  Contact Student Affairs →
                </Link>
              </div>
            </div>
          </div>

          {/* Features Banner */}
          <div className="hostel-features-banner">
            <div className="hostel-feature-item">
              <span className="hostel-feature-icon">✓</span>
              <div>
                <h4>Affordable</h4>
                <p>Budget-friendly accommodation</p>
              </div>
            </div>
            <div className="hostel-feature-item">
              <span className="hostel-feature-icon">✓</span>
              <div>
                <h4>Comfortable</h4>
                <p>Well-furnished rooms</p>
              </div>
            </div>
            <div className="hostel-feature-item">
              <span className="hostel-feature-icon">✓</span>
              <div>
                <h4>Safe</h4>
                <p>24/7 security & CCTV</p>
              </div>
            </div>
            <div className="hostel-feature-item">
              <span className="hostel-feature-icon">✓</span>
              <div>
                <h4>Connected</h4>
                <p>High-speed Wi-Fi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
