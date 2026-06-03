"use client";

import "@/styles/Navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_SCHOOLS = [
  { name: "School Of Commerce", slug: "school-of-commerce" },
  {
    name: "School Of Information Technology",
    slug: "school-of-information-technology",
  },
  { name: "School Of Engineering", slug: "school-of-engineering" },
  { name: "School Of Management", slug: "school-of-management" },
  { name: "School Of Science", slug: "school-of-science" },
  {
    name: "School Of Vocational Studies",
    slug: "school-of-vocational-studies",
    externalUrl: "https://vocational.miu.edu.in/",
  },
  { name: "School Of Humanities", slug: "school-of-humanities" },
  {
    name: "School Of Allied Health Science",
    slug: "school-of-allied-health-science",
  },
];

const MobileAccordion = ({ label, href, items, onClose }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="mobile-accordion">
      <div
        className="mobile-accordion-header"
        onClick={() => setOpen((o) => !o)}
      >
        <div style={{ textAlign: "left", width: "100%" }}>
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

const MobileSubAccordion = ({ label, subItems, onClose }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-sub-accordion">
      <div
        className="mobile-accordion-header"
        onClick={() => setOpen((o) => !o)}
        // style={{ paddingLeft: "20px" }}
      >
        <span className="mobile-accordion-label">{label}</span>
        <span className={`mobile-accordion-arrow ${open ? "open" : ""}`}>
          ›
        </span>
      </div>
      {open && (
        <ul className="mobile-accordion-list">
          {subItems.map((item, i) => (
            <li key={i}>
              <Link href={item.href} onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const [schools, setSchools] = useState(DEFAULT_SCHOOLS);
  const [activePages, setActivePages] = useState(new Set());
  // const { openEnquiry } = useEnquiry();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // Load active pages from DB
  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then((data) => {
        const activePaths = new Set(
          data
            .filter((page) => page.isActive !== false)
            .map((page) => page.path),
        );
        setActivePages(activePaths);
      })
      .catch(() => {});
  }, []);

  // Load schools from DB
  useEffect(() => {
    fetch("/api/settings/schools-section")
      .then((r) => r.json())
      .then((data) => {
        if (data?.content?.schools?.length) {
          const dbSchools = data.content.schools.map((s) => ({
            ...s,
            externalUrl:
              s.slug === "school-of-vocational-studies"
                ? "https://vocational.miu.edu.in/"
                : s.externalUrl || null,
          }));
          // Merge: add any DEFAULT_SCHOOLS entries not already in DB list
          const dbSlugs = new Set(dbSchools.map((s) => s.slug));
          const missing = DEFAULT_SCHOOLS.filter((s) => !dbSlugs.has(s.slug));
          setSchools([...dbSchools, ...missing]);
        }
      })
      .catch(() => {});
  }, []);

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

  // useEffect(() => {
  //   const check = () => setIsMobile(window.innerWidth <= 1024);
  //   check();
  //   window.addEventListener("resize", check);
  //   return () => window.removeEventListener("resize", check);
  // }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Helper function to check if page is active (show all if no pages loaded yet)
  const isPageActive = (path) => {
    // Always show the affiliations page
    if (path === "/about/affiliations-accreditation") return true;
    if (activePages.size === 0) return true; // Show all if not loaded yet
    return activePages.has(path);
  };

  // Filter menu items based on active status
  const aboutItems = [
    { label: "Overview", href: "/about" },
    { label: "Governing Body", href: "/about/governance" },
    { label: "Academic Council", href: "/about/academic-council" },
    { label: "IQAC", href: "/about/iqac" },
    { label: "Chancellor", href: "/about/leadership/chancellor" },
    { label: "Vice Chancellor", href: "/about/leadership/vice-chancellor" },
    {
      label: "Pro Vice Chancellor",
      href: "/about/leadership/pro-vice-chancellor",
    },
    { label: "Registrar", href: "/about/leadership/registrar" },
    {
      label: "Director of Admissions",
      href: "/about/leadership/director-admissions",
    },
    {
      label: "Controller of Examinations",
      href: "/about/leadership/controller-of-examinations",
    },
    {
      label: "Affiliations & Accreditation",
      href: "/about/affiliations-accreditation",
    },
    { label: "Public Self Disclosure", href: "/about/public-self-disclosure" },
    { label: "UGC Performa", href: "/about/ugc-performance" },
  ].filter((item) => isPageActive(item.href));

  const academicsItems = [].filter((item) => isPageActive(item.href));

  const admissionsItems = [
    { label: "Admission Process", href: "/admissions/process" },
    { label: "Fee Structure", href: "/admissions/fee-structure" },
    { label: "Rules for Admission", href: "/admissions/rules" },
    { label: "Academic Calendar", href: "/academics/academic-calendar" },
    { label: "Brochure Download", href: "/academics/brochure" },
    { label: "Reservation Roster", href: "/reservation-roster" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ].filter((item) => isPageActive(item.href));

  const studentLifeItems = [
    { label: "Sports", href: "/student-life/sports" },
    { label: "Hostel", href: "/student-life/hostel" },
    { label: "NCC/NSS", href: "/student-life/ncc-nss" },
    { label: "Internal Complaints Committee", href: "/student-life/icc" },
    { label: "Anti-Ragging Cell", href: "/student-life/anti-ragging" },
    { label: "Incubation Center", href: "/student-life/incubation-center" },
    { label: "CPIO", href: "/student-life/cpio" },
    { label: "Grievance Cell", href: "/student-life/grievance-cell" },
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
    { label: "Awards", href: "/student-life/awards" },
    {
      label: "Constituent Colleges",
      href: "/student-life/constituent-colleges",
    },
    { label: "Health Facilities", href: "/student-life/health-facilities" },
  ].filter((item) => isPageActive(item.href));

  const researchItems = [
    { label: "Research Overview", href: "/research/overview" },
    { label: "Publications", href: "/research/publications" },
    { label: "Research Projects", href: "/research/projects" },
    { label: "R&D Cell", href: "/research/development-cell" },
  ].filter((item) => isPageActive(item.href));

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
              <li>
                <Link href="/">HOME</Link>
              </li>

              <li className="has-dropdown">
                <button className="nav-dropdown-btn">
                  ABOUT US <span className="dropdown-plus">+</span>
                </button>
                <ul className="dropdown-menu">
                  {isPageActive("/about") && (
                    <li>
                      <Link href="/about">Overview</Link>
                    </li>
                  )}
                  <li className="has-submenu">
                    <button className="nav-dropdown-btn nav-submenu-btn">
                      Governance <span className="submenu-arrow">›</span>
                    </button>
                    <ul className="submenu">
                      {isPageActive("/about/governance") && (
                        <li>
                          <Link href="/about/governance">Governing Body</Link>
                        </li>
                      )}
                      {isPageActive("/about/academic-council") && (
                        <li>
                          <Link href="/about/academic-council">
                            Academic Council
                          </Link>
                        </li>
                      )}
                      {isPageActive("/about/iqac") && (
                        <li>
                          <Link href="/about/iqac">IQAC</Link>
                        </li>
                      )}
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <button className="nav-dropdown-btn nav-submenu-btn">
                      Leadership Team <span className="submenu-arrow">›</span>
                    </button>
                    <ul className="submenu">
                      <li>
                        <Link href="/about/leadership/chancellor">
                          Chancellor
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/leadership/vice-chancellor">
                          Vice Chancellor
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="/about/leadership/pro-vice-chancellor">
                          Pro Vice Chancellor
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/about/leadership/registrar">
                          Registrar
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/leadership/director-admissions">
                          Director of Admissions
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="/about/leadership/controller-of-examinations">
                          Controller of Examinations
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                  {isPageActive("/about/affiliations-accreditation") && (
                    <li>
                      <Link href="/about/affiliations-accreditation">
                        Affiliations & Accreditation
                      </Link>
                    </li>
                  )}
                  {isPageActive("/about/public-self-disclosure") && (
                    <li>
                      <Link href="/about/public-self-disclosure">
                        Public Self Disclosure
                      </Link>
                    </li>
                  )}
                  {isPageActive("/about/ugc-performance") && (
                    <li>
                      <Link href="/about/ugc-performance">UGC Performa</Link>
                    </li>
                  )}
                </ul>
              </li>

              <li className="has-dropdown">
                <button className="nav-dropdown-btn">
                  SCHOOLS <span className="dropdown-plus">+</span>
                </button>
                <ul className="dropdown-menu">
                  {schools.map((s, i) => (
                    <li key={i}>
                      {s.externalUrl ? (
                        <a
                          href={s.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.name}
                        </a>
                      ) : (
                        <Link href={`/schools/${s.slug}`}>{s.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <Link href="/research/development-cell" className="nav-link">
                  RESEARCH
                </Link>
              </li>

              <li className="has-dropdown">
                <button className="nav-dropdown-btn">
                  EXAMINATION <span className="dropdown-plus">+</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/examination/results">Results</Link>
                  </li>
                </ul>
              </li>

              <li className="has-dropdown">
                <button className="nav-dropdown-btn">
                  ADMISSIONS <span className="dropdown-plus">+</span>
                </button>
                <ul className="dropdown-menu">
                  {isPageActive("/admissions/process") && (
                    <li>
                      <Link href="/admissions/process">Admission Process</Link>
                    </li>
                  )}
                  {isPageActive("/admissions/fee-structure") && (
                    <li>
                      <Link href="/admissions/fee-structure">
                        Fee Structure
                      </Link>
                    </li>
                  )}
                  {isPageActive("/admissions/rules") && (
                    <li>
                      <Link href="/admissions/rules">Rules for Admission</Link>
                    </li>
                  )}
                  {isPageActive("/academics/academic-calendar") && (
                    <li>
                      <Link href="/academics/academic-calendar">
                        Academic Calendar
                      </Link>
                    </li>
                  )}
                  {isPageActive("/academics/brochure") && (
                    <li>
                      <Link href="/academics/brochure">Brochure Download</Link>
                    </li>
                  )}
                  <li>
                    <Link href="/reservation-roster">Reservation Roster</Link>
                  </li>
                  <li>
                    <Link href="/refund-policy">Refund Policy</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </li>

              <li className="has-dropdown">
                <button className="nav-dropdown-btn">
                  STUDENT LIFE <span className="dropdown-plus">+</span>
                </button>
                <ul className="dropdown-menu">
                  {isPageActive("/student-life/sports") && (
                    <li>
                      <Link href="/student-life/sports">Sports</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/hostel") && (
                    <li>
                      <Link href="/student-life/hostel">Hostel</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/ncc-nss") && (
                    <li>
                      <Link href="/student-life/ncc-nss">NCC/NSS</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/icc") && (
                    <li>
                      <Link href="/student-life/icc">
                        Internal Complaints Committee
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/anti-ragging") && (
                    <li>
                      <Link href="/student-life/anti-ragging">
                        Anti-Ragging Cell
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/incubation-center") && (
                    <li>
                      <Link href="/student-life/incubation-center">
                        Incubation Center
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/cpio") && (
                    <li>
                      <Link href="/student-life/cpio">CPIO</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/grievance-cell") && (
                    <li>
                      <Link href="/student-life/grievance-cell">
                        Grievance Cell
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/equal-opportunity-cell") && (
                    <li>
                      <Link href="/student-life/equal-opportunity-cell">
                        Equal Opportunity Cell
                      </Link>
                    </li>
                  )}

                  {isPageActive("/student-life/ombudsperson") && (
                    <li>
                      <Link href="/student-life/ombudsperson">
                        Ombudsperson
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/project-development-cell") && (
                    <li>
                      <Link href="/student-life/project-development-cell">
                        Project Development Cell
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/sedg-cell") && (
                    <li>
                      <Link href="/student-life/sedg-cell">SEDG Cell</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/awards") && (
                    <li>
                      <Link href="/student-life/awards">Awards</Link>
                    </li>
                  )}
                  {isPageActive("/student-life/constituent-colleges") && (
                    <li>
                      <Link href="/student-life/constituent-colleges">
                        Constituent Colleges
                      </Link>
                    </li>
                  )}
                  {isPageActive("/student-life/health-facilities") && (
                    <li>
                      <Link href="/student-life/health-facilities">
                        Health Facilities
                      </Link>
                    </li>
                  )}
                </ul>
              </li>

              <li>
                <Link href="/contact">CONTACT US</Link>
              </li>
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
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
            </li>

            <MobileAccordion
              label="ABOUT US"
              href="/about"
              onClose={() => setIsMenuOpen(false)}
              items={aboutItems}
            />

            <MobileAccordion
              label="SCHOOLS"
              href="/information-cell"
              onClose={() => setIsMenuOpen(false)}
              items={schools.map((s) => ({
                label: s.name,
                href: s.externalUrl || `/schools/${s.slug}`,
              }))}
            />

            <a
              href="/research/development-cell"
              className="mobile-direct-link"
              onClick={() => setIsMenuOpen(false)}
            >
              RESEARCH
            </a>

            <MobileAccordion
              label="EXAMINATION"
              href="#"
              onClose={() => setIsMenuOpen(false)}
              items={[{ label: "Results", href: "/examination/results" }]}
            />

            <MobileAccordion
              label="ADMISSIONS"
              href="/admissions"
              onClose={() => setIsMenuOpen(false)}
              items={admissionsItems}
            />

            <MobileAccordion
              label="STUDENT LIFE"
              href="/information-cell"
              onClose={() => setIsMenuOpen(false)}
              items={studentLifeItems}
            />

            <li>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                CONTACT US
              </Link>
            </li>
          </ul>
          <div className="mobile-utility-links">
            <Link href="/news-events" onClick={() => setIsMenuOpen(false)}>
              HAPPENINGS
            </Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
              BLOG
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
