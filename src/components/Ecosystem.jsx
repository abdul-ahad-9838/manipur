"use client";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

const DEFAULT_CARDS = [
  {
    id: 1,
    label: "ACADEMIC & CULTURAL EXCELLENCE",
    title: "Where Innovation Meets Heritage",
    description:
      "Empowering future scientists with state-of-the-art laboratories and global research partnerships while celebrating Manipur's rich talent and spirit.",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    label: "CAREER SUCCESS",
    title: "Global Career Opportunities",
    description:
      "Unmatched placement records with the world's top MNCs. We bridge the gap between classroom learning and industrial demands.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    label: "ENTREPRENEURSHIP",
    title: "Startup Incubation Center",
    description:
      "Turning ideas into reality. Our on-campus incubation center provides the mentorship and funding resources needed for the next generation of entrepreneurs.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    label: "360° LEARNING",
    title: "The Complete Ecosystem",
    description:
      "A comprehensive environment where academic learning, physical growth, and mental well-being coexist to form the perfect foundation for your future.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 5,
    label: "RESEARCH & INNOVATION",
    title: "Leading the Way to Discovery",
    description:
      "Our research-intensive programs and advanced facilities enable students to push the boundaries of knowledge.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function Ecosystem({ data }) {
  const cards =
    Array.isArray(data) && data.length > 0 ? data : DEFAULT_CARDS;

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "100px 20px",
        boxSizing: "border-box",
      }}
    >

      {/* Header */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 60px",
        }}
      >
        <SectionHeader badge="360° LEARNING ECOSYSTEM" title="Your Growth, Our Priority" subtitle="Empowering every student through a complete learning experience." />

      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
        }}
      >
        {cards.map((card, index) => (

          <article
            key={card.id || index}
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              background: "#f8f7f4",
              border: "1px solid #e8e5df",
              boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}

          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "270px",
                overflow: "hidden",
                background: "#f5f4f1",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
              />

              {/* Image Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(0,0,0,0.35))",
                }}
              />

              {/* Number */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.96)",
                  color: "#111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 5px 18px rgba(0,0,0,0.12)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Category */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "22px",
                  right: "22px",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {card.label}
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                padding: "28px 26px 26px",
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                color: "#111111",
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "1.5px",
                  fontWeight: 700,
                  color: "#b8860b",
                  marginBottom: "14px",
                }}
              >
                MIU ECOSYSTEM {String(index + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3
                style={{
                  margin: "0 0 14px",
                  fontSize: "26px",
                  lineHeight: 1.15,
                  fontWeight: 650,
                  letterSpacing: "-0.6px",
                  color: "#171717",
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  color: "#666666",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {card.description}
              </p>

              {/* Bottom Action
              <button
                type="button"
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 15px",
                  border: "none",
                  borderRadius: "16px",
                  background: "#171717",
                  cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
                }} >
                <span
                  style={{
                    flex: 1,
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.2px",
                    color: "#ffffff",
                  }} > Explore More </span>
                <span style={{ color: "#d4a017", fontSize: "18px", }} > → </span>
              </button> */}
            </div>
          </article>

        ))}
      </div>
    </section>
  );
}