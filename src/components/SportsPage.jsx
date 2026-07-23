import "@/styles/SportsPage.css";
import Link from "next/link";

export default function SportsPage() {
  const facilities = [
    {
      icon: "🏏",
      title: "Cricket Ground",
      desc: "A full cricket ground along with a net for practice purposes. ",
      color: "orange",
    },
    {
      icon: "⚽",
      title: "Football Field",
      desc: " A standard football ground for practices as well as playing the matches. ",
      color: "green",
    },
    {
      icon: "🏸",
      title: "Badminton Courts",
      desc: " Professional indoor badminton courts.",
      color: "blue",
    },
    {
      icon: "🏀",
      title: "Basketball Court",
      desc: "An outdoor basketball court.",
      color: "purple",
    },
    {
      icon: "🏋️",
      title: "Gymnasium",
      desc: "A fully equipped gymnasium.",
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
            The MIU encourages an active lifestyle through various types of
            sports and exercise programs.
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
              MIU arranges annual sports meet and competitions among departments
              and also takes part in inter university sports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
