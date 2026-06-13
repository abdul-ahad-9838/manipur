import { headers } from "next/headers";
import Image from "next/image";
import "@/styles/Spotlight.css";
import "@/styles/App.css";

const defaultRow1 = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    title: "Global Summit 2026",
    desc: "A prestigious gathering of world leaders and visionaries shaping the future of education.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    title: "Youth Talk",
    desc: "We welcomed Wing Commander Vyomika Singh to deliver a powerful message of fearless ambition.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    title: "Convocation Ceremony",
    desc: "Celebrating our brilliant graduates as they embark on their journey to change the world.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    title: "Annual Cultural Fest",
    desc: "A vibrant explosion of colors, music, and art, showcasing the incredible talent of our students.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    title: "Dance Competition",
    desc: "Energetic performances displaying the passion and artistic expression of our dynamic student body.",
  },
];

const defaultRow2 = [
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
    title: "Coke Studio Concert",
    desc: "An electrifying live performance by top artists, leaving the crowd mesmerized and energized.",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    title: "Live Concerts",
    desc: "Unforgettable musical nights hosted regularly to ensure students have the perfect work-life balance.",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    title: "Extra-Curricular",
    desc: "We cherished an unforgettable interactive session with Padma Bhushan Awardees and industry legends.",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=800",
    title: "Guest Sessions",
    desc: "Inspiring talks from industry titans sharing their experiences and profound knowledge.",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=800",
    title: "Awards & Recognition",
    desc: "Honoring the relentless dedication and outstanding achievements of our prodigies.",
  },
];

async function getSpotlightData() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/settings/spotlight`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        row1: defaultRow1,
        row2: defaultRow2,
      };
    }

    const data = await res.json();

    return {
      row1: data?.content?.row1?.length ? data.content.row1 : defaultRow1,
      row2: data?.content?.row2?.length ? data.content.row2 : defaultRow2,
    };
  } catch (error) {
    console.error("Failed to fetch spotlight data:", error);

    return {
      row1: defaultRow1,
      row2: defaultRow2,
    };
  }
}

export default async function Spotlight() {
  const { row1, row2 } = await getSpotlightData();

  return (
    <section className="spotlight-section">
      <div className="container">
        <div className="spotlight-header-container">
          <div className="spotlight-head">
            <div className="spotlight-badge-pulse">
              <span className="pulse-dot"></span>
              <span className="spotlight-badge">HAPPENING NOW</span>
            </div>

            <h2 className="spotlight-title">
              MIU <span className="highlight-text">Spotlight</span>
            </h2>

            <p className="spotlight-subtitle">
              Relive the most magnificent moments, electrifying concerts, and
              mega events that define the vibrant campus life at Manipur
              International University.
            </p>
          </div>
        </div>
      </div>

      <div className="spotlight-marquee-container">
        {/* First Row */}
        <div className="marquee-row">
          <div className="marquee-content marquee-left">
            {[...row1, ...row1, ...row1].map((img, index) => (
              <div key={`row1-${index}`} className="marquee-item">
                <Image
                  src={img.src}
                  alt={img.title}
                  className="marquee-img"
                  width={800}
                  height={500}
                />

                <div className="marquee-info">
                  <h4>{img.title}</h4>
                  <p>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="marquee-row">
          <div className="marquee-content marquee-right">
            {[...row2, ...row2, ...row2].map((img, index) => (
              <div key={`row2-${index}`} className="marquee-item">
                <Image
                  src={img.src}
                  alt={img.title}
                  className="marquee-img"
                  width={800}
                  height={500}
                />

                <div className="marquee-info">
                  <h4>{img.title}</h4>
                  <p>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
