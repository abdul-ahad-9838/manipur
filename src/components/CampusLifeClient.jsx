// CampusLifeClient.jsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/CampusLife.css";

export default function CampusLifeClient({ tabs, content }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const idx = tabs.findIndex((tab) => tab.id === current.id);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [tabs]);

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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`campus-tab ${
                  activeTab.id === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="campus-gallery">
            <div className="gallery-glass">
              <Image
                src={activeTab.img}
                alt={activeTab.name}
                className="gallery-image fade-in-image"
                key={activeTab.id}
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
}
