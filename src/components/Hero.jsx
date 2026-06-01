"use client";

import API from "@/lib/api";
import "@/styles/Hero.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const [heroData, setHeroData] = useState({
    title: "Shaping The Leaders of Tomorrow",
    subtitle:
      "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
    images: [],
  });

  const [pageContent, setPageContent] = useState({
    stat1Value: "2019",
    stat1Label: "Year Established",
    stat2Value: "100+",
    stat2Label: "Receive Multiyear Fellowships",
    stat3Value: "50+",
    stat3Label: "Academic Programs",
    stat4Value: "10",
    stat4Label: "Research Centers",
  });

  useEffect(() => {
    API.get("/settings/hero")
      .then(({ data }) => {
        console.log("Hero data:", data);
        if (data?.content) setHeroData(data.content);
      })
      .catch(() => {});

    API.get("/settings/page-home")
      .then(({ data }) => {
        if (data?.content) {
          setPageContent((prev) => ({
            ...prev,
            ...data.content,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const { title, subtitle, images } = heroData;

  const displayImages =
    images.length > 0
      ? images
      : ["/hero/01.webp", "/hero/02.webp", "/hero/03.webp"];

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);

      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);

      setFade(true);

      setTimeout(() => {
        setFade(false);
      }, 1000); // match CSS transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, displayImages.length]);

  return (
    <section className="lpu-hero-container">
      {/* New Image */}
      <div className="hero-image-wrapper">
        <Image
          src={displayImages[currentImageIndex]}
          alt={title}
          fill
          priority={currentImageIndex === 0}
          className="hero-image"
          sizes="100vw"
        />

        {fade && (
          <Image
            src={displayImages[previousImageIndex]}
            alt=""
            fill
            className="hero-image hero-image-fade"
            // sizes="100vw"
          />
        )}
      </div>

      <div className="lpu-hero-overlay"></div>

      <div className="container hero-layout">
        <div className="hero-typography">
          <h1 className="hero-main-title">{title}</h1>
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

          <div className="hero-trust-badges">
            <div className="trust-item">
              <span className="big-num">{pageContent.stat1Value}</span>
              <span className="small-txt">{pageContent.stat1Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat2Value}</span>
              <span className="small-txt">{pageContent.stat2Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat3Value}</span>
              <span className="small-txt">{pageContent.stat3Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat4Value}</span>
              <span className="small-txt">{pageContent.stat4Label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
