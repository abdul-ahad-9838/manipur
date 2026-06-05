import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "Awards & Achievements | Manipur International University",
  description:
    "Celebrating excellence at MIU - student awards, faculty achievements, and institutional recognitions.",
  keywords:
    "MIU awards, student achievements, faculty recognition, yogasana championships, UGC NET",
};

export default function Awards() {
  const sections = [
    {
      icon: "🏆",
      title: "National Yogasana Championships",
      content:
        "<strong>36th National Yogasana Championship 2024-2025 (Midnapore, 17th - 19th January 2025):</strong><br/>• Ms. Ayekpam Bedashastri Devi - 1st Position (Women)<br/>• Ms. Pukhrambam Satyabati Devi - 2nd Position (Women)<br/>• Mr. Ningombam Jit Singh - 3rd Position<br/>• Mr. M Nipamacha - 4th Position<br/>• Ms. Kh Lamnganbi - 2nd Position<br/>• Ms. Laishram Sanatombi Chanu - 3rd Position<br/><br/><strong>35th National Traditional Yogasana Championship 2025 (Kanchrapara North 24 Parganas, 6th - 8th June 2025):</strong><br/>• Ms. Ayekpam Bedashastri Devi - 1st Position (Women)",
    },
    {
      title: "International Yogasana Championships",
      content:
        "<strong>10th World Yogasana Championship 2025 (Hanoi, Vietnam):</strong><br/>• Ms. Ayekpam Bedashastri Devi - Gold Medal (Women)<br/>• Mr. M Nipamacha - Gold Medal (Sr Men)<br/>• Ms. Pukhrambam Satyabati Devi - Gold Medal (Sr Women)<br/>• Mr. Ningombam Jit Singh - Gold Medal (Sr Men)<br/><br/><strong>8th Indo Nepal International Yoga Championship 2025 (Pokhra, Nepal):</strong><br/>• Pukhrambam Satyabati Devi - 1st Position (Sr Women)",
    },
    {
      title: "UGC JRF Achievers",
      content:
        "<strong>Junior Research Fellowship Recipients:</strong><br/>1. Kshetrimayum Brajagopal Singh (Yoga) - Dec 2024<br/>2. Monica Potsangbam (English) - Dec 2024<br/>3. Bishwanath Singh Langpoklakpam (Environmental Science) - June 2025",
    },
    {
      title: "UGC NET Assistant Professor Qualifiers",
      content:
        "<strong>Recent Qualifiers:</strong><br/>• Meetali Sanasam (Yoga) - July 2022<br/>• K Brajagopal Singh (Yoga) - Dec 2023<br/>• Mintu Viswas (Yoga) - June 2024<br/>• Laishram Premi Devi (Yoga) - June 2024<br/>• B Singh Kshetrimayum (Yoga) - June 2024<br/>• T Geetchandra Meitei (Social Work) - June 2024<br/>• Monica Potsangbam (English) - June 2024<br/>• L B Singh (Environmental Science) - June 2024<br/>• Bishwanath Singh Langpoklakpa (Environmental Science) - Dec 2024<br/>• G M Takhellambam (Social Work) - June 2025",
    },
    {
      title: "PhD Fellowship Recipients",
      list: [
        "Akshay Rajukar - Mahatma Jyotiba Phule Research Fellowship",
        "Ruth Zingkhai - National Fellowship of Schedule Tribe (NFST)",
        "Lozy Kamei - National Fellowship of Schedule Tribe (NFST)",
        "Sezolu Puro - National Fellowship of Schedule Tribe (NFST)",
        "Meeranda Ningthoujam - National Fellowship for Scheduled Caste Students (NFSC)",
      ],
    },
    {
      title: "National Coaching & Official Roles",
      content:
        "<strong>Chief Coach & Official:</strong> Mr. Potsangbam Arunkumar - Accompanied as Chief Coach cum Official<br/><br/><strong>Coach & Official:</strong> Mr. H David - Research Scholar, Coach cum Official<br/><br/><strong>International Coach & Judge Qualification:</strong> Ayekpam Bedashastri Devi - Merit Certificate 2020-2021, All India Yoga Culture Federation",
    },
  ];

  return (
    <GenericInfoPage
      badge="RECOGNITION"
      title="Awards & Achievements"
      subtitle="Celebrating Excellence and Innovation"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Awards" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Award Nominations",
        description:
          "For award nominations or queries about the awards program, please contact us.",
        email: "support@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
