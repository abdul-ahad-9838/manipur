import "@/styles/PrivacyPolicyPage.css";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page">
      {/* Hero */}
      <div className="privacy-hero">
        <div className="container">
          <nav className="privacy-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </nav>
          <span className="privacy-badge">LEGAL</span>
          <h1>Privacy Policy</h1>
          <p className="privacy-hero-subtitle">
            Respecting your privacy is important to us. Find out more about
            collecting and handling your personal information.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="privacy-body">
        <div className="container">
          <div className="privacy-content-card">
            {/* <div className="privacy-last-updated">
              <span className="update-icon">📅</span>
              <span>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div> */}

            <div className="privacy-intro">
              <p>
                Visitors/Users while accessing or browsing the official website
                of <strong>Manipur International University (MIU)</strong> may
                supply some personal information that include but is not limited
                to personal profile along with other relevant information. The
                university will collect, process and use such information for
                academic and operational purposes.
              </p>
            </div>

            {/* Section 1 */}
            <div className="privacy-section">
              <div className="section-icon">🔒</div>
              <h2>Collection and use of information</h2>
              <p>
                The university collects some personal information from the
                users/visitors of this website. The collected information can be
                disclosed to authorized third parties when it seems fit to the
                university. While browning this website, the user gives
                unconditional permission for the same.
              </p>
            </div>

            {/* Section 2 */}
            <div className="privacy-section">
              <div className="section-icon">🖥️</div>
              <h2>Automatic Data Collection</h2>
              <p>
                Data can be automatically collected by the university web server
                and many include, but not be limited to, the following technical
                information.
              </p>

              <ul className="privacy-list">
                <li>IP address of the user’s devices</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Date and time of access</li>
                <li>Referring website</li>
              </ul>
              <p>
                This information is used for administration, development,
                security monitoring and creation of statistics.
              </p>
            </div>

            {/* Section 3 */}
            <div className="privacy-section">
              <div className="section-icon">🍪</div>
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                The MIU may employ cookies, pixels and other tracking
                technologies to collect information about a user session,
                increase user experience and provide personalized content and
                service.
              </p>
            </div>

            {/* Section 4 */}
            <div className="privacy-section">
              <div className="section-icon">⚖️</div>
              <h2>Information Disclosure</h2>
              <p>
                Information obtained from the user may be disclosed, when
                necessary to:
              </p>
              <ul className="privacy-list">
                <li>Government authorities</li>
                <li>Regulatory authorities</li>
                <li>Statutory agencies/courts</li>
              </ul>
              <p>
                Such disclosure will be carried out as per the requirements of
                applicable laws and regulations.
              </p>
            </div>

            {/* Section 5 */}
            <div className="privacy-section">
              <div className="section-icon">🔗</div>
              <h2>Links to Third Party Website</h2>
              <p>
                This site may include links to other websites that are neither
                owned nor controlled by MIU. Such sites are operated on their
                own terms and are not subject to MIU privacy policy. The
                university is not responsible for the privacy policy or the
                content of any external website.
              </p>
            </div>

            {/* Section 6 */}
            <div className="privacy-section">
              <div className="section-icon">📝</div>
              <h2>Privacy Policy Updates</h2>
              <p>
                MIU has the right to change, amend or add to this privacy policy
                at any time and without giving prior notice. Users are advised
                to check this page from time to time for any updates. Use of
                this site after any changes will mean your acceptance of the new
                privacy policy.
              </p>
            </div>

            {/* Contact Section */}
            <div className="privacy-contact-box">
              <h3>Questions About This Policy?</h3>
              <p>
                If you have any questions or concerns regarding this Privacy
                Policy, please contact us:
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
          <div className="privacy-quick-links">
            <h3>Related Policies</h3>
            <div className="quick-links-grid">
              <Link href="/terms-of-use" className="quick-link-card">
                <span className="link-icon">📄</span>
                <h4>Terms of Use</h4>
                <p>Website usage terms and conditions</p>
              </Link>
              <Link
                href="/about/public-self-disclosure"
                className="quick-link-card"
              >
                <span className="link-icon">📋</span>
                <h4>Public Disclosure</h4>
                <p>University transparency information</p>
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
