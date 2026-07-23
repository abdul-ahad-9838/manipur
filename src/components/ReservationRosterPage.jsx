import "@/styles/ReservationRosterPage.css";
import Link from "next/link";

export default function ReservationRosterPage() {
  const reservationData = [
    {
      category: "SC",
      fullName: "Scheduled Castes",
      percentage: "15%",
      allocation: "15 Seats",
    },
    {
      category: "ST",
      fullName: "Scheduled Tribes",
      percentage: "7.5%",
      allocation: "7–8 Seats",
    },
    {
      category: "OBC",
      fullName: "Other Backward Classes",
      percentage: "27%",
      allocation: "27 Seats",
    },
    {
      category: "EWS",
      fullName: "Economically Weaker Sections",
      percentage: "10%",
      allocation: "10 Seats",
    },
    {
      category: "UR",
      fullName: "Unreserved",
      percentage: "40.3%",
      allocation: "40–41 Seats",
    },
    {
      category: "PWD",
      fullName: "Persons with Disabilities",
      percentage: "As per norms",
      allocation: "Applied across all categories",
      special: true,
    },
  ];

  return (
    <div className="reservation-roster-page">
      {/* Hero */}
      <div className="reservation-hero">
        <div className="container">
          <nav className="reservation-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/about">About</Link>
            <span>›</span>
            <span>Reservation Roster</span>
          </nav>
          <span className="reservation-badge">ADMISSIONS</span>
          <h1>Reservation Roster</h1>
          <p className="reservation-hero-subtitle">
            Guaranteeing fairness, equality and inclusive development for all
            students and employees.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="reservation-body">
        <div className="container">
          <div className="reservation-content-card">
            {/* Overview */}
            <div className="reservation-overview">
              <div className="overview-icon">🎓</div>
              <h2>Overview</h2>
              <p>
                Maipur International University (MIU) adheres to principles of
                fairness, equality and inclusive developments of all students
                and employees. It complies with reservation rules set forth by
                the Government of India. In order to ensure transparency and
                consistency in the admission process and hiring process, MIU
                adopts a structured system of Reservation Rosters.
              </p>
            </div>

            {/* Reservation Policy */}
            <div className="reservation-policy-section">
              <h2>Reservation Policy at MIU</h2>
              <p className="section-intro">
                The university follow the guidelines of the reservation policy
                for the following groups:
              </p>

              <div className="categories-grid">
                <div className="category-card sc-card">
                  <div className="category-icon">📊</div>
                  <h3>SC</h3>
                  <p>Scheduled Castes</p>
                </div>
                <div className="category-card st-card">
                  <div className="category-icon">🏔️</div>
                  <h3>ST</h3>
                  <p>Scheduled Tribes</p>
                </div>
                <div className="category-card obc-card">
                  <div className="category-icon">👥</div>
                  <h3>OBC</h3>
                  <p>Other Backward Classes</p>
                </div>
                <div className="category-card ews-card">
                  <div className="category-icon">💼</div>
                  <h3>EWS</h3>
                  <p>Economically Weaker Sections</p>
                </div>
                <div className="category-card pwd-card">
                  <div className="category-icon">♿</div>
                  <h3>PWD</h3>
                  <p>Persons with Disabilities</p>
                </div>
              </div>

              <p className="policy-note">
                This system ensures that eligible candidates from all
                backgrounds are given fair opportunities in accordance with
                government norms.
              </p>
            </div>

            {/* Key Features */}
            <div className="key-features-section">
              <h2>Key Features of the Reservation Roster</h2>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">⚖️</div>
                  <h3>Fair Allocation</h3>
                  <p>It ensures a fair distribution of seats and positions.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">🔄</div>
                  <h3>Updating:</h3>
                  <p> Regularly updated according to governments rules.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">🔍</div>
                  <h3>Transparency</h3>
                  <p>
                    It ensures transparency in the process of admission and
                    hiring.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">✅</div>
                  <h3>Compliance</h3>
                  <p>
                    It helps to comply with national and regional reservation
                    policy guidelines.
                  </p>
                </div>
              </div>
            </div>

            {/* 100-Point Roster System */}
            <div className="roster-system-section">
              <div className="system-icon">💯</div>
              <h2>100-Point Roster System</h2>
              <p>
                The MIU implements the <strong>100-point roster system</strong>.
                This is a well known system that is normally applied when
                allocating position within various categories. One point in the
                roaster system represents one seat or position. Categories are
                divided according to their reservation percentage. It ensures
                systematic application of the reservation policy.
              </p>

              <ul className="system-points">
                <li>Each point in the roster represents a seat or position</li>
                <li>
                  Categories are assigned based on prescribed reservation
                  percentages
                </li>
                <li>
                  Ensures a systematic and transparent implementation of
                  reservation policies
                </li>
              </ul>
            </div>

            {/* Reservation Table */}
            <div className="reservation-table-section">
              <h2>Applicable Reservation Percentages</h2>

              <div className="reservation-table-wrapper">
                <table className="reservation-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Reservation Percentage</th>
                      <th>Allocation in 100-Point Cycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationData.map((item, index) => (
                      <tr
                        key={index}
                        className={item.special ? "special-row" : ""}
                      >
                        <td className="category-cell">
                          <div className="category-badge">{item.category}</div>
                          <span className="category-full-name">
                            {item.fullName}
                          </span>
                        </td>
                        <td className="percentage-cell">
                          <span className="percentage-value">
                            {item.percentage}
                          </span>
                        </td>
                        <td className="allocation-cell">{item.allocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-note">
                <div className="note-icon">ℹ️</div>
                <p>
                  <strong>Note:</strong> Reservation for Persons with
                  Disabilities (PWD) is applied across all categories
                  (horizontal reservation), meaning seats are reserved within
                  each category as per applicable guidelines.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="reservation-contact-box">
              <h3>Contact Information</h3>
              <p>
                For any queries or further information regarding the Reservation
                Roster, students and stakeholders may contact:
              </p>
              <div className="contact-office">
                <div className="office-icon">🏛️</div>
                <h4>Office of the Registrar</h4>
                <p>Manipur International University</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <a href="mailto:admission@miu.edu.in">
                      admission@miu.edu.in
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <a href="tel:+919319727766">+91 9319727766</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="reservation-quick-links">
            <h3>Related Information</h3>
            <div className="quick-links-grid">
              <Link href="/admissions/process" className="quick-link-card">
                <span className="link-icon">🎓</span>
                <h4>Admissions</h4>
                <p>Apply for admission to MIU</p>
              </Link>
              <Link
                href="/admissions/fee-structure"
                className="quick-link-card"
              >
                <span className="link-icon">💰</span>
                <h4>Fee Structure</h4>
                <p>View detailed fee information</p>
              </Link>
              <Link href="/contact" className="quick-link-card">
                <span className="link-icon">✉️</span>
                <h4>Contact Us</h4>
                <p>Get in touch with our team</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
