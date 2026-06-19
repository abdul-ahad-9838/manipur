import "@/styles/AffiliationsPage.css";
import Link from "next/link";
import RecognitionCards from "@/components/RecognitionCards";

const DEFAULT_RECOGNITIONS = [
  {
    name: "University Grants Commission",
    short: "UGC",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png",
    desc: "Recognized under Section 2(f) & 22 of UGC Act, 1956",
    color: "#1a5c1a",
    fileUrl: "/UGC Letter.pdf",
  },
  {
    name: "Ministry of Education",
    short: "MOE",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ministry_of_Education_India.svg/500px-Ministry_of_Education_India.svg.png",
    desc: "Branch of Government of India",
    color: "#333",
  },
  {
    name: "Department of Education (S)",
    short: "DOE",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppCHFCEk66RuVBkOOc0MqgQdR1nQKLZTNbg&s",
    desc: "Government of Manipur",
    color: "#333",
  },
  {
    name: "Association of Indian Universities",
    short: "AIU",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Association_of_Indian_Universities_Logo.svg/500px-Association_of_Indian_Universities_Logo.svg.png",
    desc: "Premier body of universities in India since 1925",
    color: "#8b1a1a",
    fileUrl: "/AIU Letter.pdf",
  },
  {
    name: "All India Council for Technical Education",
    short: "AICTE",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png",
    desc: "Statutory body under Ministry of Education, Govt. of India",
    color: "#1a3a6b",
    fileUrl: "/AICTE.pdf",
  },
];

async function getRecognitions() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/recognitions`,
    );

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
              <RecognitionCards key={i} recognitions={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
