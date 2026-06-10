import React from "react";
import { headers } from "next/headers";
import "@/styles/faq.css";

async function getFaqs() {
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/faqs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  return res.json();
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
