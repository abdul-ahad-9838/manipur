import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-degree-awarded"
      badge="RESEARCH"
      title="Degree Awarded"
      subtitle="Ph.D and research degrees awarded by Manipur International University."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Research" },
        { label: "Degree Awarded" },
      ]}
      defaultSections={[
        {
          title: "Ph.D Program at MIU",
          content:
            "Manipur International University offers Ph.D programs across various disciplines. The doctoral program is designed to produce high-quality researchers who contribute original knowledge to their fields of study.",
        },
        {
          title: "Ph.D Admission Process",
          items: [
            {
              icon: "1️⃣",
              title: "Eligibility",
              desc: "Master's degree with minimum 55% marks (50% for SC/ST/PwD candidates).",
            },
            {
              icon: "2️⃣",
              title: "Entrance Test",
              desc: "Candidates must qualify the MIU Research Entrance Test (RET) or have valid NET/JRF/GATE scores.",
            },
            {
              icon: "3️⃣",
              title: "Interview",
              desc: "Shortlisted candidates appear for an interview before the Doctoral Committee.",
            },
            {
              icon: "4️⃣",
              title: "Course Work",
              desc: "Mandatory course work of one semester as per UGC Ph.D regulations.",
            },
            {
              icon: "5️⃣",
              title: "Research & Thesis",
              desc: "Minimum 3 years of research work culminating in thesis submission and viva voce.",
            },
          ],
        },
        {
          title: "Available Research Areas",
          items: [
            {
              icon: "🔬",
              title: "Sciences",
              desc: "Physics, Chemistry, Mathematics, Botany, Zoology, Computer Science.",
            },
            {
              icon: "📊",
              title: "Commerce & Management",
              desc: "Commerce, Business Administration, Finance, Marketing, HR.",
            },
            {
              icon: "⚙️",
              title: "Engineering & Technology",
              desc: "Civil, Mechanical, Electrical, Computer Science Engineering.",
            },
          ],
        },
      ]}
    />
  );
}
