"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "@/lib/api";

/**
 * Reusable page hero banner.
 * Loads image + text from /settings/page-{settingsKey}
 * Falls back to gradient if no image set.
 */
export default function PageHero({
  settingsKey,
  defaultTitle,
  defaultSubtitle,
  breadcrumb = [],
}) {
  const [pc, setPc] = useState({});

  useEffect(() => {
    API.get(`/settings/page-${settingsKey}`)
      .then(({ data }) => {
        if (data?.content) setPc(data.content);
      })
      .catch(() => {});
  }, [settingsKey]);

  const hasBg = !!pc.heroImage;
  const bgStyle = hasBg
    ? {
        backgroundImage: `url(${pc.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background:
          "linear-gradient(135deg, var(--lpu-black) 0%, #1a2a4a 100%)",
      };

  return (
    <div className="page-hero-banner" style={bgStyle}>
      {hasBg && <div className="page-hero-overlay" />}
      <div className="container page-hero-content">
        {breadcrumb.length > 0 && (
          <nav className="page-hero-breadcrumb">
            <Link href="/">Home</Link>
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                <span>›</span>
                {b.href ? (
                  <Link href={b.href}>{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1>{pc.heroTitle || defaultTitle}</h1>
        {(pc.heroSubtitle || defaultSubtitle) && (
          <p>{pc.heroSubtitle || defaultSubtitle}</p>
        )}
      </div>
    </div>
  );
}
