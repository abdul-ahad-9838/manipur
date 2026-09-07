import SchoolPageClient from "./SchoolPageClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `/schools/${slug}`,
    },
  };
}

export default function Page() {
  return <SchoolPageClient />;
}
