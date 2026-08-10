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
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fcfbf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
            }}
          >
            {/* Number */}
            <h2>{stat.value}</h2>

            {/* Gold accent */}
            <div className="gold-accent" />

            {/* Label */}
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .stats-section {
          width: 100%;
          padding: 80px 20px;
          box-sizing: border-box;
        }

        .stats-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #e8e5df;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.06);
        }

        .stat-card {
          position: relative;
          padding: 42px 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          box-sizing: border-box;
          background: #ffffff;
          transition: background 0.3s ease;
        }

        .stat-card:not(:last-child) {
          border-right: 1px solid #e8e5df;
        }

        .stat-card h2 {
          margin: 0;
          color: #151515;
          font-size: clamp(38px, 4vw, 56px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -2px;
        }

        .gold-accent {
          width: 32px;
          height: 3px;
          margin: 18px 0 14px;
          border-radius: 10px;
          background: #d4a017;
          flex-shrink: 0;
        }

        .stat-card p {
          margin: 0;
          max-width: 190px;
          color: #666666;
          font-size: 13px;
          line-height: 1.5;
          font-weight: 500;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .stats-section {
            padding: 60px 20px;
          }

          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-card {
            min-height: 170px;
            padding: 36px 24px;
          }

          .stat-card:nth-child(2) {
            border-right: none;
          }

          .stat-card:nth-child(1),
          .stat-card:nth-child(2) {
            border-bottom: 1px solid #e8e5df;
          }

          .stat-card h2 {
            font-size: clamp(38px, 6vw, 50px);
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .stats-section {
            padding: 45px 16px;
          }

          .stats-container {
            grid-template-columns: 1fr;
            border-radius: 18px;
          }

          .stat-card {
            min-height: 145px;
            padding: 30px 20px;
            border-right: none !important;
            border-bottom: 1px solid #e8e5df;
          }

          .stat-card:last-child {
            border-bottom: none;
          }

          .stat-card h2 {
            font-size: 42px;
            letter-spacing: -1.5px;
          }

          .gold-accent {
            width: 28px;
            height: 3px;
            margin: 14px 0 12px;
          }

          .stat-card p {
            max-width: 220px;
            font-size: 13px;
          }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .stats-section {
            padding: 35px 12px;
          }

          .stats-container {
            border-radius: 16px;
          }

          .stat-card {
            min-height: 135px;
            padding: 26px 16px;
          }

          .stat-card h2 {
            font-size: 38px;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
