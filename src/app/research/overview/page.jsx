import "@/styles/Research.css";

const researchAreas = [
  {
    code: "ENG",
    name: "Engineering & Technology",
    blurb:
      "In the fast paced digital era Manipur international university technology researchers are focused on building smarter, safer and more efficient digital systems. The key research sub domain include: ",
    subdomains: [
      "Artificial Intelligence",
      "Data Science & Big Data Analytics",
      "Internet of Things (IoT)",
      "Cloud Computing",
      "Software Engineering",
      "Human Computer Interaction",
      "Blockchain Technologies",
      "Robotics & Automation",
      "Computer Vision",
      "Natural Language Processing",
      "Smart Cities & Digital Transformation",
      "Edge Computing",
      "Quantum Computing",
    ],
  },
  {
    code: "BIO",
    name: "Biodiversity & Ecology",
    blurb:
      "Explore the diversity of living organisms and their interaction with the environment. The research will focus on understanding ecosystems, conserving natural resources, protecting endangered species, and addressing environmental challenges. The sub domains included in this are: ",
    subdomains: [
      "Biodiversity Conservation",
      "Wildlife Ecology & Management",
      "Forest Ecology",
      "Environmental Science",
      "Climate Change & Ecosystem Resilience",
      "Sustainable Natural Resource Management",
      "Plant Taxonomy & Systematics",
      "Microbial Ecology",
      "Freshwater & Aquatic Ecosystems",
      "Landscape Ecology & GIS Applications",
    ],
  },
  {
    code: "BUS",
    name: "Business & Economics",
    blurb:
      "The research in this domain will be focused on entrepreneurship, management, policy analysis, innovation and strategy that enhances regional and global economic prosperity. The sub domains covered under this are:",
    subdomains: [
      "Entrepreneurship & Innovation Management",
      "Regional Economic Practices",
      "Sustainable Business Practices",
      "Development Economics",
      "Human Resource Management",
      "Social Entrepreneurship",
      "Rural Development & Inclusive Growth",
      "International Business & Trade",
    ],
  },
  {
    code: "SCI",
    name: "Applied Science",
    blurb:
      "Applies scientific principles to solve practice problems and create impactful technologies. Research will include chemistry, physics, material science, and related fields, contributing for advancement in technologies and industrial innovation. Below are the subdomains of this area:",
    subdomains: [
      "Green Chemistry",
      "Environmental Chemistry",
      "Computational Physics",
      "Biophysics",
      "Analytical Chemistry",
      "Semiconductor Research",
      "Sustainable Industrial Processes",
      "Renewable Energy Technologies",
    ],
  },
];

const rdcFunctions = [
  {
    title: "Research Proposal Support",
    desc: "Helps researchers prepare and submit proposals for funding opportunities.",
  },
  {
    title: "Project Monitoring",
    desc: "Monitors ongoing projects and ensures research activities are completed effectively.",
  },
  {
    title: "Collaboration Facilities",
    desc: "Establishes partnerships with industries, universities and research organisations.",
  },
  {
    title: "Funding Guidance",
    desc: "Provides students with research grants and funding opportunities from various agencies.",
  },
];

const missionPoints = [
  "E-library services",
  "Online journals",
  "Research databases",
  "Digital learning platforms",
  "Online study materials",
];

const keyFunctionOfRDC = [
  "Research proposal support: The cell helps researchers prepare and submit proposals for funding opportunities.",
  "Projects  monitoring:It monitors ongoing projects and ensures that research activities are completed effectively.",
  "Collaboration facilities: the RDC will help in establishing partnerships with industries, universities and research organizations.",
  "Funding guidance: the cell provides students the research grants and funding opportunities available from different agencies. ",
];

const outputs = [
  {
    title: "Research Papers",
    description:
      "Peer-reviewed research publications contributing to academic knowledge and innovation.",
  },
  {
    title: "Journal Articles",
    description:
      "Articles published in recognised national and international journals.",
  },
  {
    title: "Conference Papers",
    description:
      "Research findings presented and published through academic conferences.",
  },
  {
    title: "Patents",
    description:
      "Innovations and intellectual property filed or granted through patent systems.",
  },
];

const ethicsPoints = [
  "Research integrity",
  "Academic honesty",
  "Ethical research practices",
  "Plagiarism prevention",
  "Quality assurance",
  "Responsible use of research data",
];

