import "@/styles/Stats.css";

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
          <div className="stat-card" key={index}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
