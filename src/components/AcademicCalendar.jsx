import Link from "next/link";
// import API from "@/lib/api";
import "@/styles/AcademicCalendar.css";

// Default data as fallback
const defaultData = {
  academicYear: "2026-27",
  semesters: [
    {
      title: "Odd Semester",
      period: "July – November",
      icon: "📚",
      color: "orange",
      events: [
        {
          label: "Classes Commence",
          date: "July 2026",
          icon: "🎓",
        },
        {
          label: "Mid-term Exams",
          date: "September 2026",
          icon: "📝",
        },
        {
          label: "End-term Exams",
          date: "November 2026",
          icon: "✍️",
        },
      ],
    },
    {
      title: "Even Semester",
      period: "January – May",
      icon: "📖",
      color: "blue",
      events: [
        {
          label: "Classes Commence",
          date: "January 2027",
          icon: "🎓",
        },
        {
          label: "Mid-term Exams",
          date: "March 2027",
          icon: "📝",
        },
        {
          label: "End-term Exams",
          date: "May 2027",
          icon: "✍️",
        },
      ],
    },
  ],
  note: "The academic calendar is subject to revision. Students are advised to check the official notice board for the latest updates.",
};

async function getAcademicCalendar() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/academic-calendar`,
      {
        cache: "no-store", // or use next: { revalidate: 3600 }
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch academic calendar");
    }

    const data = await res.json();

    if (data?.content?.semesters) {
      return data.content;
    }

    return defaultData;
  } catch (error) {
    return defaultData;
  }
}

export default async function AcademicCalendar() {
  const data = await getAcademicCalendar();

  if (!data?.semesters) {
    return (
      <div className="ac-page">
        <div className="ac-loading">
          <p>Error loading calendar data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ac-page">
      {/* Hero */}
      <div className="ac-hero">
        <div className="ac-hero-bg"></div>
        <div className="container">
          <nav className="ac-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/academics">Academics</Link>
            <span>›</span>
            <span>Academic Calendar</span>
          </nav>

          <span className="ac-badge">ACADEMICS</span>

          <h1>Academic Calendar</h1>

          <p className="ac-hero-subtitle">
            Stay updated with important academic dates, events, and schedules
            for the current academic year.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="ac-body">
        <div className="container">
          <div className="ac-year-header">
            <div className="ac-year-badge">{data.academicYear}</div>
            <h2>Academic Year {data.academicYear}</h2>
          </div>

          <div className="ac-semesters">
            {data.semesters.map((sem, idx) => (
              <div key={idx} className={`ac-semester-card ac-${sem.color}`}>
                <div className="ac-sem-header">
                  <span className="ac-sem-icon">{sem.icon}</span>
                  <div>
                    <h3>{sem.title}</h3>
                    <p className="ac-sem-period">{sem.period}</p>
                  </div>
                </div>

                <div className="ac-sem-timeline">
                  {sem.events.map((event, i) => (
                    <div key={i} className="ac-timeline-item">
                      <span className="ac-event-icon">{event.icon}</span>
                      <div className="ac-event-content">
                        <p className="ac-event-label">{event.label}</p>
                        <p className="ac-event-date">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {data.note && (
            <div className="ac-note">
              <span className="ac-note-icon">ℹ️</span>
              <div>
                <h4>Important Note</h4>
                <p>{data.note}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
