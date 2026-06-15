// Placements.jsx (Server Component)

import { headers } from "next/headers";
import PlacementsClient from "./PlacementsClient";

const DEFAULTS = {
  badge: "PLACEMENT STATISTICS",
  title: "Record-Breaking Placements",
  subtitle:
    "Our students are recruited by top Fortune 500 companies globally, ensuring a massive return on investment.",
  stats: [
    { val: "500+", label: "Recruiters", icon: "🏢" },
    { val: "95%", label: "Placement Rate", icon: "📈" },
    { val: "10 LPA", label: "Highest Package", icon: "💰" },
    { val: "2000+", label: "Students Placed", icon: "🎓" },
    { val: "300+", label: "Internship Partners", icon: "🤝" },
    { val: "50+", label: "Industry Collaborations", icon: "🌐" },
    { val: "100+", label: "Annual Hiring Drives", icon: "📅" },
  ],
  companies:
    "Microsoft,Google,Amazon,Cognizant,Capgemini,TCS,Infosys,Wipro,IBM,Accenture",
  companyLogos: [],
};

export default async function Placements({ data }) {
  const content = {
    ...DEFAULTS,
    ...(data?.content || {}),
  };

  return <PlacementsClient data={content} />;
}
