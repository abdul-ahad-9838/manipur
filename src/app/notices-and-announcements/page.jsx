import "@/styles/NoticesAnnouncements.css";
import NoticeGrid from "@/components/NoticeGrid";
import Notice from "@/models/Notice"; // Adjust path
import dbConnect from "@/lib/mongodb";

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
  try {
    await dbConnect();

    const notices = await Notice.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    const formattedNotices = notices.map((notice) => ({
      ...notice,
      _id: notice._id.toString(),
      createdAt: notice.createdAt?.toISOString(),
      updatedAt: notice.updatedAt?.toISOString(),
    }));

    // Keep default notices and append published database notices.
    return [...formattedNotices, ...DEFAULT_NOTICES];
  } catch (error) {
    console.error("Error fetching notices:", error);
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