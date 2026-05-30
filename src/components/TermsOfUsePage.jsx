"use client";

import React from "react";
import Link from "next/link";
import "@/styles/TermsOfUsePage.css";

export default function TermsOfUsePage() {
  return (
    <div className="terms-page">
      {/* Hero */}
      <div className="terms-hero">
        <div className="container">
          <nav className="terms-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Terms and Conditions</span>
          </nav>
          <span className="terms-badge">LEGAL</span>
          <h1>Terms and Conditions</h1>
          <p className="terms-hero-subtitle">
            Please read these terms carefully before using our website.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="terms-body">
        <div className="container">
          <div className="terms-content-card">
            {/* <div className="terms-last-updated">
              <span className="update-icon">📅</span>
              <span>
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div> */}

            <div className="terms-intro">
              <p>
                These Terms and Conditions govern your use of the official
                website of{" "}
                <strong>Manipur International University (MIU)</strong>{" "}
                (www.miu.edu.in). By accessing or using this website, you agree
                to be bound by these Terms and Conditions. If you do not agree
                with any part of these terms, you are advised not to use the
                website.
              </p>
            </div>

            {/* Section 1 */}
            <div className="terms-section">
              <div className="section-number">1</div>
              <div className="section-content">
                <h2>Website Usage</h2>

                <div className="subsection">
                  <h3>a. Access</h3>
                  <p>
                    Access to the website is provided on a temporary basis. MIU
                    reserves the right to modify, suspend, or discontinue any
                    part of the website at any time without prior notice.
                  </p>
                </div>

                <div className="subsection">
                  <h3>b. User Accounts</h3>
                  <p>
                    Certain sections of the website may require user
                    registration. Users are responsible for maintaining the
                    confidentiality of their account credentials and for
                    providing accurate and updated information. MIU reserves the
                    right to suspend or terminate any user account at its
                    discretion.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="terms-section">
              <div className="section-number">2</div>
              <div className="section-content">
                <h2>Intellectual Property</h2>

                <div className="subsection">
                  <h3>a. Copyright</h3>
                  <p>
                    All content available on this website, including text,
                    graphics, images, logos, and audio-visual materials, is the
                    property of MIU or is used under appropriate license and is
                    protected by applicable intellectual property laws.
                  </p>
                </div>

                <div className="subsection">
                  <h3>b. Limited Usage</h3>
                  <p>
                    Users may access, view, and download content for personal,
                    non-commercial use only. Any unauthorized reproduction,
                    distribution, or commercial use of the website content is
                    strictly prohibited.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="terms-section">
              <div className="section-number">3</div>
              <div className="section-content">
                <h2>Disclaimers and Limitation of Liability</h2>

                <div className="subsection">
                  <h3>a. Content Accuracy</h3>
                  <p>
                    The content provided on the website is for general
                    informational purposes only. MIU does not guarantee the
                    accuracy, completeness, or reliability of the information.
                  </p>
                </div>

                <div className="subsection">
                  <h3>b. Third-Party Links</h3>
                  <p>
                    The website may contain links to external websites for user
                    convenience. MIU does not endorse or assume responsibility
                    for the content or practices of such third-party websites.
                  </p>
                </div>

                <div className="subsection">
                  <h3>c. Limitation of Liability</h3>
                  <p>
                    MIU shall not be held liable for any direct, indirect,
                    incidental, or consequential damages arising from the use or
                    inability to use the website, including any technical issues
                    or harmful components.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="terms-section">
              <div className="section-number">4</div>
              <div className="section-content">
                <h2>Privacy</h2>

                <div className="subsection">
                  <h3>a. Data Collection</h3>
                  <p>
                    MIU may collect and process personal information in
                    accordance with its{" "}
                    <Link href="/privacy-policy" className="inline-link">
                      Privacy Policy
                    </Link>
                    . By using the website, you consent to such collection and
                    use of your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="terms-section">
              <div className="section-number">5</div>
              <div className="section-content">
                <h2>User Conduct</h2>

                <div className="subsection">
                  <h3>a. Prohibited Activities</h3>
                  <p>
                    Users agree not to engage in unlawful, harmful, or
                    inappropriate activities, including but not limited to
                    transmitting defamatory, obscene, or infringing content.
                  </p>
                </div>

                <div className="subsection">
                  <h3>b. Security</h3>
                  <p>
                    Users must not attempt to compromise the security or
                    functionality of the website, including unauthorized access,
                    hacking, or introducing malicious software.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="terms-section">
              <div className="section-number">6</div>
              <div className="section-content">
                <h2>Modifications and Termination</h2>

                <div className="subsection">
                  <h3>a. Changes</h3>
                  <p>
                    MIU reserves the right to update or modify these Terms and
                    Conditions at any time. Changes will be effective upon
                    posting on the website.
                  </p>
                </div>

                <div className="subsection">
                  <h3>b. Termination</h3>
                  <p>
                    MIU may suspend or terminate access to the website at its
                    discretion without prior notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="terms-governing-law">
              <div className="law-icon">⚖️</div>
              <h2>Governing Law</h2>
              <p>
                These Terms and Conditions shall be governed by and interpreted
                in accordance with the <strong>laws of India</strong>. Any
                disputes arising shall be subject to the jurisdiction of the
                competent courts in Manipur.
              </p>
            </div>

            {/* Contact Section */}
            <div className="terms-contact-box">
              <h3>Questions About These Terms?</h3>
              <p>
                If you have any questions or concerns regarding these Terms and
                Conditions, please contact us:
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
          <div className="terms-quick-links">
            <h3>Related Information</h3>
            <div className="quick-links-grid">
              <Link href="/privacy-policy" className="quick-link-card">
                <span className="link-icon">🔒</span>
                <h4>Privacy Policy</h4>
                <p>How we protect your information</p>
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
