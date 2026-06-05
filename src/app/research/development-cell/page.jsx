import Link from "next/link";
import "@/styles/SimplePage.css";
import "@/styles/About.css";

export const metadata = {
  title: "Research & Development Cell | Manipur International University",
  description:
    "MIU Research & Development Cell promotes research culture, innovation, and PhD programs aligned with NEP 2020.",
};

export default function ResearchDevelopmentCell() {
  return (
    <div className="simple-page">
      {/* Hero */}
      <div className="simple-hero">
        <div className="container">
          <nav className="simple-breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span className="bc-sep">›</span>
            <span>
              <a
                href="/research/overview"
                style={{ color: "var(--lpu-orange)" }}
              >
                Research
              </a>
            </span>
            <span className="bc-sep">›</span>
            <span>Research & Development Cell</span>
          </nav>
          <span className="simple-badge">RESEARCH & INNOVATION</span>
          <h1>Research and Development Cell</h1>
          <p className="simple-subtitle">
            Fostering research excellence, innovation, and industry
            collaboration at Manipur International University.
          </p>
        </div>
      </div>

      <div className="container simple-body">
        {/* Introduction */}
        <div className="simple-section">
          <h2 className="simple-sec-title">Introduction</h2>
          <p className="simple-sec-content">
            Manipur International University (MIU) is committed to fostering a
            strong culture of research, innovation, and industry collaboration
            in alignment with its statutory objectives and academic vision. To
            strengthen and institutionalize its research initiatives, the
            University has established a Research and Development Cell (RDC).
          </p>
          <p className="simple-sec-content" style={{ marginTop: "12px" }}>
            The RDC functions as a dedicated platform to promote research
            excellence, encourage consultancy projects, and facilitate
            collaborations with national and international universities,
            research institutions, and industries. It aims to create an
            ecosystem that supports interdisciplinary research,
            innovation-driven learning, and practical application of knowledge.
          </p>
          <p className="simple-sec-content" style={{ marginTop: "12px" }}>
            This initiative is aligned with the goals of the National Education
            Policy (NEP) 2020 and reflects MIU's commitment to advancing
            high-quality, impactful research that contributes to academic
            growth, societal development, and global engagement.
          </p>
        </div>

        {/* Objectives */}
        <div className="simple-section">
          <h2 className="simple-sec-title">
            Objectives of the Research and Development Cell
          </h2>
          <p className="simple-sec-content" style={{ marginBottom: "16px" }}>
            The RDC aims to:
          </p>
          <ol className="rdc-list">
            <li>
              <strong>Promote Research Excellence:</strong> To create a
              supportive and dynamic environment that encourages high-quality
              research, innovation, and scholarly contributions across
              disciplines.
            </li>
            <li>
              <strong>Enhance Collaboration:</strong> To facilitate meaningful
              national and international collaborations with academic
              institutions, research organizations, and industry partners.
            </li>
            <li>
              <strong>Foster Consultancy Projects:</strong> To encourage faculty
              members and students to undertake consultancy assignments,
              enabling knowledge transfer, industry engagement, and resource
              generation.
            </li>
            <li>
              <strong>Encourage Interdisciplinary Research:</strong> To promote
              research initiatives that address complex, real-world challenges
              through multidisciplinary and integrated approaches.
            </li>
            <li>
              <strong>Ensure Sustainability:</strong> To align research
              activities with the principles of environmental responsibility,
              social relevance, and sustainable development.
            </li>
          </ol>
        </div>

        {/* Functions */}
        <div className="simple-section">
          <h2 className="simple-sec-title">
            Functions of the Research and Development Cell
          </h2>
          {[
            {
              title: "1. Research Facilitation",
              points: [
                "Formulate and implement research policies in alignment with UGC guidelines and global best practices",
                "Identify emerging and priority research areas and support their development",
                "Provide seed funding for pilot studies to encourage innovation and scalable research initiatives",
              ],
            },
            {
              title: "2. Management of Consultancy Projects",
              points: [
                "Establish collaborations with industries, government bodies, and non-governmental organizations for consultancy assignments",
                "Ensure transparent and equitable sharing of consultancy revenue among stakeholders",
                "Develop and enforce guidelines for ethical, high-quality consultancy practices",
              ],
            },
            {
              title: "3. International Collaboration",
              points: [
                "Build partnerships with reputed international universities and research institutions for joint research initiatives and academic exchange",
                "Facilitate mobility of students and researchers through formal collaborations and MoUs",
                "Organize international seminars, conferences, and workshops to promote knowledge exchange and global engagement",
              ],
            },
            {
              title: "4. Industry Collaboration",
              points: [
                "Promote strong linkages with industry to encourage applied research and innovation",
                "Establish Centers of Excellence in collaboration with industry partners for specialized research and development",
                "Facilitate internships, live projects, and research fellowships to bridge the gap between academia and industry",
              ],
            },
            {
              title: "5. Capacity Building",
              points: [
                "Organize workshops, training programs, and conferences to enhance research skills and competencies",
                "Provide mentorship and guidance to early-career researchers and scholars",
                "Encourage continuous professional development and academic growth",
              ],
            },
            {
              title: "6. Intellectual Property and Commercialization",
              points: [
                "Support researchers in patent filing, copyright protection, and other intellectual property rights",
                "Facilitate the commercialization and transfer of research outcomes for societal and economic impact",
                "Promote innovation-driven entrepreneurship and start-up initiatives",
              ],
            },
          ].map((fn, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--lpu-black)",
                }}
              >
                {fn.title}
              </h3>
              <ul className="rdc-bullet-list">
                {fn.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Governance Table */}
        <div className="simple-section">
          <h2 className="simple-sec-title">
            Governance and Constitution of the RDC
          </h2>
          <p className="simple-sec-content" style={{ marginBottom: "20px" }}>
            The RDC operates as a statutory body under Section 36 of the Manipur
            International University Act, 2018. Its governance structure
            includes:
          </p>
          <div className="rdc-table-wrap">
            <table className="rdc-table">
              <thead>
                <tr>
                  <th>Designation</th>
                  <th>Role and Responsibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chairperson</td>
                  <td>
                    Vice-Chancellor; provides strategic leadership to the RDC.
                  </td>
                </tr>
                <tr>
                  <td>Coordinator</td>
                  <td>
                    Senior faculty member overseeing the daily functioning of
                    the RDC.
                  </td>
                </tr>
                <tr>
                  <td>Industry Representative</td>
                  <td>
                    Liaises between the university and industries for
                    collaborative projects.
                  </td>
                </tr>
                <tr>
                  <td>Research Experts</td>
                  <td>
                    Senior researchers from within and outside the university to
                    guide research priorities.
                  </td>
                </tr>
                <tr>
                  <td>Student Representative</td>
                  <td>
                    Represents the student research community and ensures
                    inclusivity.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PhD Scholar Categories */}
        <div className="simple-section">
          <h2 className="simple-sec-title">
            Admission Eligibility and Process
          </h2>
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: "700",
              marginBottom: "12px",
              color: "var(--lpu-black)",
            }}
          >
            Ph.D. Scholar Categories
          </h3>
          <p className="simple-sec-content" style={{ marginBottom: "16px" }}>
            An applicant seeking admission to the Ph.D. program at MIU shall
            apply under one of the following categories:
          </p>
          <ol className="rdc-list">
            <li>
              <strong>Sponsored Candidates:</strong> Candidates sponsored by
              Government, Semi-Government, Private Organizations, or other
              recognized bodies. <em>Mode: Full-Time / Part-Time</em>
            </li>
            <li>
              <strong>Regular Self-Financed Candidates:</strong> Self-sponsored
              students, self-employed individuals, or working/non-working
              professionals. <em>Mode: Full-Time / Part-Time</em>
            </li>
            <li>
              <strong>Corporate Research Scholars:</strong> Professionals with
              minimum 10 years of work experience. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Working Faculty (External):</strong> Faculty members
              working in other universities, colleges, or recognized
              institutions. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Regular Academic Staff of MIU:</strong> Permanent academic
              staff members of MIU. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Regular Non-Academic Staff of MIU:</strong> Permanent
              non-academic staff members of the University.{" "}
              <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Research Fellows (JRF/SRF/RA) – MIU Projects:</strong>{" "}
              Candidates working as JRF/SRF/RA in research projects at MIU.{" "}
              <em>Mode: Full-Time Only</em>
            </li>
            <li>
              <strong>
                Research Fellows (JRF/SRF/RA) – External Organizations:
              </strong>{" "}
              Candidates working as JRF/SRF/RA in organizations outside MIU.{" "}
              <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Candidates in Recognized Research Laboratories:</strong>{" "}
              Candidates employed in reputed research laboratories with academic
              collaboration with MIU. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>National Fellowship Awardees:</strong> Candidates
              qualified in UGC/CSIR or equivalent national-level fellowships.{" "}
              <em>Mode: Full-Time Only</em>
            </li>
          </ol>
          <div className="rdc-note">
            <strong>Note:</strong>
            <ul className="rdc-bullet-list" style={{ marginTop: "8px" }}>
              <li>
                The final approval of category and mode of registration is
                subject to verification of documents and University regulations.
              </li>
              <li>
                All candidates must comply with the guidelines of the University
                and applicable regulatory bodies.
              </li>
            </ul>
          </div>
        </div>

        {/* Specializations Table */}
        <div className="simple-section">
          <h2 className="simple-sec-title">Specializations Offered</h2>
          <div className="rdc-table-wrap">
            <table className="rdc-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Department</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <strong>Management</strong>
                  </td>
                  <td>
                    Logistics & Supply Chain Management / Event Management /
                    Hospital Management / Hotel Management / Finance Management
                    / E-Commerce / Human Resource / Information Technology /
                    International Business / Marketing Management / Operations
                    Management / Production Management / Project Management /
                    Retail Management / Digital Marketing Management / Health
                    Safety And Environment / Business Analyst Management
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <strong>Humanities</strong>
                  </td>
                  <td>
                    Economics / English / Geography / Hindi / History / Home
                    Science / Public Administration / Political Science / Social
                    Science / Sociology / Manipuri / Social Work / Yoga /
                    Library Sciences
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <strong>Science</strong>
                  </td>
                  <td>
                    Mathematics / Physics / Chemistry & Biology (PCB) /
                    Chemistry & Math's (PCM) / Zoology / Botany & Chemistry
                    (ZBC) / Psychology / Environmental Science
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <strong>Engineering & Information Technology</strong>
                  </td>
                  <td>
                    Civil / Electrical / Electrical & Electronics / Electronics
                    & Communication / Mechanical / Information Technology /
                    Computer Science
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <strong>Fire & Safety</strong>
                  </td>
                  <td>Fire & Safety / Health & Safety</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PhD Admission Procedure */}
        <div className="simple-section">
          <h2 className="simple-sec-title">Ph.D. Admission Procedure</h2>
          {[
            {
              num: "1",
              title: "Admission Sessions",
              content:
                "Admissions are conducted twice a year:\n· January Session\n· July Session",
            },
            {
              num: "2",
              title: "Eligibility Requirements",
              content:
                "Candidates must meet the prescribed minimum eligibility criteria, including required marks, subject specialization, and academic qualifications as specified for the respective discipline.",
            },
            {
              num: "3",
              title: "Application Process",
              content:
                "· Applications must be submitted online only through the University's official admission portal\n· Candidates are required to upload all mandatory documents in the prescribed format\n· Payment of the application fee must be made through online modes\n· No hard copy submissions will be accepted\n\nNote: Each application form is valid for one program only. Candidates can appear in the selection process only once per session for a particular program.",
            },
            {
              num: "4",
              title: "Part-Time Ph.D. Requirements",
              content:
                "Candidates applying for Part-Time Ph.D. must:\n· Submit employment details at the time of application\n· Provide a No Objection Certificate (NOC) from the employer at the time of admission/registration",
            },
            {
              num: "5",
              title: "Document Submission",
              content:
                "Applicants must upload all required documents, including:\n· Academic certificates and mark sheets\n· Identity proof\n· Research proposal / preliminary research idea\n· Experience certificate (if applicable)\n· Category certificate (if applicable)",
            },
            {
              num: "6",
              title: "Application Tracking and Updates",
              content:
                "After submission, candidates can log in to the admission portal to:\n· Check application status\n· Verify document submission\n· View shortlisting status\n· Download admit card (if applicable)\n· Check selection results\n· Download admission offer letter\n· Confirm fee payment status\n\nImportant: All communication will be made available only on the admission portal.",
            },
            {
              num: "7",
              title: "Selection Process",
              content:
                "Eligible candidates will undergo:\n· Ph.D. Entrance Test (PET) – assessing research aptitude and subject knowledge\n· Personal Interview / Viva Voce – including discussion on research proposal\n\nNote: Candidates qualified in UGC-NET / JRF / equivalent examinations may be exempted from PET, but must appear for the interview.",
            },
            {
              num: "8",
              title: "Selection and Admission Offer",
              content:
                "· Selected candidates will be notified through the admission portal\n· A provisional admission letter will be made available for download\n· The letter will include details of fee payment, reporting schedule, and commencement of academic session",
            },
            {
              num: "9",
              title: "Confirmation of Admission",
              content:
                "Admission is confirmed only after:\n· Verification of original documents\n· Submission of required certificates (including NOC, if applicable)\n· Payment of prescribed fees within the stipulated time\n\nNote: The admission offer is provisional and valid only for the specific program and session.",
            },
            {
              num: "10",
              title: "General Instructions",
              content:
                "· Candidates applying for multiple programs must ensure they appear in selection processes on different dates\n· The University reserves the right to modify admission procedures as per regulatory guidelines\n· All applicants must comply with University rules and regulations",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                marginBottom: "20px",
                paddingLeft: "16px",
                borderLeft: "3px solid var(--lpu-orange)",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--lpu-black)",
                }}
              >
                {step.num}. {step.title}
              </h3>
              <p
                style={{
                  whiteSpace: "pre-line",
                  color: "#444",
                  fontSize: "0.95rem",
                  lineHeight: "1.8",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                {step.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div
          className="simple-section"
          style={{ background: "var(--lpu-black)", color: "white" }}
        >
          <h2 style={{ color: "white", marginBottom: "12px" }}>
            Contact Information
          </h2>
          <p
            style={{
              color: "#ccc",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              textTransform: "none",
            }}
          >
            For research-related queries, collaboration opportunities, or
            funding information:
          </p>
          <p style={{ marginTop: "12px", fontSize: "1.05rem" }}>
            📧{" "}
            <a
              href="mailto:research@miu.edu.in"
              style={{ color: "var(--lpu-orange)", textDecoration: "none" }}
            >
              research@miu.edu.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
