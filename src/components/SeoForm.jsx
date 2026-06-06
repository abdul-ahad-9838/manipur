import React from "react";

const SeoForm = ({ form, setForm, labelStyle, inputStyle }) => {
  return (
    <>
      {/* TITLE */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Metadata Title</label>
        <input
          value={form?.seo?.title || ""}
          type="text"
          name="title"
          placeholder="Metadata title"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, title: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Metadata Description</label>
        <textarea
          value={form?.seo?.description || ""}
          name="description"
          placeholder="Metadata description"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, description: e.target.value },
            }))
          }
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* KEYWORDS */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Metadata Keywords</label>
        <div
          onClick={() => document.getElementById("keyword-input").focus()}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            alignItems: "center",
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "white",
            minHeight: "44px",
            cursor: "text",
          }}
        >
          {(form?.seo?.keywords || []).map((kw, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "#e8f0fe",
                color: "#1a56db",
                borderRadius: "20px",
                padding: "3px 10px 3px 12px",
                fontSize: "13px",
              }}
            >
              {kw}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    seo: {
                      ...prev.seo,
                      keywords: prev.seo.keywords.filter((_, j) => j !== i),
                    },
                  }))
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "16px",
                  lineHeight: 1,
                  color: "#1a56db",
                  opacity: 0.7,
                }}
              >
                ×
              </button>
            </span>
          ))}

          <input
            id="keyword-input"
            placeholder={
              form?.seo?.keywords?.length ? "Add more…" : "Add keyword…"
            }
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.95rem",
              minWidth: "140px",
              flex: 1,
            }}
            onKeyDown={(e) => {
              if (["Enter", ",", "Tab"].includes(e.key)) {
                e.preventDefault();

                const val = e.target.value.replace(/,/g, "").trim();
                if (!val) return;

                setForm((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    keywords: [...(prev.seo.keywords || []), val],
                  },
                }));

                e.target.value = "";
              }
            }}
          />
        </div>
        <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
          Press Enter or , to add a keyword · click × to remove
        </p>
      </div>

      {/* CANONICAL URL */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Canonical URL</label>
        <input
          value={form?.seo?.canonicalUrl || ""}
          type="text"
          name="canonicalUrl"
          placeholder="https://example.com/blog/my-post"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, canonicalUrl: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>

      {/* OPEN GRAPH */}
      <h3 style={{ marginTop: "30px" }}>Open Graph (OG)</h3>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>OG Title</label>
        <input
          value={form?.seo?.ogTitle || ""}
          type="text"
          placeholder="OG title"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, ogTitle: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>OG Description</label>
        <textarea
          value={form?.seo?.ogDescription || ""}
          placeholder="OG description"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, ogDescription: e.target.value },
            }))
          }
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>OG Image URL</label>
        <input
          value={form?.seo?.ogImage || ""}
          type="text"
          placeholder="https://example.com/image.jpg"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, ogImage: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>

      {/* TWITTER */}
      <h3 style={{ marginTop: "30px" }}>Twitter Card</h3>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Twitter Title</label>
        <input
          value={form?.seo?.twitterTitle || ""}
          type="text"
          placeholder="Twitter title"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, twitterTitle: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Twitter Description</label>
        <textarea
          value={form?.seo?.twitterDescription || ""}
          placeholder="Twitter description"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, twitterDescription: e.target.value },
            }))
          }
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Twitter Image URL</label>
        <input
          value={form?.seo?.twitterImage || ""}
          type="text"
          placeholder="https://example.com/twitter-image.jpg"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: { ...prev.seo, twitterImage: e.target.value },
            }))
          }
          style={inputStyle}
        />
      </div>
    </>
  );
};

export default SeoForm;
