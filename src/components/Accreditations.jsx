import "@/styles/Accreditations.css";
import Image from "next/image";
import { headers } from "next/headers";

const DEFAULT_RECOGNITIONS = [
  {
    name: "All India Council for Technical Education",
    short: "AICTE",
    logo: "",
    desc: "Statutory body under Ministry of Education, Govt. of India",
    color: "#1a3a6b",
  },
  {
    name: "Association of Indian Universities",
    short: "AIU",
    logo: "",
    desc: "Premier body of universities in India since 1925",
    color: "#8b1a1a",
  },
  {
    name: "University Grants Commission",
    short: "UGC",
    logo: "",
    desc: "Recognized under Section 2(f) & 22 of UGC Act, 1956",
    color: "#1a5c1a",
  },
];

// ✅ server-side fetch helper
async function getAccreditationsData() {
  try {
    const headersList = headers();
    const host = headersList.get("host");

    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/settings/recognitions`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("Accreditations fetch failed:", err);
    return null;
  }
}

export default async function Accreditations() {
  const data = await getAccreditationsData();

  const recognitions = data?.content?.items?.length
    ? data.content.items
    : DEFAULT_RECOGNITIONS;

  const header = {
    badge: "AFFILIATIONS & ACCREDITATION",
    title: "Recognized by Leading Education Bodies",
    desc: "MIU holds prestigious recognitions from top national councils. These affiliations validate our commitment to academic excellence, quality education, and adherence to global university standards, ensuring your degree is valued worldwide.",
    ...(data?.content?.header || {}),
  };

  return (
    <section className="accreditations-section">
      {/* Header */}
      <div className="acc-header-block container">
        <div className="acc-header-left">
          <span
            style={{
              display: "inline-block",
              color: "var(--lpu-orange)",
              fontWeight: "700",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            {header.badge}
          </span>

          <h2 className="acc-main-title">{header.title}</h2>
        </div>

        <div className="acc-header-right">
          <p className="acc-main-desc">{header.desc}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="acc-cards-row container">
        {recognitions
          .filter((item) => item.short !== "AICTE")
          .map((item, i) => (
            <div
              key={i}
              className="acc-card"
              style={{ borderTopColor: item.color }}
            >
              <div className="acc-card-logo-box">
                {item.logo ? (
                  <div className="acc-logo-wrapper">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      className="acc-logo-img"
                    />
                  </div>
                ) : (
                  <div
                    className="acc-logo-badge"
                    style={{ background: item.color }}
                  >
                    <span>{item.short}</span>
                  </div>
                )}
              </div>

              <div
                className="acc-card-divider"
                style={{ background: item.color }}
              />

              <div className="acc-card-body">
                <span className="acc-card-short" style={{ color: item.color }}>
                  {item.short}
                </span>
                <p className="acc-card-name">{item.name}</p>
                <p className="acc-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
