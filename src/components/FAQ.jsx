import "@/styles/faq.css";

async function getFaqs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("FAQs fetch failed:", error);
    return [];
  }
}

const FAQ = async () => {
  const faqs = await getFaqs();

  if (!faqs) return null;

  const filteredFaqs = faqs?.filter((faq) => faq?.published);

  return (
    <div className="faq-wrapper">
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know about our service
        </p>
      </div>

      <div className="faq-list">
        {filteredFaqs?.length ? (
          filteredFaqs.map((item) => (
            <details key={item._id} className="faq-item">
              <summary className="faq-question">{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))
        ) : (
          <p className="faq-empty">No FAQs found.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
