"use client";

import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import "@/styles/CampusLife.css";
import Image from "next/image";

const DEFAULT_TABS = [
  {
    id: "library",
    name: "Central Library",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "labs",
    name: "High-Tech Labs",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "hostels",
    name: "Premium Hostels",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "sports",
    name: "Sports Complex",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
  },
];

const CampusLife = () => {
  const [campusData, setCampusData] = useState(DEFAULT_TABS);
  const [activeTab, setActiveTab] = useState(DEFAULT_TABS[0]);
  const [content, setContent] = useState({
    title: "A Campus Built For You",
    subtitle:
      "Experience world-class infrastructure spread over a massive, eco-friendly campus designed to inspire creativity and innovation.",
  });

  useEffect(() => {
    API.get("/settings/campus")
      .then(({ data }) => {
        if (data?.content) {
          if (data.content.tabs?.length) {
            setCampusData(data.content.tabs);
            setActiveTab(data.content.tabs[0]);
          }
          setContent((prev) => ({ ...prev, ...data.content }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((cur) => {
        const idx = campusData.findIndex((t) => t.id === cur.id);
        return campusData[(idx + 1) % campusData.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [campusData]);

  return (
    <section id="campus" className="campus-section section-padding">
      <div className="container">
        <div className="campus-header">
          <div>
            <span className="section-badge">Life At MIU</span>
            <h2 className="section-title">{content.title}</h2>
            <p className="section-subtitle campus-sub">{content.subtitle}</p>
          </div>
        </div>

        <div className="campus-interactive">
          <div className="campus-tabs">
            {campusData.map((tab) => (
              <button
                key={tab.id}
                className={`campus-tab ${activeTab.id === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="campus-gallery">
            <div className="gallery-glass">
              {/* <img
                src={activeTab.img}
                alt={activeTab.name}
                className="gallery-image fade-in-image"
                key={activeTab.id}
              /> */}
              <Image
                src={activeTab.img}
                alt={activeTab.name}
                className="gallery-image fade-in-image"
                key={`${activeTab.id}-next`}
                width={800}
                height={500}
              />
              <div className="gallery-glass-info">
                <h3>{activeTab.name}</h3>
                <p>State-Of-The-Art Facilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusLife;
