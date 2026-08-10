"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";

function CampusLifeClient({ tabs, content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const activeTab = tabs[activeIndex];
  const tabCount = tabs.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTablet(window.innerWidth > 600 && window.innerWidth <= 900);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (tabCount <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [tabCount]);

  return (
    <section
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
      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >

        {/* Header */}
        <SectionHeader isMobile={isMobile} isTablet={isTablet} badge="LIFE AT MIU" title={content.title} subtitle={content.subtitle} />


        {/* Interactive Area */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              isMobile || isTablet ? "1fr" : "260px 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              width: "100%",
              overflow: isMobile ? "hidden" : "visible",
            }}
          >
            <div
              style={{
                display: isMobile
                  ? "flex"
                  : isTablet
                    ? "grid"
                    : "flex",
                flexDirection: isMobile ? "row" : "column",
                gridTemplateColumns: isTablet
                  ? "repeat(2, 1fr)"
                  : undefined,
                gap: "8px",
                padding: isMobile ? "7px" : "10px",
                background: "#ffffff",
                border: "1px solid #e7e3dc",
                borderRadius: isMobile ? "18px" : "24px",
                boxShadow: "0 15px 45px rgba(0,0,0,0.05)",
                overflowX: isMobile ? "auto" : "visible",
                scrollbarWidth: "none",
              }}
            >
              {tabs.map((tab, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View ${tab.name}`}
                    aria-pressed={isActive}
                    style={{
                      position: "relative",
                      flex: isMobile ? "0 0 auto" : undefined,
                      width: isMobile ? "fit-content" : "100%",
                      minWidth: isMobile ? "fit-content" : undefined,
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: isMobile
                        ? "10px 13px"
                        : "14px 15px",
                      border: "none",
                      borderRadius: isMobile ? "13px" : "16px",
                      background: isActive
                        ? "#171717"
                        : "transparent",
                      color: isActive
                        ? "#ffffff"
                        : "#777777",
                      cursor: "pointer",
                      textAlign: "left",
                      transition:
                        "background 0.3s ease, color 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {!isMobile && (
                      <span
                        style={{
                          minWidth: "28px",
                          color: isActive
                            ? "#d4a017"
                            : "#b5b5b5",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}

                    <span
                      style={{
                        flex: 1,
                        fontSize: isMobile ? "11px" : "13px",
                        fontWeight: 700,
                        letterSpacing: "0.2px",
                      }}
                    >
                      {tab.name}
                    </span>

                    {!isMobile && (
                      <span
                        style={{
                          color: isActive
                            ? "#d4a017"
                            : "#999999",
                          fontSize: "18px",
                        }}
                      >
                        →
                      </span>
                    )}
                  </button>
                );
              })}

            </div>
          </div>

          {/* Gallery */}
          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: isMobile
                  ? "480px"
                  : isTablet
                    ? "500px"
                    : "560px",
                overflow: "hidden",
                borderRadius: isMobile ? "22px" : "28px",
                background: "#111111",
                boxShadow:
                  "0 25px 65px rgba(0,0,0,0.13)",
              }}
            >
              {/* Images */}
              {tabs.map((tab, index) => (
                <Image
                  key={tab.id}
                  src={tab.img}
                  alt={tab.name}
                  fill
                  sizes="(max-width: 600px) 100vw, 1200px"
                  quality={80}
                  priority={index === 0}
                  style={{
                    objectFit: "cover",
                    opacity:
                      activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index
                        ? "scale(1)"
                        : "scale(1.06)",
                    transition:
                      "opacity 0.8s ease, transform 1.2s ease",
                    zIndex:
                      activeIndex === index ? 1 : 0,
                  }}
                />
              ))}

              {/* Image Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.78) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Badge */}
              <div
                style={{
                  position: "absolute",
                  top: isMobile ? "18px" : "25px",
                  left: isMobile ? "18px" : "25px",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: isMobile
                    ? "8px 11px"
                    : "10px 14px",
                  border:
                    "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "50px",
                  background:
                    "rgba(255,255,255,0.12)",
                  color: "#ffffff",
                  fontSize: isMobile ? "8px" : "9px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#d4a017",
                    boxShadow:
                      "0 0 0 4px rgba(212,160,23,0.15)",
                  }}
                />

                CAMPUS EXPERIENCE
              </div>

              {/* Bottom Information */}
              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "22px" : "38px",
                  right: isMobile ? "22px" : "38px",
                  bottom: isMobile ? "24px" : "34px",
                  zIndex: 3,
                  display: isMobile ? "block" : "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "30px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "12px",
                      color: "#d4a017",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "1.8px",
                    }}
                  >
                    MIU ECOSYSTEM{" "}
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>

                  <h3
                    style={{
                      margin: "0 0 8px",
                      color: "#ffffff",
                      fontSize: isMobile
                        ? "34px"
                        : "clamp(30px, 4vw, 52px)",
                      lineHeight: 1,
                      fontWeight: 700,
                      letterSpacing: "-1.5px",
                    }}
                  >
                    {activeTab.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "rgba(255,255,255,0.72)",
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    State-Of-The-Art Facilities
                  </p>
                </div>

                {/* Counter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minWidth: isMobile
                      ? "0"
                      : "150px",
                    marginTop: isMobile
                      ? "25px"
                      : "0",
                    color:
                      "rgba(255,255,255,0.75)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  <span>
                    {String(activeIndex + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div
                    style={{
                      width: isMobile
                        ? "100px"
                        : "90px",
                      height: "2px",
                      overflow: "hidden",
                      background:
                        "rgba(255,255,255,0.25)",
                    }}
                  >
                    <div
                      style={{
                        width: `${((activeIndex + 1) /
                          tabCount) *
                          100
                          }%`,
                        height: "100%",
                        background: "#d4a017",
                        transition:
                          "width 0.5s ease",
                      }}
                    />
                  </div>

                  <span>
                    {String(tabCount).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default memo(CampusLifeClient);
