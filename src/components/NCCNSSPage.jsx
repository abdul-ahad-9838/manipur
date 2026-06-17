import React from "react";
import Link from "next/link";
import "@/styles/NCCNSSPage.css";

export default function NCCNSSPage() {
  const nccActivities = [
    {
      icon: "🎖️",
      title: "Annual Training Camps",
      desc: "Regular training camps for physical fitness, drill, and military skills.",
    },
    {
      icon: "🤝",
      title: "Community Service",
      desc: "Social service activities including blood donation camps and disaster relief.",
    },
  ];

  return (
    <div className="ncc-page">
      <div className="ncc-hero">
        <div className="container">
          <nav className="ncc-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/student-life">Student Life</Link>
            <span>›</span>
            <span>NCC / NSS</span>
          </nav>
          <span className="ncc-badge">STUDENT LIFE</span>
          <h1>NCC / NSS</h1>
          <p className="ncc-hero-subtitle">
            Building disciplined, socially responsible citizens through NCC and
            NSS programs at MIU.
          </p>
        </div>
      </div>

      <div className="ncc-body">
        <div className="container">
          {/* NCC Section */}
          <div className="ncc-section-card">
            <div className="ncc-section-header">
              <span className="ncc-section-icon">🎖️</span>
              <div>
                <h2>National Cadet Corps (NCC)</h2>
                <p className="ncc-section-subtitle">Unity and Discipline</p>
              </div>
            </div>
            <p className="ncc-section-desc">
              The NCC unit at MIU provides students with military training,
              discipline, and leadership skills. NCC cadets participate in
              camps, parades, and social service activities.
            </p>
          </div>

          {/* NCC Activities */}
          <div className="ncc-activities-section">
            <h3 className="ncc-subsection-title">NCC Activities</h3>
            <div className="ncc-activities-grid">
              {nccActivities.map((activity, idx) => (
                <div key={idx} className="ncc-activity-card">
                  <div className="ncc-activity-icon-wrapper">
                    <span className="ncc-activity-icon">{activity.icon}</span>
                  </div>
                  <h4 className="ncc-activity-title">{activity.title}</h4>
                  <p className="ncc-activity-desc">{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NSS Section */}
          <div className="nss-section-card">
            <div className="nss-section-header">
              <span className="nss-section-icon">🤝</span>
              <div>
                <h2>National Service Scheme (NSS)</h2>
                <p className="nss-section-subtitle">Not Me, But You</p>
              </div>
            </div>
            <p className="nss-section-desc">
              The NSS unit at MIU engages students in community service and
              social development activities including health camps, literacy
              programs, and environmental campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
