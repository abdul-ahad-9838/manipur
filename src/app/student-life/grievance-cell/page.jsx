import GenericInfoPage from "@/components/GenericInfoPage";
import "@/styles/GrievanceCellPage.css";

export const metadata = {
  title: "Grievance Cell | Manipur International University",
  description:
    "MIU Grievance Cell provides a transparent mechanism for addressing student and staff complaints.",
  keywords:
    "MIU grievance cell, complaint redressal, student grievances, transparency",
};

export default function GrievanceCell() {
  const sections = [
    {
      icon: "📋",
      title: "About Grievance Cell",
      content:
        "The grievance cell of Manipur International University is the forum that facilitates redressal of complaints of students, faculty, and employees of the university in a transparent manner.",
    },
    {
      title: "Procedure for Filing a Grievance",
      content: (
        <div className="grievance-procedure">
          <div className="procedure-flow">
            <div className="procedure-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Submission of Grievance</h3>
                <div className="step-options">
                  <div className="option-card">
                    <span className="option-icon">💻</span>
                    <strong>Online Portal</strong>
                    <p>Submit through our online grievance portal</p>
                  </div>
                  <div className="option-card">
                    <span className="option-icon">✉️</span>
                    <strong>Written Submission</strong>
                    <p>
                      MIU Administrative office, Ghari, Airport road, Imphal
                      West, Manipur - 795140
                    </p>
                    <p>
                      <strong>Email:</strong> miugrievance@miu.edu.in
                    </p>
                  </div>
                </div>
              </div>
              <div className="step-arrow">↓</div>
            </div>

            <div className="procedure-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Required Information</h3>
                <div className="info-checklist">
                  <div className="checklist-item">
                    ✓ Full name and contact details
                  </div>
                  <div className="checklist-item">
                    ✓ Details of the grievance
                  </div>
                  <div className="checklist-item">
                    ✓ Any supporting documents or evidence
                  </div>
                </div>
                <p className="step-note">
                  Complete information helps in faster resolution
                </p>
              </div>
              <div className="step-arrow">↓</div>
            </div>

            <div className="procedure-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Acknowledgment</h3>
                <p>
                  When your complaints reach us, you will get an acknowledgment
                  of your grievance in the stipulated time period. It is an
                  assurance that your complaints are acknowledged and are in
                  process at the Grievance Cell.{" "}
                </p>
                <div className="timeline-badge">
                  ⏱️ Immediate Acknowledgment
                </div>
              </div>
              <div className="step-arrow">↓</div>
            </div>

            <div className="procedure-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Review and Investigation</h3>
                <p>
                  Your complaints will be reviewed and if need be, investigated.
                  All investigations will be done without bias and with complete
                  confidentiality.
                </p>
                <div className="timeline-badge">⏱️ Within 15 Working Days</div>
              </div>
              <div className="step-arrow">↓</div>
            </div>

            <div className="procedure-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Resolution</h3>
                <p>
                  You will be made aware of the resolutions or decisions
                  concerning your grievance. The resolution will be fair and
                  just.
                </p>
                <div className="resolution-options">
                  <div className="resolution-box satisfied">
                    <span>✓</span>
                    <strong>Satisfied</strong>
                    <p>Case Closed</p>
                  </div>
                  <div className="resolution-box not-satisfied">
                    <span>→</span>
                    <strong>Not Satisfied</strong>
                    <p>Proceed to Appeal</p>
                  </div>
                </div>
              </div>
              <div className="step-arrow">↓</div>
            </div>

            <div className="procedure-step final-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Appealing Process</h3>
                <p>
                  If you decide to appeal against the decision, submit your
                  appeal to the higher authority within the stipulated time
                  period after the resolution. Within 15th Days of resolution
                </p>
                <div className="timeline-badge">
                  ⏱️ Within 15 Days of Resolution
                </div>
                <p className="step-note">
                  Higher Committee will review your appeal for a final decision
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <GenericInfoPage
      badge="GRIEVANCE REDRESSAL"
      title="Grievance Cell"
      subtitle="Transparent and fair redressal of complaints"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "Grievance Cell" },
      ]}
      sections={sections}
      contactInfo={{
        title: "File a Grievance",
        description:
          "For submitting grievances or queries about the redressal process.",
        email: "miugrievance@miu.edu.in",
        phone: "+91 9319727766",
      }}
    />
  );
}
