import React from "react";
import Link from "next/link";
import "@/styles/Footer.css";
import navbarItems from "@/data/navbarItems";

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
  youtube: "",
  pinterest: "",
  tumblr: "",
  copyright: "Manipur International University. All Rights Reserved.",
};

async function getFooterData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/settings/footer`, {
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!res.ok) return DEFAULTS;

    const data = await res.json();
    if (data?.content) {
      return { ...DEFAULTS, ...data.content };
    }
  } catch {
    // fall through to defaults on any error
  }

  return DEFAULTS;
}

const Footer = async () => {
  const d = await getFooterData();

  const schools =
    navbarItems.find((item) => item.label === "Schools")?.subItems ?? [];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col col-about">
            <Link href="/" style={{ textDecoration: "none" }}>
              <img
                src="/images/MIU_Logo.webp"
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
              allowFullScreen
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
                  <Link href={school.href}>{school.label}</Link>
                </li>
              ))}
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
                {d.facebook && (
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
                )}
                {d.twitter && (
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
                )}
                {d.linkedin && (
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
                )}
                {d.instagram && (
                  <a
                    href={d.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
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
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
                {d.youtube && (
                  <a
                    href={d.youtube}
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
                )}
                {d.pinterest && (
                  <a
                    href={d.pinterest}
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
                )}
                {d.tumblr && (
                  <a
                    href={d.tumblr}
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
                )}
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
