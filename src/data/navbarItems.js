const navbarItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    subItems: [
      { label: "Overview", href: "/about" },
      { label: "Governing Body", href: "/about/governance" },
      { label: "Academic Council", href: "/about/academic-council" },
      { label: "IQAC", href: "/about/iqac" },
      {
        label: "Leadership",
        subItems: [
          {
            label: "Chancellor",
            href: "/about/leadership/chancellor",
            image: "/api/images/6a1e9d3689109322c2daa756",
          },
          {
            label: "Vice Chancellor",
            href: "/about/leadership/vice-chancellor",
            image: "/api/images/6a1e7e4cdcc1280cb214b4f5",
          },
          { label: "Registrar", href: "/about/leadership/registrar" },
          {
            label: "Controller of Examinations",
            href: "/about/leadership/controller-of-examinations",
          },
        ],
      },
      {
        label: "Committees",
        subItems: [
          {
            label: "Internal Complaints Committee",
            href: "/student-life/icc",
          },
          {
            label: "Equal Opportunity Cell",
            href: "/student-life/equal-opportunity-cell",
          },

          { label: "Ombudsperson", href: "/student-life/ombudsperson" },
          {
            label: "Project Development Cell",
            href: "/student-life/project-development-cell",
          },
          { label: "SEDG Cell", href: "/student-life/sedg-cell" },
        ],
      },
      {
        label: "Affiliations & Accreditation",
        href: "/about/affiliations-accreditation",
      },
      {
        label: "Public Self Disclosure",
        href: "/about/public-self-disclosure",
      },
    ],
  },
  {
    label: "Schools",
    subItems: [
      {
        label: "School of Engineering and Information Technology",
        href: "/schools/school-of-engineering-and-information-technology",
      },
      {
        label: "School of Commerce and Management",
        href: "/schools/school-of-commerce-and-management",
      },
      {
        label: "School of Science",
        href: "/schools/school-of-science",
      },
      {
        label: "School of Vocational Studies",
        href: "/schools/school-of-vocational-studies",
      },
      {
        label: "School of Arts and Humanities",
        href: "/schools/school-of-arts-and-humanities",
      },
      {
        label: "School of Fire & Safety",
        href: "/schools/school-of-fire-&-safety",
      },
      {
        label: "School of Paramedical Sciences",
        href: "/schools/school-of-paramedical-sciences",
      },
      {
        label: "School of Library and Information Science",
        href: "/schools/school-of-library-and-information-science",
      },
      {
        label: "School of Journalism & Mass Communication",
        href: "/schools/school-of-journalism-&-mass-communication",
      },
    ],
  },
  {
    label: "All Courses",
    href: "/courses",
  },
  {
    label: "Research",
    subItems: [
      { label: "Overview", href: "/research/overview" },
      { label: "Development Cell", href: "/research/development-cell" },
      { label: "Projects", href: "/research/projects" },
      { label: "Publications", href: "/research/publications" },
    ],
  },
  {
    label: "Examination",
    subItems: [{ label: "Results", href: "/examination/results" }],
  },
  {
    label: "Admissions",
    subItems: [
      { label: "Admission Process", href: "/admissions/process" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Rules for Admission", href: "/admissions/rules" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
      { label: "Brochure Download", href: "/academics/brochure" },
      { label: "Reservation Roster", href: "/reservation-roster" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Student Life",
    subItems: [
      { label: "Sports Facilities", href: "/student-life/sports" },
      { label: "Hostel", href: "/student-life/hostel" },
      { label: "Anti-Ragging Cell", href: "/student-life/anti-ragging" },
      { label: "Grievance Cell", href: "/student-life/grievance-cell" },

      { label: "Awards", href: "/student-life/awards" },

      { label: "Health Facilities", href: "/student-life/health-facilities" },
    ],
  },
  {
    label: "Notices",
    href: "/notices-and-announcements",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default navbarItems;
