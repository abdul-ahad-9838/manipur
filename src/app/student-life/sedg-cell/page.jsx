import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "SEDG Cell | Manipur International University",
  description:
    "MIU SEDG Cell promotes equity, dignity, and opportunity for socio-economically disadvantaged groups.",
  keywords:
    "MIU SEDG, social equity, disadvantaged groups, inclusion, financial aid",
};

export default function SEDGCell() {
  const sections = [
    {
      icon: "🤝",
      title: "Socio-Economically Disadvantaged Group Cell",
      content:
        "The Socio-Economically Disadvantaged Group (SEDG) Cell at Manipur International University helps students who belong to socio-economically disadvantaged backgrounds. The cell helps ensure that each student receives equal educational opportunities.",
    },
    {
      title: "Mission & Vision",
      content:
        "The SEDG Cell is dedicated to building an inclusive environment where all the students receive the necessary support to accomplish their academic and professional goals with respect.",
    },
    {
      title: "Key Objectives",
      list: [
        "Help students belonging to economically weaker sections.",
        "Reduce impediments to academic and professional success of students.",
        "Create an inclusive and respectful campus for all.",
      ],
    },
    {
      title: "Our Initiatives",
      cards: [
        {
          icon: "💰",
          title: "Financial Assistance",
          content:
            "Scholarships, fee assistance and financial assistance programs for disadvantaged students",
        },
        {
          icon: "👨‍🏫",
          title: "Mentoring Program",
          content:
            "Academic counseling and mentoring for helping students achieve their academic goals",
        },
        {
          icon: "🎓",
          title: "Skill Building",
          content:
            "Skill development programs like workshops and career guidance for improving employability",
        },
        {
          icon: "🤲",
          title: "Student Assistance",
          content:
            "Academic and personal assistance for helping students through their academics",
        },
      ],
    },
    {
      title: "Collaborations",
      content:
        "The SEDG cell collaborates with the equal opportunity Cell (EOC), the students welfare section, and many other organizations to offer more help and provide equal opportunities to students. ",
    },
    {
      title: "Our Commitment",
      content:
        "The SEDG cell is committed to ensuring that no student misses any educational opportunities due to their inability and socioeconomic condition. We strive to create an environment where all the students feel empowered to study and learn.",
    },
  ];

  return (
    <GenericInfoPage
      badge="EQUITY · DIGNITY · OPPORTUNITY"
      title="SEDG Cell"
      subtitle="Socio-Economically Disadvantaged Group Cell"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "SEDG Cell" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Need Support?",
        description:
          "Contact us for financial aid, mentorship, or any support related to socio-economic challenges.",
        email: "support@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
