import SectionHeader from "./SectionHeader";

const FAQ = async ({ faqs }) => {
  if (!faqs) return null;

  const filteredFaqs = faqs.filter(
    (faq) => faq?.published
  );

  return (
    <section
      style={{
        width: "100%",
        padding: "100px 24px",
        background: "#f8f7f4",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know about our service" />

        {/* FAQ List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {filteredFaqs?.length ? (
            filteredFaqs.map((item, index) => (
              <details
                key={item._id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7e3dc",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.035)",
                  transition:
                    "border-color 0.25s ease, box-shadow 0.25s ease",
                }}

              >
                {/* Question */}
                <summary
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",

                    minHeight: "72px",
                    padding: "20px 24px",

                    cursor: "pointer",
                    listStyle: "none",

                    color: "#181818",
                    fontSize: "15px",
                    lineHeight: 1.5,
                    fontWeight: 650,

                    outline: "none",
                  }}
                >
                  {/* Number + Question */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,

                        width: "32px",
                        height: "32px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        borderRadius: "50%",

                        background: "#f7f1df",
                        color: "#b8860b",

                        fontSize: "10px",
                        fontWeight: 800,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      {item.question}
                    </span>
                  </div>

                  {/* Plus */}
                  <span
                    style={{
                      flexShrink: 0,

                      width: "30px",
                      height: "30px",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      border: "1px solid #e1ddd5",
                      borderRadius: "50%",

                      background: "#faf9f6",
                      color: "#151515",

                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: 1,

                      transition:
                        "transform 0.25s ease, background 0.25s ease, color 0.25s ease",
                    }}
                  >
                    +
                  </span>
                </summary>

                {/* Answer */}
                <div
                  style={{
                    padding:
                      "0 72px 24px 72px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      marginBottom: "20px",
                      background: "#eeeae2",
                    }}
                  />

                  <p
                    style={{
                      margin: 0,

                      color: "#707070",

                      fontSize: "14px",
                      lineHeight: 1.8,
                      fontWeight: 400,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </details>
            ))
          ) : (
            <div
              style={{
                padding: "50px 30px",

                textAlign: "center",

                background: "#ffffff",
                border: "1px solid #e7e3dc",
                borderRadius: "18px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 15px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "50%",

                  background: "#f7f1df",
                  color: "#b8860b",

                  fontSize: "18px",
                }}
              >
                ?
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#777777",
                  fontSize: "14px",
                }}
              >
                No FAQs found.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
