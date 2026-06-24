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
            Your privacy matters to us. Learn how we collect, use, and protect
            your information.
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
                While accessing or using the official website of{" "}
                <strong>Manipur International University (MIU)</strong>,
                visitors/users may provide certain personal information,
                including but not limited to personal profiles and related data.
                Such information may be collected, processed, and used by the
                University for academic, administrative, and operational
                purposes.
              </p>
            </div>

            {/* Section 1 */}
            <div className="privacy-section">
              <div className="section-icon">🔒</div>
              <h2>Information Collection and Use</h2>
              <p>
                The University may collect personal information provided by
                visitors and users during their interaction with this website.
                This information may be shared with authorized third parties, as
                deemed appropriate. By using this website, the user provides
                unconditional consent for such collection, use, and sharing of
                information.
              </p>
            </div>

            {/* Section 2 */}
            <div className="privacy-section">
              <div className="section-icon">🖥️</div>
              <h2>Automatic Information Collection</h2>
              <p>
                The University's web server may automatically record technical
                information such as:
              </p>
              <ul className="privacy-list">
                <li>Internet Protocol (IP) address of the user's device</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Date and time of access</li>
                <li>Referring website</li>
              </ul>
              <p>
                This information is used for website administration, performance
                improvement, security monitoring, and generating statistical
                reports.
              </p>
            </div>

            {/* Section 3 */}
            <div className="privacy-section">
              <div className="section-icon">🍪</div>
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                MIU may use cookies, pixels, or similar technologies to track
                user sessions, enhance user experience, and deliver personalized
                content and services. These technologies help us understand how
                visitors interact with our website and improve our services
                accordingly.
              </p>
            </div>

            {/* Section 4 */}
            <div className="privacy-section">
              <div className="section-icon">⚖️</div>
              <h2>Information Disclosure</h2>
              <p>
                Information collected from users may be disclosed, if required,
                to:
              </p>
              <ul className="privacy-list">
                <li>Government authorities</li>
                <li>Regulatory bodies</li>
                <li>Courts or statutory agencies</li>
              </ul>
              <p>
                Such disclosure will be made in accordance with applicable laws,
                regulations, or legal processes. Information may also be used
                for maintaining network security, improving website
                functionality, or for other legitimate purposes as determined by
                the University.
              </p>
            </div>

            {/* Section 5 */}
            <div className="privacy-section">
              <div className="section-icon">🔗</div>
              <h2>Third-Party Links</h2>
              <p>
                This website may contain links to third-party or external
                websites. These websites operate independently and are not
                governed by MIU's privacy policy. The University is not
                responsible for the privacy practices, security, or content of
                such external sites. We encourage users to review the privacy
                policies of any third-party sites they visit.
              </p>
            </div>

            {/* Section 6 */}
            <div className="privacy-section">
              <div className="section-icon">📝</div>
              <h2>Policy Updates</h2>
              <p>
                MIU reserves the right to revise, modify, or update this Privacy
                Policy at any time without prior notice. Users are encouraged to
                review this page periodically to stay informed of any changes.
                Continued use of the website after any modifications constitutes
                acceptance of the updated policy.
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
