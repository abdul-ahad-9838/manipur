// CampusLife.jsx (Server Component)

import CampusLifeClient from "./CampusLifeClient";

const DEFAULT_TABS = [
  {
    id: "library",
    name: "Central Library",
    img: "/api/images/69e4ddae96ee206c189621ad",
  },
  {
    id: "labs",
    name: "High-Tech Labs",
    img: "/api/images/69e4ddbb96ee206c189621ae",
  },
  {
    id: "hostels",
    name: "Premium Hostels",
    img: "/api/images/69e4ddc396ee206c189621af",
  },
  {
    id: "sports",
    name: "Sports Complex",
    img: "/api/images/69e4ddc896ee206c189621b0",
  },
];

export default async function CampusLife({ data }) {
  console.log(data);
  const tabs = data?.tabs?.length > 0 ? data.tabs : DEFAULT_TABS;

  const content = {
    title: data?.content?.title || "A Campus Built For You",
    subtitle:
      data?.content?.subtitle ||
      "Experience world-class infrastructure spread over a massive, eco-friendly campus designed to inspire creativity and innovation.",
  };

  return <CampusLifeClient tabs={tabs} content={content} />;
}
