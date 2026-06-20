"use client";

import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import "@/styles/Hero.css";

const DEFAULT_IMAGES = ["/hero/01.webp", "/hero/02.webp", "/hero/03.webp"];

const DEFAULT_CONTENT = {
  title: "Shaping The Leaders of Tomorrow ",
  subtitle:
    "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
  images: [
    "/api/images/69e145133330d1ac59fe5b08",
    "/api/images/69e1485a3330d1ac59fe5b0b",
    "/api/images/69e14d2d3330d1ac59fe5b0c",
    "/api/images/69e4c6a483b3aec7e41c1efc",
    "/api/images/69e4c6ab83b3aec7e41c1efd",
  ],
};

function Hero({ data }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Derive data directly from props
  const heroData = useMemo(() => data?.content ?? DEFAULT_CONTENT, [data]);

  const { title, subtitle, images } = heroData;

  // Memoize image list
  const displayImages = useMemo(
    () => (images?.length ? images : DEFAULT_IMAGES),
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
