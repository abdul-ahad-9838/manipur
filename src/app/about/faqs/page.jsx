import FAQ from "@/components/FAQ"; // Adjust path
import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";

async function getFaqs() {
  try {
    await dbConnect();

    const faqs = await Faq.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    return faqs.map((faq) => ({
      ...faq,
      _id: faq._id.toString(),
      createdAt: faq.createdAt?.toISOString(),
      updatedAt: faq.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function generateMetadata() {
  return {
    alternates: {
      canonical: "/faqs",
    },
  };
}

const Page = async () => {
  const faqsData = await getFaqs();

  return <FAQ faqs={faqsData} />;
};

export default Page;