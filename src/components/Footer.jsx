"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/Footer.css";

const DEFAULTS = {
  aboutText:
    "Transforming education with a globally recognized curriculum, industry-oriented learning, and an unwavering commitment to student success.",
  address: "MIU Palace, Airport Road, Ghari, Imphal, Manipur 795140",
  phone: "+91 9319727766",
  email: "admission@miu.edu.in",
  facebook: "https://www.facebook.com/ManipurInternationalUniversityOfficial/",
  twitter: "https://x.com/MIU_India",
  linkedin:
    "https://www.linkedin.com/company/manipur-international-university-official/",
  instagram: "https://www.instagram.com/miu.india",
  copyright: "Manipur International University. All Rights Reserved.",
};

import { navbarItems } from "./Navbar";

const Footer = () => {
  const [d, setD] = useState(DEFAULTS);

  const schools = navbarItems.filter((item) => item.label == "Schools")[0]
    .subItems;

  useEffect(() => {
    API.get("/settings/footer")
      .then(({ data }) => {
        if (data?.content) {
          // Merge with defaults to ensure new fields are included
          setD((prev) => ({ ...DEFAULTS, ...data.content }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col col-about">
            <Link href="/" style={{ textDecoration: "none" }}>
              <img
                src="/images/MIU_Logo.png"
                alt="Manipur International University"
                style={{
                  height: "80px",
                  width: "auto",
                  objectFit: "contain",
                  marginBottom: "1.2rem",
                  display: "block",
                }}
              />
            </Link>
            <p className="footer-about-text">{d.aboutText}</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.496306177151!2d93.90589182670674!3d24.778453448531593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749261e475627a5%3A0x4387a785b093521a!2sManipur%20International%20University!5e0!3m2!1sen!2sin!4v1780304912783!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, marginBottom: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MIU Location"
            />
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about">About MIU</Link>
              </li>
              <li>
                <Link href="/admissions">Admissions 2026</Link>
              </li>
              <li>
                <Link href="/jobs">Jobs &amp; Careers</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/news-events">News &amp; Events</Link>
              </li>
              <li>
                <Link href="/information-cell">Placement Cell</Link>
              </li>
              <li>
                <Link href="/information-cell">Alumni Network</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Schools &amp; Institutes</h4>
            <ul className="footer-links">
              {schools.map((school) => (
                <li key={school.href}>
                  <Link href={`/schools/${school.href}`}>{school.label}</Link>
                </li>
              ))}
              <li>
                <a
                  href="https://vocational.miu.edu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  School of Vocational Studies
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col col-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-info">
              <li>
                <span>📍</span> {d.address}
              </li>
              <li>
                <span>📞</span> {d.phone}
              </li>
              <li>
                <span>✉️</span> {d.email}
              </li>
              <div className="social-links">
                <a
                  href={d.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={d.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Twitter/X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={d.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={d.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@officialmiuindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Youtube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.9 4.8 12 4.8 12 4.8h0s-3.9 0-6.9.3c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5C2 14.4 2.2 16 2.2 16s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 6.6.3 6.6.3s3.9 0 6.9-.3c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.5C22 9.6 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </a>
                {/* https://in.pinterest.com/manipurinternationaluniversity/ */}
                <a
                  href="https://in.pinterest.com/manipurinternationaluniversity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Pinterest"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.017 0C5.396 0 0 5.383 0 12.004c0 5.123 3.224 9.49 7.757 11.244-.107-.955-.202-2.42.042-3.461.22-.942 1.418-5.994 1.418-5.994s-.362-.725-.362-1.797c0-1.683.976-2.94 2.19-2.94 1.033 0 1.533.775 1.533 1.704 0 1.038-.662 2.59-1.003 4.029-.285 1.204.604 2.185 1.791 2.185 2.149 0 3.8-2.266 3.8-5.536 0-2.894-2.08-4.917-5.047-4.917-3.439 0-5.459 2.579-5.459 5.244 0 1.04.399 2.155.899 2.761.099.12.113.226.084.348-.091.382-.293 1.204-.333 1.372-.053.22-.173.267-.399.161-1.488-.693-2.419-2.872-2.419-4.623 0-3.764 2.736-7.22 7.888-7.22 4.141 0 7.362 2.952 7.362 6.897 0 4.117-2.597 7.433-6.201 7.433-1.211 0-2.349-.629-2.737-1.372l-.744 2.834c-.269 1.035-1 2.331-1.49 3.122 1.122.346 2.312.534 3.546.534C18.624 24.008 24 18.625 24 12.004 24 5.383 18.624 0 12.017 0z" />
                  </svg>
                </a>
                <a
                  href="https://www.tumblr.com/manipurinternationaluniversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Tumblr"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.078 24c-3.233 0-5.628-1.676-5.628-5.33V10.5H6V7.313c2.8-.973 3.89-3.407 4.093-5.313H13v4.813h3.875V10.5H13v7.688c0 1.746.883 2.625 2.36 2.625.738 0 1.437-.238 1.89-.48v2.925c-.664.313-1.844.742-3.172.742z" />
                  </svg>
                </a>
              </div>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {d.copyright}
          </p>
          <div className="bottom-links">
            <Link href="/reservation-roster">Reservation Roster</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/about">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
