import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-academic-collaborations"
      badge="ACADEMICS"
      title="Academic Collaborations"
      subtitle="MIU's partnerships with national and international institutions for enhanced learning and research."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Academics" },
        { label: "Academic Collaborations" },
      ]}
      defaultSections={[
        {
          title: "Our Collaboration Philosophy",
          content:
            "Manipur International University believes in the power of partnerships to enhance educational quality and research output. Our collaborations provide students and faculty with access to global knowledge, resources, and opportunities.",
        },
        {
          title: "Areas of Collaboration",
          items: [
            {
              icon: "🔬",
              title: "Research Partnerships",
              desc: "Joint research projects with national institutes and universities.",
            },
            {
              icon: "🌐",
              title: "Student Exchange Programs",
              desc: "Exchange programs allowing students to experience diverse academic environments.",
            },
            {
              icon: "👨‍🏫",
              title: "Faculty Development",
              desc: "Collaborative faculty development programs and visiting professor arrangements.",
            },
            {
              icon: "🏭",
              title: "Industry Tie-Ups",
              desc: "MoUs with leading companies for internships, placements, and curriculum development.",
            },
            {
              icon: "📚",
              title: "Library Resource Sharing",
              desc: "Access to digital libraries and research databases through institutional partnerships.",
            },
          ],
        },
      ]}
    />
  );
}
