// CampusLife.jsx (Server Component)

import { headers } from "next/headers";
import CampusLifeClient from "./CampusLifeClient";

const DEFAULT_TABS = [
  {
    id: "library",
    name: "Central Library",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "labs",
    name: "High-Tech Labs",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "hostels",
    name: "Premium Hostels",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "sports",
    name: "Sports Complex",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
  },
];

async function getCampus() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const res = await fetch(`${protocol}://${host}/api/settings/campus`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function CampusLife() {
  const data = await getCampus();

  const tabs =
    data?.content?.tabs?.length > 0 ? data.content.tabs : DEFAULT_TABS;

  const content = {
    title: data?.content?.title || "A Campus Built For You",
    subtitle:
      data?.content?.subtitle ||
      "Experience world-class infrastructure spread over a massive, eco-friendly campus designed to inspire creativity and innovation.",
  };

  return <CampusLifeClient tabs={tabs} content={content} />;
}