export default function Page() {
  return (
    <div className="rs-page">
      {/* ───────── HERO ✅ ─────────  */}
      <section className="rs-hero">
        <div className="container">
          <span className="rs-hero-eyebrow">Research & Innovation</span>
          <h1 className="rs-hero-title">
            Research at <em>MIU</em>
          </h1>
          <div style={{ marginBottom: "40px" }}>
            <p className="rs-hero-sub">
              Manipur international university (MIU) is located in imphal
              Manipur. The university is built to create knowledge, improve
              education, and help society grow through research. MIU was
              established in 2018 and is recognised by the university grant
              commission (UGC) and various national bodies.
            </p>
            <p className="rs-hero-sub">
              Research and innovation plays a vital role in the growth of higher
              education institutions. The university believes that research is
              not only limited to academics but it is also a part of
              technological challenges faced by society.
            </p>
            <p className="rs-hero-sub">
              MIU aims to become a leading centre of research and innovation in
              northeast India. The university motivates faculty members,
              researchers, scholars, and students to take part in research
              activities that help the country.
            </p>
            <p className="rs-hero-sub">
              The research projects at MIU are coordinated with the new
              education policy (NEP ) 2020 which highlights multidisciplinary
              education, innovation, entrepreneurship, research innovation, and
              more.
            </p>
            <p className="rs-hero-sub">
              Through the research and development cell (RDC), innovative
              ecosystem, international academic collaboration, and research
              driven program the university helps students prepare for global
              competition while also focusing on solving local problems.{" "}
            </p>
          </div>
          {/* <div className="rs-hero-meta">
            <div>
              <span className="rs-hero-num">2018</span>
              <span className="rs-hero-label">Established</span>
            </div>
            <div>
              <span className="rs-hero-num">4</span>
              <span className="rs-hero-label">Research Domains</span>
            </div>
            <div>
              <span className="rs-hero-num">NEP</span>
              <span className="rs-hero-label">2020 Aligned</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* ───────── VISION / MISSION  ✅ ───────── */}
      <section className="rs-section">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">Research Overview</span>
            <h2 className="rs-section-title">Vision & Mission</h2>
          </div>
        </div>

        <div className="container rs-vm-grid">
          <div className="rs-vm-card">
            <span className="rs-vm-tag">Vision</span>
            <p className="rs-ecosystem-lead">
              The main vision of the MIU is to build a strong research based
              academic environment. This supports innovation, creativity and new
              knowledge. The university aims to become a center of excellence
              where research helps in scientific progress, social change and
              sustainable development.
            </p>
            <p className="rs-ecosystem-lead">
              MIU promotes research that brings different subjects together to
              solve real world problems. The university focuses on work that
              will be beneficial for industry, government, society and more. MIU
              strengthens their research work by working with national and
              international partners. They have gained global recognition and
              contribute knowledge of different fields.
            </p>
          </div>
          <div className="rs-vm-card rs-vm-card--dark">
            <span className="rs-vm-tag">Mission</span>
            <p>
              The mission of MIU is to promote high quality research that
              creates a positive impact on society. The university supports
              research in developing innovative ideas and finding solutions to
              real world problems.
            </p>
            <p>The main objectives of the research mission are:</p>
            <ul className="rs-vm-list">
              {missionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>
              Through these efforts MIU aims to create a research driven
              academic environment where learning and innovation go hand in
              hand.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── RESEARCH ECOSYSTEM ✅ ───────── */}
      <section className="rs-section rs-section--alt">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">
              The environment around the work
            </span>
            <h2 className="rs-section-title">Research Ecosystem</h2>
          </div>

          <p className="rs-ecosystem-lead">
            Manipur international university has developed a supportive research
            environment for students and faculty members. The university
            believes that research should be an important part of academic life.
          </p>
          <p className="rs-ecosystem-lead">
            The research environment at MIU brings curiosity, critical thinking,
            and new ideas. Students are motivated to explore different topics,
            conduct study, and take part in research projects. Faculty members
            are also supported to do research and publish their work. The
            university helps by providing clear research policies, academic
            guidance, workshops and opportunities to work with others.
          </p>
          <p className="rs-ecosystem-lead">
            The research ecosystem includes research projects, innovation
            programs, industry partnerships, conference, workshop and knowledge
            exchange activities. These efforts help create a strong foundation
            for research and developments at the university.
          </p>
        </div>
      </section>

      {/* ───────── Research & Development Cell ✅ ───────── */}

      <section className="rs-section">
        <div className="container">
          <div className="rs-section-head">
            <div className="rs-section-head">
              <span className="rs-section-eyebrow">
                Research & Development Cell
              </span>
              <h2 className="rs-section-title">R N D</h2>
            </div>
            <p>
              The research and development cell (RDC) is the main body
              responsible for promoting research activities at MIU. It works to
              boost the research culture and support innovation across different
              academic disciplines.RDC helps researchers identify opportunities,
              develop projects, and connect with funding agencies.
            </p>
          </div>
        </div>

        <div className="container rs-vm-grid">
          <div className="rs-vm-card">
            <span className="rs-vm-tag">Objectives of RDC </span>

            <p>The main objective of research and development cell are:</p>
            <ul
              className="rs-vm-list rs-vm-list--light"
              style={{ color: "#000 !important" }}
            >
              {[
                "It promotes quality research and innovation.",
                "It encourages interdisciplinary research. ",
                "It supports funded projects.",
                "It develops industry academia partnerships.",
              ].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="rs-vm-card rs-vm-card--dark">
            <span className="rs-vm-tag">Key Function of RDC </span>
            <p>The main objective of research and development cell are:</p>
            <ul className="rs-vm-list">
              {keyFunctionOfRDC.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── Research Areas at MIU ✅  ───────── */}
      <section className="rs-section rs-section--alt">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">Where the work happens</span>
            <h2 className="rs-section-title">Research Domains</h2>
            <p>
              MIU covers a wide range of disciplines for research. The
              university has established strong research groups across several
              major domains allowing students to deep dive into areas that match
              their personal interests and career goals.{" "}
            </p>
          </div>

          <div className="rs-domain-grid">
            {researchAreas.map((area) => (
              <article className="rs-domain-card" key={area.code}>
                <div className="rs-domain-head">
                  <span className="rs-domain-code">{area.code}</span>
                  <h3>{area.name}</h3>
                </div>
                <p className="rs-domain-blurb">{area.blurb}</p>
                <div className="rs-domain-tags">
                  {area.subdomains.map((s) => (
                    <span className="rs-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Research infrastructure  ✅ ───────── */}
      <section className="rs-section">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">Research Infrastructure</span>
            <h2 className="rs-section-title">
              The Research Infrastructure at MIU{" "}
            </h2>
          </div>
        </div>

        <div className="container rs-vm-grid">
          <div className="rs-vm-card">
            <span className="rs-vm-tag">
              Laboratories and research centres{" "}
            </span>
            <p>
              A strong research infrastructure is important for quality
              research. Manipur international university provides the facilities
              and resources needed for research and innovation. The university
              continues to improve its infrastructure to support teaching,
              learning and research activities.
            </p>
            <p>
              The university has laboratories and research facilities that help
              students and faculty members conduct practical research. These
              facilities allow researchers to test ideas, collect data, and
              develop new solutions. The university uses modern equipment and
              technology that is used to support research work in different
              disciplines.
            </p>
            <p>
              The university promotes the development of research centres that
              focus on specific areas of study. These centres encourage
              collaboration among researchers and help to generate new
              knowledge.
            </p>
          </div>
          <div className="rs-vm-card rs-vm-card--dark">
            <span className="rs-vm-tag">Digital Resources</span>
            <p>
              Digital resources play an important role in modern research. MIU
              provides access to various online learning and research tools that
              support academic activities.
            </p>
            <p>Researchers can sue the digital resources like: </p>
            <ul className="rs-vm-list">
              {missionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>
              These resources help researchers stay updated with the latest
              developments in their fields and improve the quality of their
              research work.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Research PROJECTS ✅ ───────── */}
      <section className="rs-section rs-section--alt">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">From idea to outcome</span>
            <h2 className="rs-section-title">Research Projects</h2>
            <p>
              Research projects are an important part of university research
              activities. These projects help generate knowledge, encourage
              innovative ideas, and solve research problems.{" "}
            </p>
          </div>
          <div className="rs-project-grid">
            <div className="rs-project-card">
              <h4>Ongoing</h4>
              <p>
                MIUs faculty members and researcher scholars are actively
                participating in ongoing research projects. These projects cover
                different fields such as technology, management, health science,
                education, environment and social development.
              </p>
              <p>
                Many projects focus on addressing local, national and global
                challenges. Researchers work together to find solutions that can
                benefit society and support sustainable growth.
              </p>
            </div>
            <div className="rs-project-card">
              <h4>Completed</h4>
              <p>
                MIU feels pride in projects that are successfully completed and
                reach their goals. The outcome of these projects improve
                knowledge, support innovation, and provide useful solutions in
                different sectors.
              </p>
              <p>
                These projects also boost the university research profile and
                encourage students to participate in future research activities.
              </p>
            </div>
            <div className="rs-project-card">
              <h4>Sponsored</h4>
              <p>
                The university encourages students to apply for funded research
                projects. Sponsored research allows students to work on large
                scale projects with support from government agencies, industries
                and research organizations.
              </p>
              <p>
                Funding support helps researchers carry out studies, purchase
                equipment and publish research fundings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Publication and Research Output ✅ ───────── */}
      <section className="rs-section ">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">
              Measured by what's published
            </span>
            <h2 className="rs-section-title">Research Output</h2>
            <p>
              Researcher publications are an important measure of academic
              excellence. MIU motivates and provides support to its teacher and
              students to conduct research and publish their projects in
              recognised journals that will be reviewed by experts before
              publication at national and international level.{" "}
            </p>
          </div>
          <div className="rs-output-grid">
            {outputs.map((o) => (
              <div className="rs-output-card" key={o.title}>
                <span className="rs-output-label">{o.title}</span>
                <span className="rs-output-count">{o.description}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "24px" }}>
            The university promotes quality publications that contribute to
            academic progress and social development.
          </p>
        </div>
      </section>

      {/* ───────── COLLABORATION ✅ ───────── */}
      <section className="rs-section rs-section--alt">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">
              Industry and Academic Collaborations
            </span>
            <h2 className="rs-section-title"> Collaborations </h2>
            <p>
              Collaboration is important for research growth. MIU actively works
              with educational institutions, industries, research organizations
              and government agencies to boost their research activities. These
              partnerships create opportunities for joint projects, training
              programs, knowledge sharing and innovation.
            </p>
          </div>
        </div>

        <div className="container rs-collab-grid">
          <div className="rs-collab-card">
            <span className="rs-vm-tag">National</span>
            <p>
              The university aims to build a strong partnership with
              universities, colleges, industries and research organizations all
              over India.
            </p>
            <p>
              These collaborations help researchers gain access to expertise,
              facilities and funding opportunities. They also promote academic
              exchange and joint research activities.
            </p>
          </div>
          <div className="rs-collab-card">
            <span className="rs-vm-tag">International</span>
            <p>
              MIU also focuses on developing partnerships with international
              institutes and research organizations. International
              collaborations help improve global exposure and encourage the
              exchange of ideas, knowledge and best practices. They also create
              opportunities for joint scratch projects and academic
              cooperations.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── STUDENT OPPORTUNITIES ✅ ───────── */}
      <section className="rs-section ">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">Research Opportunities</span>
            <h2 className="rs-section-title"> Collaborations </h2>
            <p>
              Collaboration is important for research growth. MIU actively works
              with educational institutions, industries, research organizations
              and government agencies to boost their research activities. These
              partnerships create opportunities for joint projects, training
              programs, knowledge sharing and innovation.
            </p>
          </div>
          <div className="rs-collab-grid">
            <div className="rs-collab-card">
              <span className="rs-vm-tag">For Students</span>
              <p>
                Research is an important part of students learning at MIU. The
                university motivates students to participate in research
                activities and develop problem solvings skills. Students get
                opportunities to work on research projects under the guidance of
                experienced faculty members. These experiences help them
                understand research methods and improve their analytical skills.
              </p>
            </div>
            <div className="rs-collab-card">
              <span className="rs-vm-tag">
                Conferences, Seminars & Workshops
              </span>
              <p>
                Academic events play an important role in research development.
                MIU regularly organizes and participates in conferences,
                seminars, workshops, and expert sessions.
              </p>
              <p>
                These events provide opportunities for researchers to present
                their work, exchange ideas and learn from experts.
              </p>
              <div className="rs-domain-tags" style={{ marginTop: "16px" }}>
                <span className="rs-tag">National Conferences</span>
                <span className="rs-tag">International Conferences</span>
                <span className="rs-tag">Research Workshops</span>
                <span className="rs-tag">Faculty Development Programs</span>
                <span className="rs-tag">Expert Lectures</span>
                <span className="rs-tag">Industry Interaction Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── ETHICS ───────── ✅ */}
      <section className="rs-section rs-section--alt">
        <div className="container">
          <div className="rs-section-head">
            <span className="rs-section-eyebrow">How the work is done</span>
            <h2 className="rs-section-title">
              Research Ethics and Quality Assurance
            </h2>
            <p>
              Research ethics is an essential part of responsible research.
              Manipur International University promotes honesty, transparency,
              and integrity in all research activities.{" "}
            </p>
            <p>
              The university encourages researchers to follow ethical guidelines
              and maintains high standards of academic conduct.
            </p>
          </div>
          <p className="rs-ethics-label">Important areas of focus include:</p>
          <div className="rs-ethics-row">
            {ethicsPoints.map((point) => (
              <span className="rs-tag rs-tag--dark" key={point}>
                {point}
              </span>
            ))}
            <p>
              The university also follows quality assurance measures to ensure
              that research activities meet academic and professional standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
