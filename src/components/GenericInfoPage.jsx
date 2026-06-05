"use client";

import React from "react";
import Link from "next/link";
import "@/styles/GenericInfoPage.css";

export default function GenericInfoPage({
  badge = "STUDENT LIFE",
  title,
  subtitle,
  breadcrumb = [],
  sections = [],
  contactInfo = null,
}) {
  return (
    <div className="generic-info-page">
      {/* Hero */}
      <div className="generic-hero">
        <div className="container">
          <nav className="generic-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </nav>
          <span className="generic-badge">{badge}</span>
          <h1>{title}</h1>
          {subtitle && <p className="generic-hero-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Body */}
      <div className="generic-body">
        <div className="container">
          <div className="generic-content-card">
            {sections.map((section, index) => (
              <div key={index} className="generic-section">
                {section.icon && (
                  <div className="section-icon">{section.icon}</div>
                )}
                {section.title && <h2>{section.title}</h2>}
                {section.content &&
                  (typeof section.content === "string" ? (
                    <p dangerouslySetInnerHTML={{ __html: section.content }} />
                  ) : (
                    section.content
                  ))}
                {section.list && (
                  <ul className="generic-list">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.cards && (
                  <div className="generic-cards-grid">
                    {section.cards.map((card, i) => (
                      <div key={i} className="generic-card">
                        {card.icon && (
                          <div className="card-icon">{card.icon}</div>
                        )}
                        {card.title && <h3>{card.title}</h3>}
                        {card.content && (
                          <p
                            dangerouslySetInnerHTML={{ __html: card.content }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Section */}
            {contactInfo && (
              <div className="generic-contact-box">
                <h3>{contactInfo.title || "Contact Information"}</h3>
                {contactInfo.description && <p>{contactInfo.description}</p>}
                <div className="contact-details">
                  {contactInfo.email && (
                    <div className="contact-item">
                      <span className="contact-icon">📧</span>
                      <a href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <a href={`tel:${contactInfo.phone}`}>
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
