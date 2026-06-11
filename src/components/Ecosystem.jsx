// Ecosystem.jsx (Server Component)

import { headers } from "next/headers";
import "@/styles/Ecosystem.css";
import React from "react";

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

async function getEcosystem() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const res = await fetch(`${protocol}://${host}/api/settings/ecosystem`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function Ecosystem() {
  const data = await getEcosystem();

  const cards =
    data?.content?.cards?.length > 0 ? data.content.cards : DEFAULT_CARDS;

  return (
    <section className="ecosystem-section-container">
      <div className="ecosystem-fixed-header">
        <div className="container">
          <div className="ecosystem-header-content">
            <span className="hero-label-text">360° LEARNING ECOSYSTEM</span>
            <div className="hero-label-line"></div>
            <h2 className="hero-main-title">
              Your Growth, Our Priority: Empowering every student through a
              complete learning experience
            </h2>
          </div>
        </div>
      </div>

      {cards.map((card, index) => (
        <React.Fragment key={card.id}>
          <div className="ecosystem-card">
            <div
              className="card-inner"
              style={{
                flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
              }}
            >
              <div className="card-content">
                <span className="card-meta">MIU ECOSYSTEM {card.id}</span>

                <span className="card-label">{card.label}</span>

                <h2>{card.title}</h2>

                <p>{card.description}</p>

                <div className="card-actions">
                  <a href="#apply" className="btn-explore">
                    EXPLORE MORE <span>→</span>
                  </a>
                </div>
              </div>

              <div className="card-image-box">
                <img src={card.image} alt={card.title} />

                <div
                  className="image-vignette"
                  style={{
                    background: `linear-gradient(to ${
                      index % 2 === 0 ? "right" : "left"
                    }, #000 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.4) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
