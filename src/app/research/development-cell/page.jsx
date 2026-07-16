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
            The research and developments cell (RDC) at Manipur International
            University (MIU) promotes research, innovation and collaboration. It
            encourages students and faculty to take part in research projects,
            consultancy work, and partnership with universities, research
            organizations and industries.
          </p>
          <p className="simple-sec-content" style={{ marginTop: "12px" }}>
            The RDC supports new ideas, interdisciplinary research and practical
            solutions to real world problems. It also works in line with the
            national education policy (NEP) 2020 to improve the quality and
            impact of research at the university.
          </p>
        </div>

        {/* Objectives */}
        <div className="simple-section">
          <h2 className="simple-sec-title">Objectives</h2>

          <p className="simple-sec-content" style={{ marginBottom: "16px" }}>
            The research and development cell aims to:
          </p>
          <ol className="rdc-list">
            <li>It encourages quality research and innovation.</li>
            <li>Support research projects in different fields.</li>
            <li>
              Build a partnership with universities, industries and research
              organizations.
            </li>
            <li>Promotes consultancy projects for faculty and students.</li>
            <li>It encourages interdisciplinary research.</li>
            <li>
              It supports research that benefits society and promotes
              sustainable development.
            </li>
          </ol>
        </div>

        {/* Functions */}
        <div className="simple-section">
          <h2 className="simple-sec-title">Functions of the RDC</h2>
          {[
            {
              title: "1. Research Support",
              points: [
                "It develops policies and guidelines.",
                "It identifies important research areas.",
                "It provides support for new research projects and pilot studies.",
              ],
            },
            {
              title: "2. Consultancy Projects",
              points: [
                "Work with industries, governments departments and organizations on consultancy projects.",
                "They make sure fair and transparent management of consultancy work.",
                "It promotes ethical and professional research practices.",
              ],
            },
            {
              title: "3. National and International Collaboration",
              points: [
                "It builds partnerships with universities and research institutions in India and abroad",
                "It supports joint research projects and academic exchange",
                "It organizes seminars, conferences and workshops",
              ],
            },
            {
              title: "4. Industry Collaboration",
              points: [
                "It encourages research in partnership with industries.",
                "It supports internships, live projects and research fellowships.",
                "It promotes industry based research and innovation.",
              ],
            },
            {
              title: "5. Research Training",
              points: [
                "It conducts workshops and training programs to improve research skills",
                "It guides young researchers and research scholars",
                "It encourages continuous learning and professional development",
              ],
            },
            {
              title: "6. Intellectual Property",
              points: [
                "It helps researchers with patent filing and copyright registration",
                "It supports the transfer of research outcomes for practical use",
                "It encourages innovation, entrepreneurship and start-up activities",
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
          <h2 className="simple-sec-title">Governance of the RDC</h2>
          <p className="simple-sec-content" style={{ marginBottom: "20px" }}>
            The research and developments cell function under section36 of the
            Manipur International University Act, 2018. Its members include:
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
                  <td>Provides overall leadership to the RDC.</td>
                </tr>
                <tr>
                  <td>Coordinator</td>
                  <td>Manages the day-to-day activities of the RDC.</td>
                </tr>
                <tr>
                  <td>Industry Representative</td>
                  <td>
                    Connects the University with industries for collaborative
                    projects.
                  </td>
                </tr>
                <tr>
                  <td>Research Experts</td>
                  <td>Provide guidance on research and innovation.</td>
                </tr>
                <tr>
                  <td>Student Representative</td>
                  <td>Represents the interests of research students.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PhD Scholar Categories */}
        <div className="simple-section">
          <h2 className="simple-sec-title">P.h.D Admission Categories</h2>

          <p className="simple-sec-content" style={{ marginBottom: "16px" }}>
            Applicants can apply for the P.h.D programmes under the following
            categories:
          </p>
          <ol className="rdc-list">
            <li>
              <strong>Sponsored Candidates:</strong> Candidates sponsored by
              government departments, private organizations and other recognized
              institutes. <em>Mode: Full-Time / Part-Time</em>
            </li>
            <li>
              <strong>Self-Financed Candidates:</strong> Students or working
              professionals who wish to pursue a Ph.D. on their own.{" "}
              <em>Mode: Full-Time / Part-Time</em>
            </li>
            <li>
              <strong>Corporate Research Scholars:</strong> Professionals with
              at least 10 years of work experience.{" "}
              <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Faculty from Other Institutions:</strong> Teachers working
              in recognized universities or colleges.{" "}
              <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>MIU Academic Staff:</strong> Permanent teaching staff of
              Manipur International University. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>MIU Non-Academic Staff:</strong> Permanent non-teaching
              staff of the University. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Research Fellows (MIU Projects):</strong> Candidates
              working as JRF, SRF, or RA in research projects at MIU.{" "}
              <em>Mode: Full-Time Only</em>
            </li>
            <li>
              <strong>Research Fellows (External Organizations):</strong>{" "}
              Candidates working as JRF, SRF, or RA in research projects outside
              MIU. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>Candidates from Research Laboratories:</strong>{" "}
              Researchers working in recognized laboratories that have academic
              collaboration with MIU. <em>Mode: Part-Time Only</em>
            </li>
            <li>
              <strong>National Fellowship Awardees:</strong> Candidates who have
              qualified for UGC, CSIR, or other national-level fellowships.{" "}
              <em>Mode: Full-Time Only</em>
            </li>
          </ol>
          <div className="rdc-note">
            <strong>Please Note:</strong>
            <ul className="rdc-bullet-list" style={{ marginTop: "8px" }}>
              <li>
                Final determination of category and method of registration
                depends on documentation and regulations of the University.
              </li>
              <li>
                All applicants should abide by the guidelines of the University
                and other relevant regulatory bodies.
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
              title: "Eligibility Criteria",
              content:
                "The candidates should fulfill the minimum eligibility criteria as prescribed, which includes the prescribed marks, subject specialization, etc., as specified for the particular discipline.",
            },
            {
              num: "3",
              title: "Application Procedure",
              content:
                "· Applications can be submitted online only on the official portal of the university\n· The candidate needs to upload all the necessary documents in the prescribed format\n· Application fee should be paid through online means\n· Hard copy submission shall not be entertained\n\nNote: Each application form is valid for only one program. Candidates can apply for the selection process once only in a session for the concerned program.",
            },
            {
              num: "4",
              title: "Part-Time Ph.D.",
              content:
                "Candidates seeking admission in the Part-time Ph.D. course have to:\n· Submit their employment details while submitting their applications\n· Submit the No Objection Certificate from their employers during admission/registration process",
            },
            {
              num: "5",
              title: "Upload of Documents",
              content:
                "The candidates should upload all the documents as follows:\n· Academic certificates & mark sheets\n· Identity proof\n· Research proposal / preliminary research idea\n· Experience certificate (if any)\n· Category certificate (if any)",
            },
            {
              num: "6",
              title: "Tracking & Updates",
              content:
                "Upon submission, applicants are expected to login to the admissions portal for checking their:\n· Application status\n· Document submission status\n· Short-listing status\n· Admit card (if any)\n· Selection status\n· Admission offer letter\n· Fee payment status\n\nImportant: All communications will be provided on the admission portal alone.",
            },
            {
              num: "7",
              title: "Selection Process",
              content:
                "The eligible candidates will be called for:\n· Ph.D. Entrance Test (PET) – evaluating the research aptitude and subject knowledge of the applicant.\n· Personal Interview / Viva Voce – including discussion of research proposal\n\nNote: The candidates who have qualified in the UGC-NET / JRF / equivalent examination shall be exempted from taking the Ph.D. Entrance Test (PET).",
            },
            {
              num: "8",
              title: "Selection and Admission Offer",
              content:
                "· Notification to selected candidates will be sent through the admissions portal\n· Provisional admission letter will be sent for download\n· This letter will contain details about the payment of fee and start of academic session",
            },
            {
              num: "9",
              title: "Confirmation of Admission",
              content:
                "Confirmation of admission will happen only upon:\n· Verification of originals\n· Presentation of relevant certificates (NOC, if any)\n· Payment of requisite fee within the specified time frame\n\nNote: Admission offer is tentative and valid only for the stated program & session.",
            },
            {
              num: "10",
              title: "General Instructions",
              content:
                "· Candidates seeking admission to more than one program should take care to participate in selection process at different dates\n· University reserves the right to change admission procedure as per regulatory requirement\n· Applicants are required to follow rules and regulations of the University",
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
