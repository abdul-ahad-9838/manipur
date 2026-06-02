import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";

const Programs = dynamic(() => import("@/components/Programs"));
const Accreditations = dynamic(() => import("@/components/Accreditations"));
const Spotlight = dynamic(() => import("@/components/Spotlight"));
const CampusLife = dynamic(() => import("@/components/CampusLife"));
const Placements = dynamic(() => import("@/components/Placements"));
const Ecosystem = dynamic(() => import("@/components/Ecosystem"));
const NewsSlider = dynamic(() => import("@/components/NewsSlider"));

export const metadata = {
  title: "Manipur International University | MIU Imphal — UGC Recognised",
  description:
    "Manipur International University (MIU) is a UGC-recognised state private university in Imphal offering UG, PG & PhD courses. Apply for 2026–27 admissions.",
  keywords:
    "Manipur International University, MIU Imphal, university in Manipur, MIU India, engineering college Manipur, management college Imphal",
  alternates: {
    canonical: "https://miu.edu.in/",
  },
  openGraph: {
    title: "Manipur International University | MIU Imphal",
    description:
      "Premier university in Imphal, Manipur offering quality higher education",
    url: "https://miu.edu.in/",
    siteName: "Manipur International University",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <StructuredData />

      {/* Above the fold */}
      <Hero />

      {/* Lazy loaded */}
      <Accreditations />
      <Spotlight />
      <Programs />
      <CampusLife />
      <Placements />
      <Ecosystem />
      <NewsSlider />
    </main>
  );
}
