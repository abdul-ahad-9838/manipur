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
        "Manipur International University realizes the significance of being healthy in order to excel in studies and personal life. Thus, it makes sure that everyone present on its premises remains safe, healthy and supported in every way possible. ",
    },
    {
      title: "UGC Guidelines Compliant",
      content:
        "These facilities are managed in a manner that meets the requirements laid down by UGC in this regard. ",
    },
    {
      title: "Medical Services",
      cards: [
        {
          icon: "👨‍⚕️",
          title: "Medical Center",
          content:
            "As an on-campus medical centre with skilled doctors and nurses working during office hours. ",
        },
        {
          icon: "🚑",
          title: "Emergency Care",
          content:
            "24/7 emergency medical services and ambulance services for emergencies.",
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
            "Basic diagnostics services with pathological and radiological services.",
        },
      ],
    },
    {
      title: "Available Health Services ",
      list: [
        "General medical consultation and treatment",
        "First aid and emergency medical treatment",
        "Health checkup services ",
        "Vaccination services",
        "Surgery services",
        "Referral services for specialist hospitals",
        "Health awareness programmes",
        "Health screening programmes for students and faculty members",
      ],
    },
    {
      title: "Mental Health & Counseling",
      content:
        "Realizing the significance of good mental well being, MIU has professional counselling services to assist students to deal with academic pressures, personal problems and emotional issues. Our counselors are always ready to assist you in a confidential manner.",
    },
    {
      title: "Fitness & Wellness",
      cards: [
        {
          icon: "💪",
          title: "Gymnasium",
          content:
            "Modern gym equipped with all sorts of fitness equipment and professional trainers.",
        },
        {
          icon: "🧘",
          title: "Yoga & Meditation",
          content:
            "Yoga and Meditation classes to combat stress and stay healthy.",
        },
        {
          icon: "🏃",
          title: "Sports Facilities",
          content:
            "Sports ground and indoor sports facilities to keep physically fit.",
        },
        {
          icon: "🥗",
          title: "Nutrition Guidance",
          content:
            "Counselling and nutrition awareness program to maintain good health.",
        },
      ],
    },
    {
      title: "Health Insurance",
      content:
        "All our students are provided with complete health insurance coverage, which is inclusive of all cases including hospitalisation, accident and serious illnesses. Our health insurance makes sure students get proper healthcare without having to worry about expenses.",
    },
    {
      title: "COVID-19 Protocols",
      content:
        "MIU maintains strict health and safety protocols to prevent the spread of infectious diseases. Regular sanitization, health monitoring, and adherence to government guidelines ensure a safe campus environment.",
    },
    {
      title: "Infectious Diseases",
      content:
        "MIU follows strict health and safety regulations to prevent any outbreak of any infectious disease.",
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
