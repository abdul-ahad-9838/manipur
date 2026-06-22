"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // start fade-out after 2s
    const fadeTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 1000);

    // remove AFTER fade animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1000 + 1200); // delay + animation duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isAnimatingOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        <Image
          src="/emblem.webp"
          alt="MIU Logo"
          className="splash-logo"
          width={150}
          height={150}
          priority
        />

        <div className="splash-miu-blocks" aria-hidden="true">
          <span>M</span>
          <span>I</span>
          <span>U</span>
        </div>
      </div>
    </div>
  );
}
