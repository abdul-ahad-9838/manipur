"use client";
const Stats = () => {
  const stats = [
    {
      value: "2019",
      label: "Year Established",
    },
    {
      value: "100+",
      label: "Receive Multiyear Fellowships",
    },
    {
      value: "50+",
      label: "Academic Programs",
    },
    {
      value: "10",
      label: "Research Centers",
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: "80px 0px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid #e8e5df",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 15px 45px rgba(0, 0, 0, 0.06)",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              padding: "42px 30px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "180px",
              transition: "background 0.3s ease",
              borderRight:
                index !== stats.length - 1
                  ? "1px solid #e8e5df"
                  : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fcfbf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
            }}
          >
            {/* Number */}
            <h2
              style={{
                margin: 0,
                color: "#151515",
                fontSize: "clamp(38px, 4vw, 56px)",
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-2px",
              }}
            >
              {stat.value}
            </h2>

            {/* Gold accent */}
            <div
              style={{
                width: "32px",
                height: "3px",
                margin: "18px 0 14px",
                borderRadius: "10px",
                background: "#d4a017",
              }}
            />

            {/* Label */}
            <p
              style={{
                margin: 0,
                maxWidth: "190px",
                color: "#666666",
                fontSize: "13px",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 900px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .stat-card {
            min-height: 170px !important;
          }

          .stat-card:nth-child(2) {
            border-right: none !important;
          }

          .stat-card:nth-child(-n + 2) {
            border-bottom: 1px solid #e8e5df;
          }
        }

        @media (max-width: 600px) {
          .stats-section {
            padding: 50px 16px !important;
          }

          .stats-container {
            grid-template-columns: 1fr !important;
            border-radius: 18px !important;
          }

          .stat-card {
            min-height: 150px !important;
            padding: 32px 20px !important;
            border-right: none !important;
            border-bottom: 1px solid #e8e5df !important;
          }

          .stat-card:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
