"use client";

import React, { useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/MobileBottomNav.css";

const QUALIFICATIONS = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "Other",
];

const MobileBottomNav = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await API.post("/enquiries", form);
      setDone(true);
      setForm({ name: "", phone: "", email: "", qualification: "" });
      setTimeout(() => {
        setDone(false);
        setOpen(false);
      }, 2500);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Enquiry Popup */}
      {open && (
        <div
          className="enquiry-overlay"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="enquiry-modal">
            <button className="enquiry-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            {done ? (
              <div className="enquiry-success">
                <div className="enquiry-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="enquiry-modal-header">
                  <h2>Apply Now</h2>
                  <p>Fill in your details and we'll reach out to you.</p>
                </div>

                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="enquiry-field">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Highest Qualification *</label>
                    <select
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="enquiry-error">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="enquiry-submit"
                  >
                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <div className="mobile-bottom-nav">
        <a
          href="https://admission.miu.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item apply-btn-mobile"
        >
          Apply
        </a>

        <a
          href="https://student.miu.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <svg
            // xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-key-icon lucide-user-key"
          >
            <path d="M20 11v6" />
            <path d="M20 13h2" />
            <path d="M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578" />
            <circle cx="10" cy="7" r="4" />
            <circle cx="20" cy="19" r="2" />
          </svg>
        </a>

        <a href="tel:+919319727766" className="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>

        <a
          href="https://wa.me/919319727766"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
    </>
  );
};

export default MobileBottomNav;
