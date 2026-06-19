import "@/styles/NoticesAnnouncements.css";
import NoticeGrid from "@/components/NoticeGrid"; // adjust path

const DEFAULT_NOTICES = [
  {
    title: "Admissions Open for Academic Session 2026-27",

    category: "Admission",
    description:
      "Applications are now invited for Undergraduate, Postgraduate, and Doctoral programmes. Interested candidates may apply online before the deadline.",
  },
  {
    title: "End Semester Examination Schedule Released",

    category: "Examination",
    description:
      "Students are advised to check the examination timetable and complete all necessary formalities before appearing for the examinations.",
  },
  {
    title: "National Research Conference on Sustainable Development",

    category: "Event",
    description:
      "MIU will host a national-level conference focusing on innovation, sustainability, and interdisciplinary research participation.",
  },
  {
    title: "Scholarship Applications Now Available",

    category: "Scholarship",
    description:
      "Eligible students may submit scholarship applications through the student portal along with the required supporting documents.",
  },
  {
    title: "International Yoga Day Celebration",

    category: "Campus Event",
    description:
      "The university invites students, faculty, and staff to participate in the International Yoga Day programme on campus.",
  },
];

async function getNotices() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const res = await fetch(`${BASE_URL}/api/notices`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return [...DEFAULT_NOTICES, ...data];
    }

    return DEFAULT_NOTICES;
  } catch (err) {
    return DEFAULT_NOTICES;
  }
}

export default async function NoticesAnnouncements() {
  const notices = await getNotices();

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

            <NoticeGrid notices={notices} />
          </div>
        </section>
      </div>
    </div>
  );
}
