import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-publications"
      badge="RESEARCH"
      title="Publications"
      subtitle="Research publications by MIU faculty and students in national and international journals."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Research" },
        { label: "Publications" },
      ]}
      defaultSections={[
        {
          title: "Publication Policy",
          content:
            "MIU encourages and supports faculty and students in publishing their research in peer-reviewed national and international journals.",
        },
        {
          title: "Publication Categories",
          items: [
            {
              icon: "📰",
              title: "Journal Articles",
              desc: "Research articles published in peer-reviewed national and international journals.",
            },
            {
              icon: "📖",
              title: "Books & Book Chapters",
              desc: "Academic books and contributed chapters in edited volumes.",
            },
            {
              icon: "🎤",
              title: "Conference Papers",
              desc: "Papers presented at national and international conferences.",
            },
            {
              icon: "🏆",
              title: "Patents",
              desc: "Intellectual property and patents filed by MIU researchers.",
            },
          ],
        },
        {
          title: "MIU Research Journal",
          content:
            "MIU publishes its own peer-reviewed research journal featuring original research by faculty, students, and external contributors.",
        },
      ]}
    />
  );
}
