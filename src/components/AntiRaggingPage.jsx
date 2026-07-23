import "@/styles/AntiRaggingPage.css";
import Link from "next/link";

export default function AntiRaggingPage() {
  const helplines = [
    {
      icon: "📞",
      title: "UGC Anti-Ragging Helpline",
      desc: "1800-180-5522 (Toll Free, 24×7)",
      color: "red",
    },
    {
      icon: "📞",
      title: "MIU Anti-Ragging Helpline",
      desc: "+91 9319727766",
      color: "orange",
    },
    { icon: "✉️", title: "Email", desc: "support@miu.edu.in", color: "blue" },
    {
      icon: "🌐",
      title: "Online Portal",
      desc: "www.antiragging.in",
      color: "green",
    },
  ];

  return (
    <div className="ar-page">
      <div className="ar-hero">
        <div className="container">
          <nav className="ar-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/student-life">Student Life</Link>
            <span>›</span>
            <span>Anti-Ragging Cell</span>
          </nav>
          <span className="ar-badge">STUDENT LIFE</span>
          <h1>Anti-Ragging Cell</h1>
          <p className="ar-hero-subtitle">
            MIU follows a strict “no ragging” policy at all times.
          </p>
        </div>
      </div>

      <div className="ar-body">
        <div className="container">
          <div className="ar-commitment-card">
            <span className="ar-commitment-icon">🛡️</span>
            <h2>Our Stand</h2>
            <p>
              Manipur International University remains determined to offer a
              ragging free university. Ragging in all forms-physics, verbal,
              psychological, cyber is strictly forbidden. Penalties
            </p>
          </div>

          <div className="ar-consequences-card">
            <span className="ar-consequences-icon">⚠️</span>
            <h2>Consequences</h2>
            <p>
              Students who are guilty of ragging will have to face penalties
              like suspension, expulsion, withholding of results, and even legal
              actions.
            </p>
          </div>

          <div className="ar-report-section">
            <h2 className="ar-section-title">Report Ragging</h2>
            <p className="ar-section-subtitle">
              If you become a victim of ragging, please report instantly through
              the following means
            </p>

            <div className="ar-helplines-grid">
              {helplines.map((helpline, idx) => (
                <div
                  key={idx}
                  className={`ar-helpline-card ar-${helpline.color}`}
                >
                  <div className="ar-helpline-icon-wrapper">
                    <span className="ar-helpline-icon">{helpline.icon}</span>
                  </div>
                  <h3 className="ar-helpline-title">{helpline.title}</h3>
                  <p className="ar-helpline-desc">{helpline.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
