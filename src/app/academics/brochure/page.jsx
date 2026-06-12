"use client";
import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-brochure"
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
            "The MIU Prospectus contains comprehensive information about all programs, admission procedures, fee structure, scholarships, campus facilities, and more. Contact the admissions office to receive a physical copy.",
        },
        {
          title: "Available Brochures",
          items: [
            {
              icon: "📄",
              title: "University Prospectus 2026–27",
              desc: "Complete guide to all programs, admissions, and campus life at MIU.",
            },
            {
              icon: "📊",
              title: "School of Commerce Brochure",
              desc: "Detailed information on B.Com, M.Com, BBA, and MBA programs.",
            },
            {
              icon: "💻",
              title: "School of Information Technology Brochure",
              desc: "BCA, MCA, B.Sc CS, and PG Diploma program details.",
            },
            {
              icon: "⚙️",
              title: "School of Engineering Brochure",
              desc: "B.Tech and M.Tech program information and specializations.",
            },
            {
              icon: "🏢",
              title: "School of Management Brochure",
              desc: "BBA and MBA specialization details and career outcomes.",
            },
            {
              icon: "🔬",
              title: "School of Science Brochure",
              desc: "B.Sc and M.Sc program details across science disciplines.",
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
