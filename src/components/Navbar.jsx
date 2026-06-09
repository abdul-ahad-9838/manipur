"use client";

import "@/styles/Navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileAccordion = ({ label, items = [], onClose }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="mobile-accordion">
      <div
        className="mobile-accordion-header"
        onClick={() => setOpen((o) => !o)}
      >
        <div
          style={{
            textAlign: "left",
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          <span className="mobile-accordion-label">{label}</span>
          <span className={`mobile-accordion-arrow ${open ? "open" : ""}`}>
            ›
          </span>
        </div>
      </div>

      {open && (
        <ul className="mobile-accordion-list">
          {items.map((item, i) => (
            <li key={i}>
              {item.subItems ? (
                <MobileSubAccordion
                  label={item.label}
                  subItems={item.subItems}
                  onClose={onClose}
                />
              ) : (
                <Link href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileSubAccordion = ({ label, subItems = [], onClose }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-sub-accordion">
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span className="mobile-accordion-sub-label">{label}</span>
        <span
          className={`mobile-accordion-arrow`}
          style={{ color: "var(--lpu-orange )" }}
        >
          ›
        </span>
      </div>

      {open && (
        <ul className="mobile-accordion-list">
          {subItems.map((item, i) => (
            <li key={i}>
              {item.subItems ? (
                <MobileSubAccordion
                  label={item.label}
                  subItems={item.subItems}
                  onClose={onClose}
                />
              ) : (
                <Link href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const renderMenuItem = (item) => {
  if (item.subItems) {
    return (
      <li key={item.label} className="has-submenu">
        <button className="nav-dropdown-btn nav-submenu-btn">
          {item.label}
          <span className="submenu-arrow">›</span>
        </button>

        <ul className="submenu">
          {item.subItems.map((subItem) => renderMenuItem(subItem))}
        </ul>
      </li>
    );
  }

  return (
    <li key={item.href}>
      <Link href={item.href}>{item.label}</Link>
    </li>
  );
};

export const navbarItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    subItems: [
      { label: "Overview", href: "/about" },
      { label: "Governing Body", href: "/about/governance" },
      { label: "Academic Council", href: "/about/academic-council" },
      { label: "IQAC", href: "/about/iqac" },
      {
        label: "Leadership",
        subItems: [
          {
            label: "Chancellor",
            href: "/about/leadership/chancellor",
            image: "/api/images/6a1e9d3689109322c2daa756",
          },
          {
            label: "Vice Chancellor",
            href: "/about/leadership/vice-chancellor",
            image: "/api/images/6a1e7e4cdcc1280cb214b4f5",
          },
          { label: "Registrar", href: "/about/leadership/registrar" },
          {
            label: "Controller of Examinations",
            href: "/about/leadership/controller-of-examinations",
          },
        ],
      },
      {
        label: "Committees",
        subItems: [
          // { label: "Sports", href: "/student-life/sports" },
          // { label: "Hostel", href: "/student-life/hostel" },
          // { label: "NCC/NSS", href: "/student-life/ncc-nss" },
          {
            label: "Internal Complaints Committee",
            href: "/student-life/icc",
          },
          // { label: "Anti-Ragging Cell", href: "/student-life/anti-ragging" },
          // {
          //   label: "Incubation Center",
          //   href: "/student-life/incubation-center",
          // },
          // { label: "CPIO", href: "/student-life/cpio" },
          // { label: "Grievance Cell", href: "/student-life/grievance-cell" },
          {
            label: "Equal Opportunity Cell",
            href: "/student-life/equal-opportunity-cell",
          },

          { label: "Ombudsperson", href: "/student-life/ombudsperson" },
          {
            label: "Project Development Cell",
            href: "/student-life/project-development-cell",
          },
          { label: "SEDG Cell", href: "/student-life/sedg-cell" },
          // { label: "Awards", href: "/student-life/awards" },

          // {
          //   label: "Health Facilities",
          //   href: "/student-life/health-facilities",
          // },
        ],
      },
      {
        label: "Affiliations & Accreditation",
        href: "/about/affiliations-accreditation",
      },
      {
        label: "Public Self Disclosure",
        href: "/about/public-self-disclosure",
      },
    ],
  },
  {
    label: "Schools",
    subItems: [
      {
        label: "School of Engineering and Information Technology",
        href: "/schools/school-of-engineering-and-information-technology",
      },
      {
        label: "School of Commerce and Management",
        href: "/schools/school-of-commerce-and-management",
      },
      {
        label: "School of Science",
        href: "/schools/school-of-science",
      },
      {
        label: "School of Vocational Studies",
        href: "/schools/school-of-vocational-studies",
      },
      {
        label: "School of Humanities",
        href: "/schools/school-of-humanities",
      },
      {
        label: "School of Fire & Safety",
        href: "/schools/school-of-fire-&-safety",
      },
      {
        label: "School Of Allied Health Science",
        href: "/schools/school-of-allied-health-science",
      },
      {
        label: "School of Library and Information Science",
        href: "/schools/school-of-library-and-information-science",
      },
    ],
  },
  {
    label: "Research",
    subItems: [
      { label: "Overview", href: "/research/overview" },
      // {
      //   label: "Degree Awarded",
      //   href: "/research/degree-awarded",
      // },
      { label: "Development Cell", href: "/research/development-cell" },
      { label: "Projects", href: "/research/projects" },
      { label: "Publications", href: "/research/publications" },
    ],
  },
  {
    label: "Examination",
    subItems: [{ label: "Results", href: "/examination/results" }],
  },
  {
    label: "Admissions",
    subItems: [
      { label: "Admission Process", href: "/admissions/process" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Rules for Admission", href: "/admissions/rules" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
      { label: "Brochure Download", href: "/academics/brochure" },
      { label: "Reservation Roster", href: "/reservation-roster" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Student Life",
    subItems: [
      { label: "Sports Facilities", href: "/student-life/sports" },
      { label: "Hostel", href: "/student-life/hostel" },
      // { label: "NCC/NSS", href: "/student-life/ncc-nss" },
      // { label: "Internal Complaints Committee", href: "/student-life/icc" },
      { label: "Anti-Ragging Cell", href: "/student-life/anti-ragging" },
      // { label: "Incubation Center", href: "/student-life/incubation-center" },
      // { label: "CPIO", href: "/student-life/cpio" },
      { label: "Grievance Cell", href: "/student-life/grievance-cell" },
      // {
      //   label: "Equal Opportunity Cell",
      //   href: "/student-life/equal-opportunity-cell",
      // },

      // { label: "Ombudsperson", href: "/student-life/ombudsperson" },
      // {
      //   label: "Project Development Cell",
      //   href: "/student-life/project-development-cell",
      // },
      // { label: "SEDG Cell", href: "/student-life/sedg-cell" },
      { label: "Awards", href: "/student-life/awards" },

      { label: "Health Facilities", href: "/student-life/health-facilities" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Filter menu items based on active status

  return (
    <header
      className={`lpu-header ${!isLandingPage ? "other-page-header" : ""}`}
    >
      <div className="top-strip">
        <div className="strip-flex edge-to-edge">
          <div className="strip-left"></div>
          <div className="strip-right">
            <ul className="top-links">
              <li>
                <Link href="/blogs">BLOGS</Link>
              </li>
              <li>
                <Link href="/news-events">HAPPENINGS</Link>
              </li>
              <li className="highlight-link">
                <Link href="/miunest">MIUNEST</Link>
              </li>
              <li className="highlight-link abc-link">
                <a
                  href="https://accounts.digilocker.gov.in/v3/f336decca8027472f2eb10755499b13597ca6370b41299030e250fa3fd4d60dc--en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABC ID
                </a>
              </li>
              <li>
                <Link href="/about/public-self-disclosure">
                  PUBLIC SELF DISCLOSURE
                </Link>
              </li>
              <li className="login-dropdown-wrapper">
                <button className="login-top-btn login-dropdown-trigger">
                  LOGIN ▾
                </button>
                <ul className="login-dropdown-menu">
                  <li>
                    <a
                      href="https://student.miu.edu.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🎓 Student Login
                    </a>
                  </li>
                  <li>
                    <Link href="/admin/login">👨‍💼 Staff Login</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="top-logo-boxes">
              <span>M</span>
              <span>I</span>
              <span>U</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`main-navbar ${isSticky ? "sticky-nav" : ""} ${!isLandingPage && !isSticky ? "other-page-nav" : ""}`}
      >
        <div className="nav-flex edge-to-edge" style={{ paddingRight: "20px" }}>
          <Link
            href="/"
            className={`absolute-logo-wrapper ${isSticky ? "logo-sticky" : ""}`}
            style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
          >
            {!isSticky ? (
              <img
                src="/images/MIU_Logo.png"
                alt="Manipur International University"
                className="landing-logo"
              />
            ) : (
              <>
                {/* <img src="/emblem.png" alt="MIU Crest" className="abs-emblem" /> */}
                <Image
                  src="/emblem.png"
                  alt="MIU Crest"
                  className="abs-emblem"
                  width={50}
                  height={50}
                />
                <div className="abs-miu-blocks">
                  <span>M</span>
                  <span>I</span>
                  <span>U</span>
                </div>
                <div className="abs-text">
                  <span className="big-word">MANIPUR</span>
                  <span className="big-word">INTERNATIONAL</span>
                  <span className="big-word">UNIVERSITY</span>
                </div>
              </>
            )}
          </Link>

          <nav className="desktop-nav">
            <ul>
              {navbarItems.map((item) => (
                <li key={item.label} className="has-dropdown">
                  {item.subItems ? (
                    <>
                      <button className="nav-dropdown-btn">
                        {item.label}
                        <span className="dropdown-plus">+</span>
                      </button>

                      <ul className="dropdown-menu">
                        {item.subItems.map((subItem) => {
                          return renderMenuItem(subItem);
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-blink-btn main-nav-apply"
            >
              APPLY NOW
            </a>
            <button
              className="hamburger-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="mobile-menu-content">
          <ul className="mobile-main-links">
            {navbarItems.map((item, index) =>
              item.subItems ? (
                <MobileAccordion
                  key={index}
                  label={item.label}
                  items={item.subItems}
                  onClose={() => setIsMenuOpen(false)}
                />
              ) : (
                <li key={index}>
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mobile-utility-links">
            <Link href="/news-events" onClick={() => setIsMenuOpen(false)}>
              HAPPENINGS
            </Link>
            <Link href="/blogs" onClick={() => setIsMenuOpen(false)}>
              BLOGS
            </Link>
            <a
              href="https://student.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              STUDENT LOGIN
            </a>
            <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
              STAFF LOGIN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
