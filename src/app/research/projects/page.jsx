import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-research-projects"
      badge="RESEARCH"
      title="Research Projects"
      subtitle="Ongoing and completed research projects by MIU faculty and students."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Research" },
        { label: "Projects" },
      ]}
      defaultSections={[
        {
          title: "Active Research Projects",
          items: [
            {
              icon: "🌿",
              title: "Biodiversity Documentation of Manipur",
              desc: "A comprehensive study documenting the flora and fauna of Manipur's diverse ecosystems.",
            },
            {
              icon: "💻",
              title: "AI-Based Agricultural Solutions for Northeast India",
              desc: "Developing AI tools to improve agricultural productivity in the Northeast region.",
            },
            {
              icon: "📊",
              title: "Economic Development of Border Districts",
              desc: "Research on economic challenges and opportunities in Manipur's border districts.",
            },
            {
              icon: "⚗️",
              title: "Medicinal Plants of Manipur",
              desc: "Ethnobotanical study of traditional medicinal plants used in Manipuri folk medicine.",
            },
          ],
        },
        {
          title: "Research Funding",
          content:
            "MIU actively seeks research funding from UGC, DST, ICSSR, and other national funding agencies.",
        },
      ]}
    />
  );
}
