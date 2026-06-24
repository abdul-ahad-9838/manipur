"use client";

import navbarItems from "@/data/navbarItems";
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
            +
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
          +
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
                <Link href="/about/faqs">FAQs</Link>
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
            rel="preload"
            className={`absolute-logo-wrapper ${isSticky ? "logo-sticky" : ""}`}
            style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
          >
            {!isSticky ? (
              <Image
                src="/images/MIU_Logo.webp"
                alt="Manipur International University"
                className="landing-logo"
                width={200}
                height={200}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 50vw, 300px"
              />
            ) : (
              <>
                {/* <img src="/emblem.webp" alt="MIU Crest" className="abs-emblem" /> */}
                <Image
                  src="/emblem.webp"
                  alt="MIU Crest"
                  className="abs-emblem"
                  width={50}
                  height={50}
                  priority
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
            <Link href="/about/faqs" onClick={() => setIsMenuOpen(false)}>
              FAQ
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
            <Link
              href="/about/public-self-disclosure"
              onClick={() => setIsMenuOpen(false)}
            >
              PUBLIC SELF DISCLOSURE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
