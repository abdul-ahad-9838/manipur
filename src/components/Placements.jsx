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

async function getPlacements() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const res = await fetch(`${protocol}://${host}/api/settings/placements`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function Placements() {
  const data = await getPlacements();

  const content = {
    ...DEFAULTS,
    ...(data?.content || {}),
  };

  return <PlacementsClient data={content} />;
}
