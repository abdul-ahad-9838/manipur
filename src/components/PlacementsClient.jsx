// PlacementsClient.jsx

"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";


// =========================================
// COUNT UP HOOK
// =========================================

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const num = parseFloat(
      String(target || "").replace(/[^0-9.]/g, "")
    );

    if (!num) return;

    let start = 0;
    const step = num / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [active, target, duration]);

  const suffix = String(target || "").replace(/[0-9.]/g, "");

  return count === 0 && !active
    ? "0"
    : `${count}${suffix}`;
}


// =========================================
// STAT CARD
// =========================================

function StatCard({ stat, active }) {
  const display = useCountUp(stat.val, 1600, active);

  return (
    <div
      style={{
        position: "relative",
        padding: "34px 28px",
        minHeight: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#ffffff",
        borderRight: "1px solid #e8e5df",
        transition:
          "background 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fcfaf5";
        e.currentTarget.style.transform =
          "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "42px",
          height: "42px",
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#f7f1df",
          color: "#b8860b",
          fontSize: "18px",
        }}
      >
        {stat.icon}
      </div>

      {/* Number */}
      <div
        style={{
          color: "#151515",
          fontSize: "clamp(28px, 3vw, 38px)",
          lineHeight: 1,
          fontWeight: 750,
          letterSpacing: "-2px",
        }}
      >
        {display}
      </div>

      {/* Accent */}
      <div
        style={{
          width: "25px",
          height: "3px",
          margin: "12px 0 10px",
          borderRadius: "10px",
          background: "#d4a017",
        }}
      />

      {/* Label */}
      <div
        style={{
          color: "#6b6b6b",
          fontSize: "12px",
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        {stat.label}
      </div>
    </div >
  );
}


// =========================================
// MAIN COMPONENT
// =========================================

export default function PlacementsClient({ data }) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef(null);

  // Responsive state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTablet(
        window.innerWidth > 600 &&
        window.innerWidth <= 950
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);


  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      obs.observe(sectionRef.current);
    }

    return () => obs.disconnect();
  }, []);


  const companies = (data.companies || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const companyLogos = data.companyLogos || [];
  const stats = data.stats || [];


  const placementSteps = [
    {
      step: "01",
      icon: "📋",
      title: "Profile Development",
      desc: "Resume building, LinkedIn optimisation & portfolio creation",
    },
    {
      step: "02",
      icon: "🎯",
      title: "Skill Enhancement",
      desc: "Aptitude, technical & communication training workshops",
    },
    {
      step: "03",
      icon: "🎤",
      title: "Interview Readiness",
      desc: "Mock interviews with expert feedback & GD practice",
    },
    {
      step: "04",
      icon: "🏢",
      title: "Campus Drives",
      desc: "On-campus recruitment by 500+ top companies",
    },
    {
      step: "05",
      icon: "🏆",
      title: "Offer & Onboarding",
      desc: "Offer letter, pre-joining support & alumni network",
    },
  ];


  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        padding: isMobile
          ? "65px 16px"
          : isTablet
            ? "80px 20px"
            : "110px 24px",
        background: "#f8f7f4",
        overflow: "hidden",
      }}
    >
      {/* =========================================
          HERO
      ========================================= */}

      {/* Header */}


      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <SectionHeader isMobile={isMobile} isTablet={isTablet} badge={data.badge} title={data.title} subtitle={data.subtitle} />


        {/* =========================================
            STATS
        ========================================= */}

        <div
          style={{
            width: "100%",
            marginBottom: isMobile
              ? "70px"
              : "100px",
            background: "#ffffff",
            border: "1px solid #e7e3dc",
            borderRadius: isMobile
              ? "18px"
              : "24px",
            overflow: "hidden",
            boxShadow:
              "0 18px 50px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(7, 1fr)",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  borderBottom: isMobile
                    ? i !== stats.length - 1
                      ? "1px solid #e8e5df"
                      : "none"
                    : isTablet
                      ? i < stats.length - 2
                        ? "1px solid #e8e5df"
                        : i === stats.length - 2
                          ? "1px solid #e8e5df"
                          : "none"
                      : "none",

                  borderRight: isMobile
                    ? "none"
                    : isTablet
                      ? i % 2 === 0
                        ? "1px solid #e8e5df"
                        : "none"
                      : i !== stats.length - 1
                        ? "1px solid #e8e5df"
                        : "none",
                }}
              >
                <StatCard
                  stat={stat}
                  active={active}
                />
              </div>
            ))}

          </div>
        </div>


        {/* =========================================
            PLACEMENT PROCESS
        ========================================= */}

        <div
          style={{
            marginBottom: isMobile
              ? "65px"
              : "90px",
          }}
        >
          {/* Process Header */}
          <div
            style={{
              marginBottom: "45px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "2px",
                  background: "#d4a017",
                  display: "inline-block",
                }}
              />

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#b8860b"
                }}
              >HOW IT WORKS
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "Poppins",
                color: "#151515",
                fontSize: isMobile
                  ? "32px"
                  : "44px",
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-1.5px",
              }}
            >
              Our Placement Process
            </h3>
          </div>


          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(5, 1fr)",
              gap: isMobile
                ? "14px"
                : "16px",
            }}
          >
            {placementSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  padding: isMobile
                    ? "25px"
                    : "30px 22px",
                  background: "#ffffff",
                  border:
                    "1px solid #e7e3dc",
                  borderRadius: "20px",
                  boxShadow:
                    "0 12px 35px rgba(0,0,0,0.045)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 45px rgba(0,0,0,0.09)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 35px rgba(0,0,0,0.045)";
                }}
              >
                {/* Step Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    color: "#d5d0c8",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                  }}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    marginBottom: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    background: "#f7f1df",
                    border:
                      "1px solid #eee1b9",
                    fontSize: "22px",
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h4
                  style={{
                    margin: "0 0 10px",
                    color: "#171717",
                    fontSize: "16px",
                    lineHeight: 1.3,
                    fontWeight: 700,
                  }}
                >
                  {step.title}
                </h4>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    color: "#777777",
                    fontSize: "12px",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* =========================================
            COMPANY SECTION
        ========================================= */}

        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: isMobile
                ? "flex-start"
                : "flex-end",
              justifyContent: "space-between",
              flexDirection: isMobile
                ? "column"
                : "row",
              gap: "15px",
              marginBottom: "28px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "2px",
                    background: "#d4a017",
                    display: "inline-block",
                  }}
                />

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: "#b8860b"
                  }}
                >
                  OUR RECRUITERS
                </span>
              </div>

              <h3
                style={{
                  margin: 0,
                  color: "#151515",
                  fontFamily: "poppins",
                  fontSize: isMobile
                    ? "32px"
                    : "44px",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                }}
              >
                Trusted by Leading Companies
              </h3>
            </div>

            <p
              style={{
                margin: 0,
                color: "#777777",
                fontSize: "12px",
              }}
            >
              Building careers with industry leaders
            </p>
          </div>


          {/* Marquee */}
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              padding: "8px 0",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "max-content",
                gap: "16px",
                animation:
                  "placementsMarquee 28s linear infinite",
              }}
            >
              {companyLogos.length > 0
                ? [...companyLogos, ...companyLogos].map(
                  (company, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        width: isMobile
                          ? "150px"
                          : "190px",
                        height: isMobile
                          ? "90px"
                          : "105px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ffffff",
                        border:
                          "1px solid #e7e3dc",
                        borderRadius: "16px",
                        overflow: "hidden",
                      }}
                    >
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={
                            company.name ||
                            "Company logo"
                          }
                          fill
                          sizes="190px"
                          style={{
                            objectFit: "contain",
                            padding: "25px",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            padding: "15px",
                            color: "#333333",
                            fontSize: "13px",
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {company.name}
                        </span>
                      )}
                    </div>
                  )
                )
                : [...companies, ...companies].map(
                  (company, i) => (
                    <div
                      key={i}
                      style={{
                        width: isMobile
                          ? "150px"
                          : "190px",
                        height: isMobile
                          ? "90px"
                          : "105px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ffffff",
                        border:
                          "1px solid #e7e3dc",
                        borderRadius: "16px",
                        color: "#333333",
                        fontSize: "13px",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {company}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>


      {/* =========================================
          MARQUEE ANIMATION
      ========================================= */}

      <style>
        {`
          @keyframes placementsMarquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
}
