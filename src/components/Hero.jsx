"use client";

import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

const DEFAULT_CONTENT = {
  title: "Shaping The Leaders of Tomorrow",
  subtitle:
    "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
  images: [
    {
      src: "/hero/banner_02.webp",
      url: "https://admission.miu.edu.in/",
    },
    {
      src: "/hero/banner_04.webp",
      url: "https://admission.miu.edu.in/",
    },
    {
      src: "/hero/banner_02.webp",
      url: "https://admission.miu.edu.in/",
    },
    {
      src: "/hero/banner_04.webp",
      url: "https://admission.miu.edu.in/",
    },
  ],
};

function Hero() {
  const heroData = DEFAULT_CONTENT;
  const { images } = heroData;

  const heroImages = images?.length ? images : DEFAULT_CONTENT.images;

  // Clone first + last slide for infinite carousel
  const sliderImages = useMemo(() => {
    if (!heroImages.length) return [];

    return [
      heroImages[heroImages.length - 1],
      ...heroImages,
      heroImages[0],
    ];
  }, [heroImages]);

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  // Prevent multiple clicks during animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const next = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTransition(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTransition(true);
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    // Reached cloned first slide
    if (index === sliderImages.length - 1) {
      setTransition(false);
      setIndex(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    // Reached cloned last slide
    if (index === 0) {
      setTransition(false);
      setIndex(sliderImages.length - 2);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    // Normal slide completed
    setIsAnimating(false);
  };

  if (!sliderImages.length) return null;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        maxHeight: "100dvh",
      }}
    >
      {/* Background Slider */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          width: `${sliderImages.length * 100}% `,
          transform: `translateX(-${index * (100 / sliderImages.length)
            }%)`,
          transition: transition
            ? "transform 0.5s ease-in-out"
            : "none",
        }}
      >
        {sliderImages.map((img, i) => (
          <div
            key={`${img.src} -${i} `}
            style={{
              width: `${100 / sliderImages.length}% `,
              flexShrink: 0,
            }}
          >
            <a
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={img.src}
                alt={img.alt || ""}
                width={1600}
                height={700}
                priority={i === 1}
                quality={70}
                fetchPriority={i === 1 ? "high" : "auto"}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="lpu-hero-overlay" />

      {/* Previous */}
      <button
        type="button"
        onClick={prev}
        disabled={isAnimating}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          background: "rgb(14 1 1 / 49%)",
          color: "#fff",
          cursor: isAnimating ? "not-allowed" : "pointer",
          fontSize: "22px",
          opacity: isAnimating ? 0.6 : 1,
        }}
      >
        &#10094;
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={next}
        disabled={isAnimating}
        aria-label="Next slide"
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          background: "rgb(14 1 1 / 49%)",
          color: "#fff",
          cursor: isAnimating ? "not-allowed" : "pointer",
          fontSize: "22px",
          opacity: isAnimating ? 0.6 : 1,
        }}
      >
        &#10095;
      </button>
    </section>
  );
}

export default memo(Hero);
