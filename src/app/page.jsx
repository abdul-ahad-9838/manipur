import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import dynamic from "next/dynamic";

const Stats = dynamic(() => import("@/components/Stats"));
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

async function getData(endpoint) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

export default async function Home() {
  const results = await Promise.allSettled([
    getData("/api/settings/hero"),
    getData("/api/settings/spotlight"),
    getData("/api/settings/campus"),
    getData("/api/settings/placements"),
    getData("/api/settings/ecosystem"),
    getData("/api/blogs"),
  ]);

  const [
    heroData,
    spotlightData,
    campusData,
    placementsData,
    ecosystemData,
    blogsData,
  ] = results.map((result) =>
    result.status === "fulfilled" ? result.value : null,
  );

  return (
    <main>
      <StructuredData />

      <Hero data={heroData?.content} />
      <Spotlight data={spotlightData?.content} />
      <Stats />
      <CampusLife data={campusData?.content} />
      <Placements data={placementsData?.content} />
      <Ecosystem data={ecosystemData?.content?.cards} />
      <NewsSlider blogs={blogsData} />
      <FAQ />
    </main>
  );
}
