import "@/styles/HostelPage.css";
import Link from "next/link";

export default function HostelPage() {
  const facilities = [
    {
      icon: "🏠",
      title: "Dedicated Hostels",
      desc: "Well-kept hostels for both males and females with round-the-clock security.",
      color: "orange",
    },
    {
      icon: "🍽️",
      title: "Mess Services",
      desc: "Nutrition food services at the hostel's mess.",
      color: "green",
    },
    {
      icon: "📶",
      title: "Internet Facilities",
      desc: "Fast internet facility at the hostel's premises.",
      color: "blue",
    },
    {
      icon: "🔒",
      title: "Security",
      desc: "Round the clock security at the hostels with CCTV camera surveillance.",
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
            Safe, comfortable and economical accommodation facilities for MIU
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
                  Hostel accommodation is on a first come first basis
                  <strong>first-come, first-served basis</strong>as per
                  availability.
                </p>
                <p>
                  Contact the <strong>Students Affairs Departments</strong> for
                  hostel related information.
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
