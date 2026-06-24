import "@/styles/SportsPage.css";
import Link from "next/link";

export default function SportsPage() {
  const facilities = [
    {
      icon: "🏏",
      title: "Cricket Ground",
      desc: "Full-size cricket ground with practice nets.",
      color: "orange",
    },
    {
      icon: "⚽",
      title: "Football Field",
      desc: "Standard football field for matches and practice.",
      color: "green",
    },
    {
      icon: "🏸",
      title: "Badminton Courts",
      desc: "Indoor badminton courts with professional flooring.",
      color: "blue",
    },
    {
      icon: "🏀",
      title: "Basketball Court",
      desc: "Outdoor basketball court for recreational and competitive play.",
      color: "purple",
    },
    {
      icon: "🏋️",
      title: "Gymnasium",
      desc: "Well-equipped gymnasium for fitness training.",
      color: "red",
    },
  ];

  return (
    <div className="sports-page">
      <div className="sports-hero">
        <div className="container">
          <nav className="sports-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/student-life">Student Life</Link>
            <span>›</span>
            <span>Sports</span>
          </nav>
          <span className="sports-badge">STUDENT LIFE</span>
          <h1>Sports & Athletics</h1>
          <p className="sports-hero-subtitle">
            MIU promotes a healthy and active lifestyle through a wide range of
            sports and physical activities.
          </p>
        </div>
      </div>

      <div className="sports-body">
        <div className="container">
          <div className="sports-facilities-grid">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className={`sports-facility-card sports-${facility.color}`}
              >
                <div className="sports-facility-icon-wrapper">
                  <span className="sports-facility-icon">{facility.icon}</span>
                </div>
                <h3 className="sports-facility-title">{facility.title}</h3>
                <p className="sports-facility-desc">{facility.desc}</p>
              </div>
            ))}
          </div>

          <div className="sports-programs-card">
            <div className="sports-programs-header">
              <span className="sports-programs-icon">🏆</span>
              <h2>Sports Programs</h2>
            </div>
            <p>
              MIU organizes annual sports meets, inter-department tournaments,
              and participates in inter-university competitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
