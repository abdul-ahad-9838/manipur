import LeadershipDetail from "@/components/LeadershipDetail";

export const metadata = {
  title: "Chancellor's Message | Manipur International University",
  description:
    "Message from the Chancellor of Manipur International University.",
  alternates: {
    canonical: "https://miu.edu.in/about/leadership/chancellor",
  },
};

export default async function Page({ params }) {
  const { slug } = await params;

  let leader = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/about/${slug}`,
      {
        next: {
          revalidate: 500,
        },
      },
    );

    if (res.ok) {
      leader = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch leader:", error);
  }

  return <LeadershipDetail leader={leader} />;
}
