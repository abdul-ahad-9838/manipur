"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/AffiliationsPage.css";

const DEFAULT_RECOGNITIONS = [
  {
    name: "All India Council for Technical Education",
    short: "AICTE",
    logo: "",
    desc: "Statutory body under Ministry of Education, Govt. of India",
    color: "#1a3a6b",
    details:
      "AICTE approval ensures that our technical programs meet national standards and are recognized across India.",
  },
  {
    name: "Association of Indian Universities",
    short: "AIU",
    logo: "",
    desc: "Premier body of universities in India since 1925",
    color: "#8b1a1a",
    details:
      "AIU membership facilitates academic collaboration and recognition of our degrees nationwide.",
  },
  {
    name: "University Grants Commission",
    short: "UGC",
    logo: "",
    desc: "Recognized under Section 2(f) & 22 of UGC Act, 1956",
    color: "#1a5c1a",
    details:
      "UGC recognition validates MIU as a legitimate degree-granting institution whose qualifications are recognized across India and internationally.",
  },
];

export default function AffiliationsAccreditationPage() {
  const [recognitions, setRecognitions] = useState(DEFAULT_RECOGNITIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/settings/recognitions")
      .then(({ data }) => {
        if (data?.content?.items?.length) {
          // Merge with default details by matching short code, not index
          const items = data.content.items.map((item) => {
            const def =
              DEFAULT_RECOGNITIONS.find((d) => d.short === item.short) || {};
            return { ...def, ...item };
          });
          setRecognitions(items);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="affiliations-page">
      {/* Hero */}
      <div className="aff-hero">
        <div className="aff-hero-bg"></div>
        <div className="container">
          <nav className="aff-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/about">About Us</Link>
            <span>›</span>
            <span>Affiliations & Accreditation</span>
          </nav>
          <span className="aff-badge">RECOGNITION</span>
          <h1>Affiliations & Accreditation</h1>
          <p className="aff-hero-subtitle">
            Manipur International University holds prestigious recognitions from
            leading national education bodies, validating our commitment to
            academic excellence and quality education.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="aff-body">
        <div className="container">
          {/* Introduction */}
          <div className="aff-intro">
            <h2>Our Recognitions</h2>
            <p>
              MIU is proud to be recognized and affiliated with premier
              regulatory and academic bodies in India. These affiliations ensure
              that our programs meet the highest standards of quality, our
              degrees are recognized nationwide, and our students receive
              education that is valued globally.
            </p>
          </div>

          {/* Recognition Cards */}
          {loading ? (
            <div className="aff-loading">Loading...</div>
          ) : (
            <div className="aff-cards-grid">
              {recognitions.map((item, i) => (
                <div
                  key={i}
                  className="aff-card"
                  style={{ "--card-color": item.color }}
                >
                  <div className="aff-card-header">
                    <div className="aff-card-logo-box">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.short}
                          className="aff-card-logo"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <div
                          className="aff-logo-badge"
                          style={{ background: item.color }}
                        >
                          <span>{item.short}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="aff-card-body">
                    <h3
                      className="aff-card-short"
                      style={{ color: item.color }}
                    >
                      {item.short}
                    </h3>
                    <p className="aff-card-name">{item.name}</p>
                    <p className="aff-card-desc">{item.desc}</p>
                    {item.details && (
                      <p className="aff-card-details">{item.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Why It Matters */}
          <div className="aff-importance">
            <h2>Why These Recognitions Matter</h2>
            <div className="aff-importance-grid">
              <div className="aff-importance-card">
                <div className="aff-importance-icon">🎓</div>
                <h3>Degree Recognition</h3>
                <p>
                  Your degree from MIU is recognized across India and
                  internationally, opening doors to career opportunities
                  worldwide.
                </p>
              </div>
              <div className="aff-importance-card">
                <div className="aff-importance-icon">✅</div>
                <h3>Quality Assurance</h3>
                <p>
                  Our programs meet stringent quality standards set by national
                  regulatory bodies, ensuring excellence in education.
                </p>
              </div>
              <div className="aff-importance-card">
                <div className="aff-importance-icon">🌐</div>
                <h3>Academic Mobility</h3>
                <p>
                  These affiliations facilitate credit transfers, student
                  exchanges, and academic collaborations with other
                  institutions.
                </p>
              </div>
              <div className="aff-importance-card">
                <div className="aff-importance-icon">💼</div>
                <h3>Employment Eligibility</h3>
                <p>
                  Graduates are eligible for government jobs, higher education,
                  and professional certifications that require recognized
                  degrees.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="aff-cta">
            <h2>Ready to Join MIU?</h2>
            <p>
              Be part of a recognized institution committed to your academic and
              professional success.
            </p>
            <div className="aff-cta-buttons">
              <a
                href="https://admission.miu.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-orange"
              >
                Apply Now
              </a>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
