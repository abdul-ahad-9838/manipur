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
            "The Governing Body is the topmost body responsible for the strategic and policy orientation of the institution. This ensures that the institution operates within the scope of its objectives and statutory duties.\n\nRoles and responsibilities:\n· Policy-making and strategy-making\n· Ensuring compliance with regulatory guidelines\n· Financial planning and management\n· Development and growth of the university",
        },
        {
          title: "2. Academic Council",
          content:
            "The Academic Council is responsible for ensuring that high academic standards are maintained within the institution. It oversees the quality of teaching, learning, and research opportunities at the university level.\n\nRoles and responsibilities:\n· Drafting and approval of academic programs\n· Regular review and updating of academic program curriculum\n· Promoting research, innovation, and interdisciplinary studies\n· Implementing academic quality assurance processes",
        },
        {
          title: "3. Internal Quality Assurance Cell (IQAC)",
          content:
            "The Internal Quality Assurance Cell (IQAC) plays a crucial role in establishing and maintaining quality assurance processes in compliance with NAAC requirements. Its objective is to ensure the highest standards of academic and administrative performance.\n\nRoles and responsibilities:\n· Establishing and implementing quality criteria\n· Conducting academic and administrative reviews\n· Maintaining stakeholders' feedback database\n· Preparing the Annual Quality Assurance Report (AQAR)\n· Promoting best practices and innovation",
        },
        {
          title: "4. Finance Committee",
          content:
            "The Finance Committee is responsible for ensuring the efficient management and utilization of the institution's financial resources. It oversees financial planning and promotes effective resource management.\n\nDuties:\n· Approval of financial plans\n· Monitoring financial performance\n· Providing advice on better resource management",
        },
      ]}
    />
  );
}
