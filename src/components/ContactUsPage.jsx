"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/ContactUsPage.css";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pc, setPc] = useState({});

  useEffect(() => {
    fetch("/api/settings/page-contact")
      .then((r) => r.json())
      .then((d) => {
        if (d?.content) setPc(d.content);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          qualification: "Other",
        }),
      });
      setDone(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#007AFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: "Phone",
      primary: pc.phone1 || "+91 9319727766",
      secondary: "Mon-Sat, 9:30 AM - 4:00 PM",
      link: `tel:${(pc.phone1 || "+919319727766").replace(/\s/g, "")}`,
      color: "#007AFF",
      bgColor: "#E3F2FD",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFB800"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      title: "Email",
      primary: pc.email1 || "admission@miu.edu.in",
      secondary: "",
      link: `mailto:${pc.email1 || "admission@miu.edu.in"}`,
      color: "#FFB800",
      bgColor: "#FFF8E1",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="#25D366"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      title: 'WhatsApp',
      primary: '+91 9319727766',
      secondary: 'Chat with us instantly',
      link: 'https://wa.me/919319727766',
      color: '#25D366',
      bgColor: '#E8F5E9'
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EA4335"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Visit Us",
      primary: "Imphal, Manipur",
      secondary: pc.address || "Manipur International University",
      color: "#EA4335",
      bgColor: "#FFEBEE",
    },
  ];

  const departments = [
    { icon: "🎓", name: "Admissions", email: "admissions@miu.edu.in" },
    { icon: "📝", name: "Grievance", email: "grievance@miu.edu.in" },
    { icon: "📋", name: "Verification", email: "verification@miu.edu.in" },
  ];

  return (
    <div className="contact-page-new">
      {/* Hero Section */}
      <div
        className="contact-hero-new"
        style={
          pc.heroImage
            ? {
                backgroundImage: `url(${pc.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div
          className="contact-hero-bg"
          style={pc.heroImage ? { background: "rgba(0,0,0,0.55)" } : {}}
        ></div>
        <div className="container">
          <nav className="contact-breadcrumb-new">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Contact Us</span>
          </nav>

          <div className="contact-hero-content">
            <span className="contact-badge-new">GET IN TOUCH</span>
            <h1 className="contact-hero-title">Let's Connect</h1>
            <p className="contact-hero-subtitle">
              Have questions? We're here to help you every step of the way.
              Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="contact-method-card"
                style={{ borderTopColor: method.color }}
              >
                <div
                  className="method-icon-wrapper"
                  style={{ background: method.bgColor }}
                >
                  <div className="method-icon">{method.icon}</div>
                </div>
                <h3 className="method-title">{method.title}</h3>
                {method.link ? (
                  <a
                    href={method.link}
                    className="method-primary"
                    style={{ color: method.color }}
                    target={
                      method.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {method.primary}
                  </a>
                ) : (
                  <p className="method-primary" style={{ color: method.color }}>
                    {method.primary}
                  </p>
                )}
                <p className="method-secondary">{method.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-header-new">
                <div className="form-icon-badge">✍️</div>
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form and our team will get back to you shortly
                </p>
              </div>

              {done ? (
                <div className="contact-success-new">
                  <div className="success-animation">
                    <div className="success-checkmark">✓</div>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for contacting us. We've received your message and
                    will respond shortly.
                  </p>
                  <button onClick={() => setDone(false)} className="btn-reset">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-new">
                  <div className="form-grid-2">
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">👤</span>
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📧</span>
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📱</span>
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📝</span>
                        Subject
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="form-group-new">
                    <label>
                      <span className="label-icon">💬</span>
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {error && <div className="form-error-new">{error}</div>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-submit-new"
                  >
                    {sending ? (
                      <>
                        <span className="btn-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">
              {/* Map Card */}
              <div className="sidebar-card map-card-new">
                <div className="sidebar-card-header">
                  <span className="sidebar-icon">📍</span>
                  <h3>Our Location</h3>
                </div>
                <div className="map-wrapper-new">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.496306177151!2d93.90589182670674!3d24.778453448531593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749261e475627a5%3A0x4387a785b093521a!2sManipur%20International%20University!5e0!3m2!1sen!2sin!4v1780304912783!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MIU Location"
                  />
                </div>
                <div className="map-address">
                  <p>
                    {pc.address ||
                      "MIU Palace, Airport Road, Ghari, Imphal, Manipur 795140"}
                  </p>
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="sidebar-card hours-card-new">
                <div className="sidebar-card-header">
                  <span className="sidebar-icon">🕐</span>
                  <h3>Office Hours</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="hours-day">Monday - Saturday</span>
                    <span className="hours-time">9:30 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item hours-closed">
                    <span className="hours-day">Sunday</span>
                    <span className="hours-time">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="departments-section">
        <div className="container">
          <div className="section-header-new">
            <h2>Contact by Department</h2>
            <p>Reach out to the specific department for faster assistance</p>
          </div>

          <div className="departments-grid">
            {departments.map((dept, idx) => (
              <div key={idx} className="department-card">
                <div className="dept-icon">{dept.icon}</div>
                <h3>{dept.name}</h3>
                <div className="dept-contacts">
                  <a
                    href={`mailto:${dept.email}`}
                    className="dept-contact-item"
                  >
                    <span className="dept-contact-icon">✉️</span>
                    {dept.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ CTA Section */}
      <div className="faq-cta-section">
        <div className="container">
          <div className="faq-cta-card">
            <div className="faq-cta-icon">❓</div>
            <h2>Have Questions?</h2>
            <p>
              Check out our frequently asked questions for quick answers to
              common inquiries
            </p>
            <Link href="/about/faqs" className="btn-faq">
              View FAQs
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
