"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

function CampusLifeClient({ tabs, content }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTab = tabs[activeIndex];
  const tabCount = tabs.length;

  useEffect(() => {
    if (tabCount <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [tabCount]);

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
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`campus-tab ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="campus-gallery">
            <div className="gallery-glass">
              {tabs.map((tab, index) => (
                <Image
                  key={tab.id}
                  src={tab.img}
                  alt={tab.name}
                  width={800}
                  height={500}
                  quality={75}
                  priority={index === 0}
                  className={`gallery-image ${
                    activeIndex === index ? "active-image" : "hidden-image"
                  }`}
                />
              ))}

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

export default memo(CampusLifeClient);
