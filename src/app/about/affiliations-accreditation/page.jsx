import "@/styles/AffiliationsPage.css";
import { headers } from "next/headers";
import Link from "next/link";

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

async function getRecognitions() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/settings/recognitions`);

    if (!res.ok) throw new Error("Failed request");

    const data = await res.json();

    if (data?.content?.items?.length) {
      return data.content.items.map((item) => {
        const def =
          DEFAULT_RECOGNITIONS.find((d) => d.short === item.short) || {};
        return { ...def, ...item };
      });
    }
  } catch (err) {
    console.log("Failed to fetch recognitions:", err);
  }

  return DEFAULT_RECOGNITIONS;
}

export default async function AffiliationsAccreditationPage() {
  const recognitions = await getRecognitions();

  return (
    <div className="affiliations-page">
      {/* Hero */}
      <div className="aff-hero">
        <div className="aff-hero-bg"></div>

        <div className="container">
          <nav className="aff-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/about">About Us</Link>
            <span>›</span>
            <span>Affiliations & Accreditation</span>
          </nav>

          <span className="aff-badge">RECOGNITION</span>

          <h1>Affiliations & Accreditation</h1>

          <p className="aff-hero-subtitle">
            Manipur International University holds prestigious recognitions from
            leading national education bodies, validating our commitment to
            academic excellence and quality education.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="aff-body">
        <div className="container">
          <div className="aff-intro">
            <h2>Our Recognitions</h2>
            <p>
              MIU is proud to be recognized and affiliated with premier
              regulatory and academic bodies in India.
            </p>
          </div>

          <div className="aff-cards-grid">
            {recognitions.map((item, i) => (
              <div
                key={i}
                className="aff-card"
                style={{ "--card-color": item.color }}
              >
                <div>
                  <div className="aff-card-header">
                    <div className="aff-card-logo-box">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.short}
                          className="aff-card-logo"
                        />
                      ) : (
                        <div
                          className="aff-logo-badge"
                          style={{ background: item.color }}
                        >
                          <span>{item.short}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="aff-card-body">
                    <h3
                      className="aff-card-short"
                      style={{ color: item.color }}
                    >
                      {item.short}
                    </h3>

                    <p className="aff-card-name">{item.name}</p>
                    <p className="aff-card-desc">{item.desc}</p>

                    {item.details && (
                      <p className="aff-card-details">{item.details}</p>
                    )}
                  </div>
                </div>

                {item.short !== "AICTE" ? (
                  <button
                    className="aff-card-btn"
                    style={{ background: item.color }}
                  >
                    View Details
                  </button>
                ) : (
                  <p className="aff-card-details">
                    A university is exempt from AICTE approval because it is
                    regulated by the UGC, while AICTE approval is primarily
                    required for technical colleges and institutions.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
