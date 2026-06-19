// import BannerSection from "@/components/BannerSection";
import React from "react";
import "@/styles/NoticesAnnouncements.css";

const notices = [
  {
    title: "Admissions Open for Academic Session 2026-27",
    date: "15 June 2026",
    category: "Admission",
    description:
      "Applications are now invited for Undergraduate, Postgraduate, and Doctoral programmes. Interested candidates may apply online before the deadline.",
  },
  {
    title: "End Semester Examination Schedule Released",
    date: "10 June 2026",
    category: "Examination",
    description:
      "Students are advised to check the examination timetable and complete all necessary formalities before appearing for the examinations.",
  },
  {
    title: "National Research Conference on Sustainable Development",
    date: "05 June 2026",
    category: "Event",
    description:
      "MIU will host a national-level conference focusing on innovation, sustainability, and interdisciplinary research participation.",
  },
  {
    title: "Scholarship Applications Now Available",
    date: "01 June 2026",
    category: "Scholarship",
    description:
      "Eligible students may submit scholarship applications through the student portal along with the required supporting documents.",
  },
  {
    title: "International Yoga Day Celebration",
    date: "21 June 2026",
    category: "Campus Event",
    description:
      "The university invites students, faculty, and staff to participate in the International Yoga Day programme on campus.",
  },
];

export default function NoticesAnnouncements() {
  return (
    <div style={{ paddingTop: "clamp(70px, 12vw, 120px)" }}>
      <div className="simple-page">
        <section className="notice-board-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="simple-badge">Latest Updates</span>
              <h2 className="section-title">University Notices</h2>
              <p className="section-subtitle">
                Important announcements, examination updates, events, and
                academic notifications.
              </p>
            </div>

            <div className="notice-board-grid">
              {notices.map((notice, index) => (
                <div className="notice-board-card" key={index}>
                  <span className="notice-board-accent" />

                  <div className="notice-board-top">
                    <span className="notice-board-category">
                      {notice.category}
                    </span>
                    <span className="notice-board-date">{notice.date}</span>
                  </div>

                  <h3 className="notice-board-title">{notice.title}</h3>

                  <p className="notice-board-description">
                    {notice.description}
                  </p>

                  <button className="btn btn-orange">Read More →</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
