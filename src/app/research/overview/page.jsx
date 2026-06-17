import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-research-overview"
      badge="RESEARCH"
      title="Research Overview"
      subtitle="Advancing knowledge and innovation through rigorous research at Manipur International University."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Research" },
        { label: "Overview" },
      ]}
      defaultSections={[
        {
          title: "Research at MIU",
          content:
            "Research is at the heart of MIU's academic mission. The university encourages faculty and students to engage in original research that addresses real-world challenges, particularly those relevant to Northeast India.",
        },
        {
          title: "Research Focus Areas",
          items: [
            {
              icon: "🌿",
              title: "Biodiversity & Ecology",
              desc: "Research on Northeast India's unique flora, fauna, and ecological systems.",
            },
            {
              icon: "💻",
              title: "Technology & Innovation",
              desc: "Applied research in computer science, AI, and emerging technologies.",
            },
            {
              icon: "📊",
              title: "Business & Economics",
              desc: "Research on regional economic development, entrepreneurship, and management.",
            },
            {
              icon: "⚗️",
              title: "Applied Sciences",
              desc: "Research in chemistry, physics, and materials science with practical applications.",
            },
          ],
        },
        {
          title: "Research Infrastructure",
          content:
            "MIU provides state-of-the-art research laboratories, a well-stocked library with access to international journals, and dedicated research centers.",
        },
      ]}
    />
  );
}
