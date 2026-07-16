import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "Equal Opportunity Cell | Manipur International University",
  description:
    "MIU Equal Opportunity Cell ensures inclusive, accessible, and discrimination-free campus environment.",
  keywords: "MIU EOC, equal opportunity, diversity, inclusion, accessibility",
};

export default function EqualOpportunityCell() {
  const sections = [
    {
      icon: "🤝",
      title: "Equal Opportunity Cell (EOC)",
      content:
        "In MIU, equal opportunity policy is followed for both students and staff. Equal opportunity cell strives to establish a safe and respectful environment for everyone in the university, irrespective of their backgrounds or capabilities.The EOC is supportive of differently abled people, economically weaker students and minority students. The EOC ensures that all students get an equal opportunity to learn and excel in university life.",
    },
    {
      title: "Core Values",
      cards: [
        {
          icon: "♿",
          title: "Accessibility",
          content:
            "Accessibility of facilities for differently abled students and staff is ensured by us.",
        },
        {
          icon: "🤲",
          title: "Equal Support",
          content:
            "Support of disadvantaged and underrepresented students academically and financially is provided.",
        },
        {
          icon: "🌈",
          title: "Diversity",
          content:
            " Diversity in terms of different communities and culture is respected and celebrated",
        },
        {
          icon: "⚖️",
          title: "Fair Opportunity",
          content:
            "Equal opportunity for learning and assuming leadership positions is provided to everyone.",
        },
      ],
    },
    {
      title: "Our Commitment to Inclusive Education",
      cards: [
        {
          icon: "📚",
          title: "Inclusive Learning",
          content:
            "We facilitate access to education and learning through high-quality education, learning materials, accessible classrooms and support for all students.",
        },
        {
          icon: "🚫",
          title: "Zero Discrimination",
          content:
            "Mentoring, scholarship, career guidance and skill development initiatives for our students.",
        },
        {
          icon: "💪",
          title: "Community Empowerment",
          content:
            "Facilitating targeted interventions including mentorship programs, need-based scholarships, career guidance, and skill-building workshops",
        },
        {
          icon: "🛡️",
          title: "Accessibility Support",
          content:
            "Providing accessible facilities, assistive technology, and other support to help differently-abled students achieve success",
        },
        {
          icon: "🏛️",
          title: "Safe Campus Environment",
          content:
            "Ensuring safety, security, and a welcoming environment in our campus with a confidential grievance system",
        },
      ],
    },
    {
      title: "Policies & Initiatives",

      list: [
        "Scholarships & Financial Assistance - Scholarships and financial aid for students from economically weaker and underrepresented sections of society",
        "Grievance Assistance - Safe and confidential system to report discrimination, harassment, or any form of injustice",
        "Accessible Campus  - Accessible facilities including ramps, accessible classrooms, and assistive technology for differently abled students",
        "Career Assistance - Career guidance and skill development programs for students to prepare for future careers",
        "Awareness  Programs - Workshops and activities promoting equality, inclusivity, disability awareness, and respect for diverse backgrounds",
      ],
    },
    {
      title: "Who Can Approach the EOC",
      content:
        "<strong>SC/ST/OBC Students:</strong> Students from the SC, ST, and OBC communities who require any assistance in resolving any issues<br/><br/><strong>Persons with Disabilities (PwD):</strong> Students who are having some physical disability or vision problems or learning difficulties or any other kind of disability<br/><br/><strong>Women Facing Gender-Based Challenges:</strong> Women who are finding it difficult for education and career opportunities and even safety at campus<br/><br/><strong>Individuals:</strong> Individuals facing any kind of discrimination due to their religion, caste, language and cultural background",
    },
  ];

  return (
    <GenericInfoPage
      badge="EQUITY & INCLUSION"
      title="Equal Opportunity Cell"
      subtitle="Empowering Diversity, Ensuring Equality"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Equal Opportunity Cell" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Need Support?",
        description:
          "Contact us for any concerns related to equal opportunity, discrimination, or accessibility. All communications are confidential.",
        email: "info@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
