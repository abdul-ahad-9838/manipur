"use client";

import "@/styles/Hero.css";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

const DEFAULT_CONTENT = {
  title: "Shaping The Leaders of Tomorrow ",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Derive data directly from props
  const heroData = useMemo(() => data ?? DEFAULT_CONTENT, [data]);

  const { title, subtitle, images } = heroData;

  // Memoize image list
  const displayImages = useMemo(
    () => (images?.length ? images : DEFAULT_CONTENT?.images),
    [images],
  );

  const imageCount = displayImages.length;

  // Auto slide
  useEffect(() => {
    if (imageCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageCount]);

  // Preload next image
  useEffect(() => {
    if (imageCount <= 1) return;

    const nextIndex = (currentImageIndex + 1) % imageCount;
    const nextImage = displayImages[nextIndex];

    const img = new window.Image();
    img.src = nextImage;
  }, [currentImageIndex, displayImages, imageCount]);

  return (
    <section className="lpu-hero-container">
      {/* Background Images */}
      <div className="hero-image-wrapper">
        {displayImages.map((img, index) => (
          <Image
            key={`${img}-${index}`}
            src={img}
            alt={title}
            fill
            priority={index === 0}
            quality={75}
            sizes="80vw"
            className={`hero-image ${
              index === currentImageIndex ? "active" : ""
            }`}
          />
        ))}
      </div>

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
