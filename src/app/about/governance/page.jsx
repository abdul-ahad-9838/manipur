import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-governance"
      badge="ABOUT US"
      title="Governance"
      subtitle="The Manipur International University (MIU) has a well-structured and clear governance system to ensure efficient decision-making processes and improve the quality of academics and administration."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Governance" },
      ]}
      defaultSections={[
        {
          title: "1. Governing Body",
          content:
            "The Governing Body is the topmost body responsible for the strategic and policy orientation of the institution. This ensures that the institution operates within the scope of its objectives and statutory duties.\n\nResponsibilities:\n· Formulation of policies and strategies\n· Maintenance of compliance with regulatory rules\n· Financial planning and management\n· Development and growth of the university",
        },
        {
          title: "2. Academic Council",
          content:
            "The Academic Council is responsible for monitoring and maintaining high standards of academics within the institution. It is charged with the responsibility to provide quality teaching, learning, and research opportunities at the university level.\n\nResponsibilities:\n· Drafting and approval of academic programs\n· Periodic review and update of academic program curriculums\n· Fostering research culture, innovation, and interdisciplinary studies\n· Implementation of academic quality assurance procedures",
        },
        {
          title: "3. Internal Quality Assurance Cell (IQAC)",
          content:
            "The IQAC plays an important role in institutionalizing quality assurance measures in compliance with NAAC requirements. Its objective is to continuously ensure the highest standards of academic and administrative performance.\n\nResponsibilities:\n· Drawing up and implementing quality standards\n· Conducting academic and administrative reviews\n· Maintaining stakeholder feedback database\n· Preparation of Annual Quality Assurance Report (AQAR) reports\n· Promotion of best practices and innovation",
        },
        {
          title: "4. Finance Committee",
          content:
            "The Finance Committee is the body responsible for managing the finances of the institution efficiently. It is responsible for ensuring proper and efficient utilization of financial resources.\n\nResponsibilities:\n· Review and endorsement of financial plans\n· Monitoring of financial performance\n· Provision of advice for better resource management",
        },
      ]}
    />
  );
}
