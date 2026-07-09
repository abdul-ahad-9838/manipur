import DynamicPage from "@/components/DynamicPage";

export default function ApprenticeshipPage() {
  return (
    <DynamicPage
      settingsKey="dp-apprenticeship"
      badge="SKILL DEVELOPMENT"
      title="Apprenticeship Program"
      subtitle="Earn while you learn. MIU's Apprenticeship Program bridges the gap between classroom education and real-world industry experience."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Schools" },
        { label: "Apprenticeship Program" },
      ]}
      defaultSections={[
        {
          title: "About the Program",
          content:
            "The MIU Apprenticeship Program is a structured work-based learning initiative that allows students to gain hands-on industry experience while completing their academic qualifications. Designed in collaboration with leading industry partners, the program ensures graduates are job-ready from day one.",
        },
        {
          title: "Program Highlights",
          items: [
            {
              icon: "💼",
              title: "Industry Partnerships",
              desc: "Tie-ups with 100+ companies across sectors including IT, manufacturing, healthcare, and retail.",
            },
            {
              icon: "💰",
              title: "Earn While You Learn",
              desc: "Apprentices receive a stipend during their training period as per National Apprenticeship guidelines.",
            },
            {
              icon: "📜",
              title: "Dual Certification",
              desc: "Receive both an academic degree and a nationally recognized apprenticeship certificate.",
            },
            {
              icon: "🎯",
              title: "Guaranteed Placement Support",
              desc: "Priority placement assistance for apprenticeship program graduates.",
            },
            {
              icon: "🏭",
              title: "On-Site Training",
              desc: "Real workplace exposure at partner companies with mentorship from industry professionals.",
            },
            {
              icon: "📈",
              title: "Career Acceleration",
              desc: "Fast-track your career with practical skills that employers value most.",
            },
          ],
        },
        {
          title: "Eligibility",
          items: [
            {
              icon: "✅",
              title: "UG Students",
              desc: "Students enrolled in any undergraduate program at MIU.",
            },
            {
              icon: "✅",
              title: "PG Students",
              desc: "Postgraduate students seeking industry exposure.",
            },
            {
              icon: "✅",
              title: "Diploma Holders",
              desc: "Diploma holders looking to upgrade skills through practical training.",
            },
          ],
        },
        {
          title: "How to Apply",
          items: [
            {
              icon: "1️⃣",
              title: "Register",
              desc: "Fill out the apprenticeship application form at the Placement Cell.",
            },
            {
              icon: "2️⃣",
              title: "Shortlisting",
              desc: "Candidates are shortlisted based on academic performance and aptitude.",
            },
            {
              icon: "3️⃣",
              title: "Industry Interview",
              desc: "Attend interviews with partner companies.",
            },
            {
              icon: "4️⃣",
              title: "Onboarding",
              desc: "Selected candidates are onboarded and begin their apprenticeship.",
            },
          ],
        },
        {
          title: "Contact",
          content:
            "For more information about the Apprenticeship Program, contact the Placement & Training Cell at MIU. Email: placements@miu.edu.in | Phone: +91 9319727766",
        },
      ]}
    />
  );
}
