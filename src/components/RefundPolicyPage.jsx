"use client";

import React from "react";
import Link from "next/link";
import "@/styles/RefundPolicyPage.css";

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
                This policy outlines the guidelines and procedures for fee
                refunds in case of admission withdrawal. It ensures
                transparency, consistency, and fairness in handling refund
                requests while aligning with institutional norms and regulatory
                expectations.
              </p>
              <p>
                The refund amount is determined based on the timing of the
                withdrawal request relative to the officially notified admission
                schedule. All refund requests must be submitted in writing
                through the prescribed process. Approved refunds are processed
                within a defined timeframe, subject to verification of documents
                and clearance of any outstanding dues.
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
                    Application, entrance, and prospectus fees are generally
                    non-refundable under any circumstances.
                  </p>
                </div>

                <div className="consideration-card">
                  <div className="consideration-icon">⚠️</div>
                  <h3>Disciplinary Action</h3>
                  <p>
                    If admission is cancelled due to misconduct or submission of
                    false documents, fees are usually forfeited.
                  </p>
                </div>

                <div className="consideration-card">
                  <div className="consideration-icon">⏱️</div>
                  <h3>Processing Timeframe</h3>
                  <p>
                    Refunds are generally processed within 15 days of receiving
                    a written application with all required documents.
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
                  All refund requests must be submitted in writing through the
                  official channels
                </li>
                <li>
                  Refund processing is subject to verification of documents and
                  clearance of outstanding dues
                </li>
                <li>
                  The refund percentage is calculated on the total fee paid,
                  excluding non-refundable components
                </li>
                <li>
                  The date of receipt of the withdrawal notice determines the
                  applicable refund percentage
                </li>
                <li>
                  Refunds will be processed to the original payment source or as
                  per university guidelines
                </li>
              </ul>
            </div>

            {/* How to Apply */}
            <div className="how-to-apply">
              <h2>How to Apply for Refund</h2>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h4>Submit Written Request</h4>
                  <p>
                    Submit a formal written application for withdrawal and
                    refund to the Admissions Office
                  </p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h4>Document Verification</h4>
                  <p>
                    University verifies submitted documents and checks for any
                    outstanding dues
                  </p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h4>Approval & Processing</h4>
                  <p>
                    Once approved, refund is processed within 15 days to the
                    original payment source
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
