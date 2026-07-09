import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-academic-leadership"
      badge="ACADEMICS"
      title="Academic Leadership"
      subtitle="Meet the academic leaders who guide MIU's educational vision and institutional excellence."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Academics" },
        { label: "Academic Leadership" },
      ]}
      defaultSections={[
        {
          title: "Vice Chancellor",
          content:
            "The Vice Chancellor is the principal academic and executive officer of the university, responsible for academic planning, research promotion, and overall institutional development.",
        },

        {
          title: "Pro Vice Chancellor",
          content:
            "The Pro Vice Chancellor assists the Vice Chancellor in academic administration and acts as Vice Chancellor in their absence, overseeing day-to-day academic operations.",
        },
        {
          title: "Registrar",
          content:
            "The Registrar is the chief administrative officer responsible for student records, examinations, statutory compliance, and official correspondence of the university.",
        },
        {
          title: "Controller of Examinations",
          content:
            "The Controller of Examinations oversees the entire examination process including scheduling, conduct, evaluation, and result declaration, ensuring fairness and integrity.",
        },
        {
          title: "Deans of Schools",
          content:
            "Each School is headed by a Dean who provides academic leadership, manages faculty, and ensures the quality of teaching and research within their respective school.",
        },
      ]}
    />
  );
}
