import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import dynamic from "next/dynamic";
import "@/styles/HomePage.css";

const Stats = dynamic(() => import("@/components/Stats"));
const Spotlight = dynamic(() => import("@/components/Spotlight"));
const CampusLife = dynamic(() => import("@/components/CampusLife"));
const Placements = dynamic(() => import("@/components/Placements"));
const Ecosystem = dynamic(() => import("@/components/Ecosystem"));
const NewsSlider = dynamic(() => import("@/components/NewsSlider"));
const FAQ = dynamic(() => import("@/components/FAQ"));

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

async function getHomepageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/homepage`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Homepage data fetch failed:", error);
    return null;
  }
}

export default async function Home() {
  const results = await getHomepageData();

  return (
    <main>
      <Hero data={results?.hero} />
      <Spotlight data={results?.spotlight} />
      <Stats />
      <CampusLife data={results?.campus} />
      <Placements data={results?.placements} />
      <Ecosystem data={results?.ecosystem?.cards} />
      <NewsSlider blogs={results?.blogs} />
      <FAQ faqs={results?.faqs} />
      <StructuredData />
    </main>
  );
}
