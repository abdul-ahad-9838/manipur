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

  // API.get("/settings/page-home").then(({ data }) => {
  //   if (data?.content) {
  //     const {
  //       stat1Value,
  //       stat1Label,
  //       stat2Value,
  //       stat2Label,
  //       stat3Value,
  //       stat3Label,
  //       stat4Value,
  //       stat4Label,
  //     } = data.content;

  //     stats[0].value = stat1Value;
  //     stats[0].label = stat1Label;
  //     stats[1].value = stat2Value;
  //     stats[1].label = stat2Label;
  //     stats[2].value = stat3Value;
  //     stats[2].label = stat3Label;
  //     stats[3].value = stat4Value;
  //     stats[3].label = stat4Label;
  //   }
  // });

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
