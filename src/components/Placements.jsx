// Placements.jsx (Server Component)

import PlacementsClient from "./PlacementsClient";

const DEFAULTS = {
  badge: "PLACEMENT STATISTICS",
  title: "Record-Breaking Placements",
  subtitle:
    "Our students are recruited by top Fortune 500 companies globally, ensuring a massive return on investment.",
  stats: [
    {
      val: "500+",
      label: "Recruiters",
    },
    {
      val: "95%",
      label: "Placement Rate",
    },
    {
      val: "10 LPA",
      label: "Highest Package",
    },
    {
      val: "2000+",
      label: "Students Placed",
    },
    {
      val: "300+",
      label: "Internship Partners",
    },
    "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
    "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
  ],
  companies: "",
  companyLogos:
    "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
};

export default async function Placements({ data }) {
  const content = {
    ...DEFAULTS,
    ...(data || {}),
  };

  return <PlacementsClient data={content} />;
}
