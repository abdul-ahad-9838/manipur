import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "Health Facilities | Manipur International University",
  description:
    "Comprehensive health and wellness facilities at MIU ensuring student well-being and academic success.",
  keywords:
    "MIU health facilities, medical center, student wellness, campus health services, UGC compliant",
};

export default function HealthFacilities() {
  const sections = [
    {
      icon: "🏥",
      title: "Health Facilities at MIU",
      content:
        "At Manipur International University (MIU), we understand that good health is essential for academic success and personal growth. The University is committed to providing a safe, healthy, and supportive environment for all students, faculty, and staff.",
    },
    {
      title: "UGC Guidelines Compliant",
      content:
        "Our health facilities are designed and maintained in accordance with UGC guidelines to ensure the highest standards of healthcare and wellness support for the university community.",
    },
    {
      title: "Medical Services",
      cards: [
        {
          icon: "👨‍⚕️",
          title: "Medical Center",
          content:
            "On-campus medical center with qualified doctors and nurses available during working hours",
        },
        {
          icon: "🚑",
          title: "Emergency Care",
          content:
            "24/7 emergency medical services and ambulance facility for urgent medical situations",
        },
        {
          icon: "💊",
          title: "Pharmacy",
          content:
            "Well-stocked pharmacy providing essential medicines at subsidized rates",
        },
        {
          icon: "🔬",
          title: "Diagnostic Services",
          content:
            "Basic diagnostic facilities including pathology and radiology services",
        },
      ],
    },
    {
      title: "Health Services Available",
      list: [
        "General medical consultation and treatment",
        "First aid and emergency medical care",
        "Health check-ups and preventive care",
        "Vaccination and immunization programs",
        "Minor surgical procedures",
        "Referral services to specialist hospitals",
        "Health awareness and wellness programs",
        "Annual health screening for students and staff",
      ],
    },
    {
      title: "Mental Health & Counseling",
      content:
        "Understanding the importance of mental well-being, MIU provides professional counseling services to help students cope with academic stress, personal issues, and emotional challenges. Our trained counselors offer confidential support in a safe and non-judgmental environment.",
    },
    {
      title: "Fitness & Wellness",
      cards: [
        {
          icon: "💪",
          title: "Gymnasium",
          content:
            "Modern gym facility with fitness equipment and trained instructors",
        },
        {
          icon: "🧘",
          title: "Yoga & Meditation",
          content:
            "Regular yoga and meditation sessions for stress management and wellness",
        },
        {
          icon: "🏃",
          title: "Sports Facilities",
          content:
            "Access to sports grounds and indoor sports facilities for physical fitness",
        },
        {
          icon: "🥗",
          title: "Nutrition Guidance",
          content:
            "Dietary counseling and nutrition awareness programs for healthy living",
        },
      ],
    },
    {
      title: "Health Insurance",
      content:
        "All students are covered under a comprehensive health insurance scheme that provides coverage for hospitalization, accidents, and major illnesses. The insurance ensures that students receive quality medical care without financial burden.",
    },
    {
      title: "COVID-19 Protocols",
      content:
        "MIU maintains strict health and safety protocols to prevent the spread of infectious diseases. Regular sanitization, health monitoring, and adherence to government guidelines ensure a safe campus environment.",
    },
  ];

  return (
    <GenericInfoPage
      badge="HEALTH & WELLNESS"
      title="Health Facilities"
      subtitle="Your Health, Our Priority"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Health Facilities" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Medical Emergency",
        description:
          "For medical emergencies or to schedule an appointment at the health center.",
        email: "support@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
