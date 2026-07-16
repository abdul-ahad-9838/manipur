import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "Ombudsperson | Manipur International University",
  description:
    "MIU Ombudsperson for Students' Grievances Redressal Committee under UGC Regulations 2023.",
  keywords:
    "MIU ombudsperson, student grievances, SGRC, UGC regulations, grievance redressal",
};

export default function Ombudsperson() {
  const sections = [
    {
      icon: "⚖️",
      title: "Ombudsperson for Students' Grievances",
      content:
        "<strong>Manipur International University</strong><br/>Authority: UGC Regulations 2023<br/><br/><strong>Notification No:</strong> MIU/DSW/CGRS-1/25/<br/><strong>Date:</strong> 26/03/2025<br/><strong>Tenure:</strong> 3 years",
    },
    {
      title: "Appointed Ombudsperson",
      content:
        "<strong>T. Umabati Devi</strong><br/><br/><strong>Former Position:</strong> Retired Associate Professor & Former Head<br/><strong>Department:</strong> Mathematics<br/><strong>Institution:</strong> Dhanamanjuri College of Arts, Imphal West, Manipur<br/><br/><strong>Role:</strong> Ombudsperson – Students' Grievances Redressal Committee (SGRC)<br/><strong>Appointment:</strong> Gazette Appointed under UGC (Redressal of Grievances) Regulations, 2023",
    },

    {
      title: "UGC Guidelines for Ombudsperson",
      cards: [
        {
          icon: "🔒",
          title: "Independence & Impartiality",
          content:
            "The Ombudsperson works independently of any external influence and evaluates every complaint impartially.",
        },
        {
          icon: "📋",
          title: "Handling Complaints",
          content:
            " Investigates the complaints from students about academics, administrative, financial and other issues at university level but not for those complaints which are pending for legal and disciplinary measures.",
        },
        {
          icon: "🤐",
          title: "Confidentiality",
          content:
            "Maintain the confidentiality of complaints as well as the information about students during the whole process.",
        },
        {
          icon: "⏱️",
          title: "Timely Handling",
          content:
            "Respond to the complaints in 7 days and try to solve them in 30-45 days.",
        },
        {
          icon: "📞",
          title: "Accessibility",
          content:
            "Students can approach the ombudsman through meetings, telephone, email and the online grievances portal.",
        },
        {
          icon: "📊",
          title: "Record Keeping",
          content:
            "Keeps the records of complaints and actions and submits the reports to the university authorities as per requirement.",
        },
        {
          icon: "🤝",
          title: "Mediation",
          content:
            "This service tries to initiate discussions and create understandings between the parties.",
        },
        {
          icon: "💡",
          title: "Recommendations",
          content:
            "Makes recommendations for the improvement of the university to avoid similar problems in the future.",
        },
      ],
    },
  ];

  return (
    <GenericInfoPage
      badge="STUDENT WELFARE"
      title="Ombudsperson"
      subtitle="Students' Grievances Redressal Committee"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Ombudsperson" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Contact Ombudsperson",
        description:
          "For student grievances and complaints under UGC Regulations 2023.",
        email: "ombudsperson@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
