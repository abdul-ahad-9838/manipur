import "@/styles/RefundPolicyPage.css";
import Link from "next/link";

export default function RefundPolicyPage() {
  const refundCategories = [
    {
      sno: 1,
      percentage: "100%",
      timing:
        "15 days or more before the formally notified last day of admission",
    },
    {
      sno: 2,
      percentage: "90%",
      timing:
        "Less than 15 days before the formally notified last date of admission",
    },
    {
      sno: 3,
      percentage: "80%",
      timing:
        "15 days or less after the formally notified last date of admission",
    },
    {
      sno: 4,
      percentage: "50%",
      timing:
        "30 days or less, but more than 15 days after formally notified last date of admission",
    },
    {
      sno: 5,
      percentage: "0%",
      timing:
        "More than 30 days after formally notified last date of admission",
    },
  ];

  return (
    <div className="refund-policy-page">
      {/* Hero */}
      <div className="refund-hero">
        <div className="container">
          <nav className="refund-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Refund Policy</span>
          </nav>
          <span className="refund-badge">ADMISSIONS</span>
          <h1>Refund Policy</h1>
          <p className="refund-hero-subtitle">
            Transparent and fair guidelines for fee refunds in case of admission
            withdrawal.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="refund-body">
        <div className="container">
          <div className="refund-content-card">
            {/* <div className="refund-last-updated">
              <span className="update-icon">📅</span>
              <span>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div> */}

            {/* Policy Overview */}
            <div className="refund-overview">
              <div className="overview-icon">📋</div>
              <h2>Policy Overview</h2>
              <p>
                Clear and consistent policies regarding refund of fees in case
                of admission withdrawal. It guarantees transparency,
                consistency, and equity in processing refund applications while
                considering the norms of the institution.
              </p>
              <p>
                The refund will depend on the time when the request is made in
                comparison with the scheduled admission notification. All
                applications for refund should be in writing. The approvals of
                refunds involve some timelines which are dependent on documents
                verification and clearance of any pending dues.
              </p>
            </div>

            {/* Refund Categories */}
            <div className="refund-categories-section">
              <h2>Refund Categories</h2>
              <p className="section-intro">
                The following refund percentages shall apply based on the timing
                of the notice of withdrawal:
              </p>

              <div className="refund-table-wrapper">
                <table className="refund-table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Percentage of Refund</th>
                      <th>Point of Time When Notice is Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundCategories.map((category) => (
                      <tr
                        key={category.sno}
                        className={
                          category.percentage === "100%" ? "highlight-row" : ""
                        }
                      >
                        <td className="sno-cell">{category.sno}</td>
                        <td className="percentage-cell">
                          <span className="percentage-badge">
                            {category.percentage}
                          </span>
                        </td>
                        <td className="timing-cell">{category.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Considerations */}
            <div className="key-considerations">
              <h2>Key Considerations</h2>

              <div className="consideration-grid">
                <div className="consideration-card">
                  <div className="consideration-icon">🚫</div>
                  <h3>Non-Refundable Fees</h3>
                  <p>
                    Application, entrance and prospectus fees are normally not
                    refundable irrespective of the reasons.
                  </p>
                </div>

                <div className="consideration-card">
                  <div className="consideration-icon">⚠️</div>
                  <h3>Disciplinary Action</h3>
                  <p>
                    When admission is revoked owing to misconduct or use of fake
                    documents, the applicant forfeits his/her fees.
                  </p>
                </div>

                <div className="consideration-card">
                  <div className="consideration-icon">⏱️</div>
                  <h3>Processing Timeframe</h3>
                  <p>
                    Normally, refunds are completed within 15 days from receipts
                    of application containing necessary documents in writing.
                  </p>
                </div>

                <div className="consideration-card">
                  <div className="consideration-icon">🌟</div>
                  <h3>Additional Points:</h3>
                  <p>
                    All refund requests need to be made in writing through the
                    designated process.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="important-notes">
              <div className="notes-icon">💡</div>
              <h3>Important Notes</h3>
              <ul className="notes-list">
                <li>
                  All refund request need to be made in writing through the
                  designated process
                </li>
                <li>
                  Refunds are dependent on clearing of dues and verification of
                  the documents.
                </li>
                <li>
                  The percentage for refund depends on the total amount of fee
                  paid less the non refundable fee.
                </li>
                <li>
                  The date of the receipts of the notice for withdrawal
                  determines the percentage of refund.
                </li>
                <li>
                  Refunds will be credited back to the same account from where
                  the fee was collected.
                </li>
              </ul>
            </div>

            {/* How to Apply */}
            <div className="how-to-apply">
              <h2>How to Apply for Refund</h2>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h4>Formal application submission</h4>
                  <p>
                    Submit a formal application for withdrawal and refund in
                    writing to the admission office.
                  </p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                  <div className="step-number">2</div>

                  <h4>Documentation Verification</h4>
                  <p>
                    University verifies documentation and checks for any
                    outstanding dues.
                  </p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h4>Approvement and Refund Process</h4>
                  <p>
                    On approval, the refund process will be completed within 15
                    days from the original payments source.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="refund-contact-box">
              <h3>Need Help with Refund?</h3>
              <p>
                For refund-related queries or to submit a refund request, please
                contact our Admissions Office:
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <a href="mailto:admission@miu.edu.in">admission@miu.edu.in</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href="tel:+919319727766">+91 9319727766</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="refund-quick-links">
            <h3>Related Information</h3>
            <div className="quick-links-grid">
              <Link
                href="/admissions/fee-structure"
                className="quick-link-card"
              >
                <span className="link-icon">💰</span>
                <h4>Fee Structure</h4>
                <p>View detailed fee information</p>
              </Link>
              <Link href="/admissions/rules" className="quick-link-card">
                <span className="link-icon">📜</span>
                <h4>Admission Rules</h4>
                <p>Admission guidelines and policies</p>
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
