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
        "At Manipur International University, we are committed to uplifting students from diverse socio-economic backgrounds through inclusive academic and career support. By ensuring equal access to resources, mentorship, and financial aid, the Cell fosters empowerment and holistic development across the campus.",
    },
    {
      title: "Mission & Vision",
      content:
        "The SEDG Cell at Manipur International University is dedicated to promote equity, dignity, and opportunity for students from socio-economically disadvantaged backgrounds by ensuring inclusive access to education, resources, and institutional support.",
    },
    {
      title: "Key Objectives",
      list: [
        "Identify and support students from economically weaker sections",
        "Eliminate systemic barriers to academic and career advancement",
        "Foster a respectful and empowering campus environment",
      ],
    },
    {
      title: "Supporting Initiatives",
      cards: [
        {
          icon: "💰",
          title: "Financial Support",
          content:
            "Financial aid, fee waivers, and emergency grants for students in need",
        },
        {
          icon: "👨‍🏫",
          title: "Mentorship Programs",
          content:
            "One-on-one mentorship and academic counselling for disadvantaged students",
        },
        {
          icon: "🎓",
          title: "Skill Development",
          content:
            "Workshops and career guidance to enhance employability and confidence",
        },
        {
          icon: "🤲",
          title: "Holistic Support",
          content:
            "Comprehensive support ecosystem addressing academic and personal needs",
        },
      ],
    },
    {
      title: "Collaboration",
      content:
        "Works in coordination with the Equal Opportunity Cell (EOC), Student Welfare Division, and external agencies to mobilize resources, conduct outreach, and ensure policy-level inclusion.",
    },
    {
      title: "Our Commitment",
      content:
        "The SEDG Cell stands as a pillar of institutional commitment to social justice—ensuring that no student is left behind due to economic hardship or social disadvantage.",
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
