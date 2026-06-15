"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/Hero.css";

const Hero = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [heroData, setHeroData] = useState({
    title: "Shaping The Leaders of Tomorrow",
    subtitle:
      "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
    images: [],
  });

  useEffect(() => {
    if (data?.content) setHeroData(data.content);
  }, []);

  const { title, subtitle, images } = heroData;

  const displayImages =
    images.length > 0
      ? images
      : ["/hero/01.webp", "/hero/02.webp", "/hero/03.webp"];

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <section className="lpu-hero-container">
      {/* New Image */}
      <div className="hero-image-wrapper">
        {displayImages.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={title}
            fill
            priority={index === 0}
            className={`hero-image ${
              index === currentImageIndex ? "active" : ""
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="lpu-hero-overlay"></div>

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
};

export default Hero;
