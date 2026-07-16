import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "Project Development Cell | Manipur International University",
  description:
    "MIU Project Development Cell fosters innovation for sustainable development through research-oriented projects.",
  keywords:
    "MIU project development, innovation, sustainable development, research projects, skill development",
};

export default function ProjectDevelopmentCell() {
  const sections = [
    {
      icon: "📊",
      title: "Fostering Innovation for Sustainable Development",
      content:
        "Manipuri International University (MIU) is a hub for innovative activities where the PDC helps students, researchers and faculty members develop projects from ideas. Our aim is to promote research, innovation and development through collaboration with government ministries and other institutions so that we can find ways to improve the lives of people in Manipur.",
    },
    {
      title: "Project Development Director",
      content:
        "<strong>Dearson Pamei</strong><br/>Director, Project Development Cell<br/><br/>The director manages the project development cell through research, innovation and development. The cell helps the students and faculty members develop projects from ideas and collaborate with government and industries.",
    },
    {
      title: "Our Achievements",
      content:
        "<strong>20+</strong> Successful Projects<br/><strong>INR 50 Lakhs +</strong> Funding Received<br/><strong>15+</strong> Industry Partners<br/><strong>100+</strong> Students Mentored",
    },
    {
      title: "Vision",
      content:
        "To encourage innovations and project-based learning in order to solve problems that aid in the growth of Manipur and the country.",
    },

    {
      title: "Mission",
      content:
        "It is designed to support research and innovations. <br/>Encouraging students and faculty in coming up with projects. <br/>Collaboration with government, industries and other bodies.<br/>It also provides financial assistance for R&D projects.",
    },

    {
      title: "Objectives",
      cards: [
        {
          icon: "💡",
          title: "Innovation",
          content:
            "This establishes an environment that allows innovation to flourish.",
        },
        {
          icon: "👨",
          title: "Projects by Students and Faculty",
          content:
            "This fosters projects which help to solve practical problems and contribute to society.",
        },
        {
          icon: "🤝",
          title: "Collaboration",
          content:
            "Collaborates with governmental departments, industries, and NGOs for R&D activities.",
        },
        {
          icon: "📝",
          title: "Project Management",
          content:
            "This assists in preparing project proposals and implementing projects.",
        },
        {
          icon: "🎯",
          title: "National Projects",
          content:
            "Fosters projects related to National Education Policy (NEP 2020) and other national initiatives.",
        },
        {
          icon: "🛠️",
          title: "Skill Development",
          content:
            "This offers skill enhancement training opportunities to students/researchers.",
        },
      ],
    },
    {
      title: "Collaboration with the National Innovation Foundation",
      content:
        "The project development cell collaborates with the National Innovation Foundation (NIF) and Department of Science & Technology (DST), Government of India for innovation and research.<br/>The functions include:<br/>• It fosters innovations among students, faculty members and local community people<br/>• It provides support for research, prototype, patents and technologies<br/>• Organizing innovation challenges and competitions<br/>• Linkage between innovators, government agencies and industries<br/>• Support for research and skill development projects sponsored by various ministries",
    },
    {
      title: "Opportunities for Students and Faculty Members",

      list: [
        "Innovation Challenges: Participate in contests and hackathons to solve practical problems.",
        "Developing Ideas: Seek mentoring to turn your ideas into a project.",
        "Funding Help: Obtain help in securing funding for your research and projects.",
        "Projects by Ministry: Work on projects funded by Ministries such as DST, NIF, etc.",
        "National and International Presence: Showcase your work in conferences and exhibitions.",
        "Skill Development: Enroll yourself in training courses to develop skills.",
      ],
    },
  ];

  return (
    <GenericInfoPage
      badge="INNOVATION & DEVELOPMENT"
      title="Project Development Cell"
      subtitle="Transforming Ideas into Impactful Solutions"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Project Development Cell" },
      ]}
      sections={sections}
      contactInfo={{
        title: "Start Your Project Journey",
        description:
          "Have a project idea or need guidance? Reach out to our Project Development Cell.",
        email: "projects@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
