import FAQ from "@/components/FAQ";

async function getFaqs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return null;
  }
}

const Page = async () => {
  const faqsData = await getFaqs();

  return <FAQ faqs={faqsData} />;
};

export default Page;
