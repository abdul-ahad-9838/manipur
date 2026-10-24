import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import LeadershipDetail from "@/components/LeadershipDetail";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `/about/leadership/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  let leader = null;

  try {
    await dbConnect();

    // Convert slug to role
    // vice-chancellor => Vice Chancellor
    const role = slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(" ");

    // Fetch leadership settings directly from MongoDB
    const settings = await Settings.findOne({
      type: "leadership",
    }).lean();

    if (settings) {
      leader =
        settings.content?.leaders?.find(
          (item) => item.role?.toLowerCase() === role.toLowerCase(),
        ) || null;
    }
  } catch (error) {
    console.error("Failed to fetch leader:", error);
  }

  return <LeadershipDetail leader={leader} />;
}