import React from 'react'

const SectionHeader = ({ isMobile = false, isTablet = false, badge, title, subtitle }) => {
    return (
        <div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    color: "#b8860b",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "2px",
                }}
            >
                <span
                    style={{
                        width: "34px",
                        height: "2px",
                        background: "#d4a017",
                    }}
                />
                {badge}
            </div>

            {/* Heading */}
            <div
                style={{
                    marginBottom: isMobile ? "40px" : "60px",
                    fontFamily: "Georgia, serif",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: "#151515",
                        marginBottom: "20px",
                        fontSize: isMobile
                            ? "42px"
                            : isTablet
                                ? "52px"
                                : "clamp(40px, 5vw, 68px)",
                        lineHeight: 1.02,
                        fontWeight: 700,
                        letterSpacing: "-2  .5px",
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        margin: 0,
                        maxWidth: "420px",
                        color: "#6c6c6c",
                        fontSize: "15px",
                        lineHeight: 1.8,
                    }}
                >
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

export default SectionHeader;