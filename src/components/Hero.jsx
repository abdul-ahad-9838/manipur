"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";

const DesktopHeroSlider = dynamic(() => import("./DesktopHeroSlider"), {
  ssr: false,
});

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

  const isDesktop = useIsDesktop(768);

  return (
    <section className="lpu-hero-container">
      {isDesktop && <DesktopHeroSlider images={heroImages} title={title} />}

      {isDesktop === false && (
        <div className="hero-image-wrapper mobile-only">
          <Image
            src={heroImages[0]}
            alt={title}
            fill
            priority
            quality={65}
            sizes="100vw"
            className="hero-image active"
          />
        </div>
      )}

      <div className="lpu-hero-overlay" />

      <div className="container hero-layout">
        <div className="hero-typography">
          <h1>{title}</h1>

          <p className="hero-subtext">{subtitle}</p>

          <div className="hero-buttons">
            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-orange"
            >
              Admissions 2026
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
