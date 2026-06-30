import Image from "next/image";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

const DesktopHeroSlider = dynamic(() => import("./DesktopHeroSlider"));

const DEFAULT_CONTENT = {
  title: "Shaping The Leaders of Tomorrow",
  subtitle:
    "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
  images: [
    "/api/images/6a34cb48446374637b2f4caa",
    "/api/images/6a34cb4c446374637b2f4cab",
    "/api/images/6a34cb4f446374637b2f4cac",
    "/api/images/6a34cb52446374637b2f4cad",
    "/api/images/6a34cb55446374637b2f4cae",
  ],
};

function Hero({ data }) {
  const heroData = useMemo(() => data ?? DEFAULT_CONTENT, [data]);
  const { title, subtitle, images } = heroData;
  const heroImages = images?.length ? images : DEFAULT_CONTENT.images;

  return (
    <section className="lpu-hero-container">
      {/* Desktop view handled via CSS display rules inside the component wrapper */}
      <div className="container hero-layout">
        <h1>{title}</h1>
        <p className="hero-subtext">{subtitle}</p>
        <div className="hero-buttons">
          <a
            href="https://admission.miu.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Admissions 2026"
          >
            Admissions 2026
          </a>
        </div>
      </div>
      <div className="desktop-only-wrapper">
        <DesktopHeroSlider images={heroImages} title={title} />
      </div>

      {/* Mobile view is now always present in HTML so 'priority' works instantly */}
      <div className="hero-image-wrapper mobile-only-wrapper">
        <Image
          src={heroImages[0]}
          alt={title}
          fill
          priority // Tells the browser to download this immediately
          quality={65}
          fetchPriority="high"
          sizes="(max-width: 768px) 375px, 100vw"
          className="hero-image active"
        />
      </div>

      <div className="lpu-hero-overlay" />
    </section>
  );
}

export default memo(Hero);
