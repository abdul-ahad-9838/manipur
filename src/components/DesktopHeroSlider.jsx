"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

function DesktopHeroSlider({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images?.length || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-image-wrapper desktop-only">
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={title}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "low"}
          className={`hero-image ${index === currentImageIndex ? "active" : ""
            }`}
        />
      ))}
    </div>
  );
}

export default memo(DesktopHeroSlider);
