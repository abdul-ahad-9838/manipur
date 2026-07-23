import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp"
      badge="ACADEMICS"
      title="Brochure Download"
      subtitle="Download the official MIU prospectus and program brochures for detailed information."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Academics" },
        { label: "Brochure Download" },
      ]}
      defaultSections={[
        {
          title: "University Prospectus 2026–27",
          content:
            "The MIU prospectus provides detailed information about academic programs, admission procedure, fee structure, scholarships, campus facilities, and other important aspects of university life. A physical copy can be obtained from the admission office.",
        },
        {
          title: "Available Brochures",
          items: [
            {
              icon: "📄",
              title: "University Prospectus 2026–27",
              desc: "Complete guide to all programs, admissions, and campus life at MIU.",
              fileUrl:
                "/brochure/Manipur International University Prospectus 2026–27.pdf",
            },
            {
              icon: "📊",
              title: "School of Commerce and Management Brochure",
              desc: "Detailed information on B.Com, M.Com, BBA, and MBA programs.",
              fileUrl: "/brochure/school-of-commerce-and-management.pdf",
            },
            {
              icon: "💻",
              title:
                "School of Engineering and Information Technology Brochure",
              desc: "BCA, MCA, B.Sc, CS, B.Tech and M.Tech program details .",
              fileUrl:
                "/brochure/school-of-engineering-and-information-technology.pdf",
            },
            {
              icon: "⚙️",
              title: "School of Arts and Humanities Brochure",
              desc: "B.A. and M.A. program information and specializations.",
              fileUrl: "/brochure/school-of-arts-and-humanities.pdf",
            },
            {
              icon: "🏢",
              title: "School of Science Brochure",
              desc: "BSC, and MSC  information and specializations.",
              fileUrl: "/brochure/school-of-science.pdf",
            },
            {
              icon: "🚒",
              title: "School of Fire and Safety Brochure",
              desc: "B.Sc and M.Sc program details across science disciplines.",
              fileUrl: "/brochure/school-of-fire-and-safety.pdf",
            },
            {
              icon: "🔬",
              title: "School of Paramedical Sciences Brochure",
              desc: "Program details across Paramedical Disciplines.",
              fileUrl: "/brochure/school-of-paramedical-sciences.pdf",
            },
            {
              icon: "📚",
              title: "School of Library and Information Science Brochure",
              desc: "B.Lib and M.Lib program details.",
              fileUrl:
                "/brochure/school-of-library-and-information-science.pdf",
            },
            {
              icon: "📰",
              title: "School of Journalism and Mass Communication Brochure",
              desc: "BJMC and MJMC program details.",
              fileUrl:
                "/brochure/school-of-journalism-and-mass-communication.pdf",
            },
          ],
        },
        {
          title: "Request a Brochure",
          content:
            "To receive a physical copy or for any queries, contact our admissions office at admission@miu.edu.in or call +91 9319727766.",
        },
      ]}
    />
  );
}
