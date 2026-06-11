"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/NewsSlider.css";

const INTERVAL = 5; // seconds (CSS friendly)

export default function NewsSlider({ fallback = [] }) {
  const [posts, setPosts] = useState(fallback);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    API.get("/blogs")
      .then(({ data }) => {
        if (data?.length) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const total = posts.length;

  const goNext = useCallback(() => {
    setActive((p) => (p + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((p) => (p - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i) => {
    setActive(i);
  }, []);

  const featured = posts[active];

  const side = useMemo(() => {
    return posts.filter((_, i) => i !== active).slice(0, 4);
  }, [posts, active]);

  const tickerItems = useMemo(() => posts.concat(posts), [posts]);

  if (!featured) return null;

  return (
    <section
      className="ns-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ticker */}
      <div className="ns-ticker">
        <span className="ns-ticker-label">LIVE</span>

        <div className="ns-ticker-track">
          <div className="ns-ticker-inner">
            {tickerItems.map((p, i) => (
              <span key={i} className="ns-ticker-item">
                <span className="ns-ticker-cat">{p.category}</span>
                {p.title}
                <span className="ns-ticker-sep">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="ns-header">
          <div>
            <h2 className="ns-title">
              Latest <em>News</em>
            </h2>
            <p className="ns-sub">News & campus updates</p>
          </div>

          <div className="ns-controls">
            <button className="ns-btn" onClick={goPrev}>
              ‹
            </button>

            <div className="ns-counter">
              {active + 1} / {total}
            </div>

            <button className="ns-btn" onClick={goNext}>
              ›
            </button>

            <Link href="/blogs" className="btn btn-orange">
              All
            </Link>
          </div>
        </div>

        {/* Layout */}
        <div className="ns-magazine">
          {/* Featured */}
          <div className="ns-featured">
            <div className={`ns-feat-img-wrap ${paused ? "paused" : ""}`}>
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="ns-feat-img"
              />

              <span className="ns-feat-cat">{featured.category}</span>

              {/* PURE CSS RING */}
              <svg className="ns-ring" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" className="ns-ring-bg" />

                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className={`ns-ring-fill ${paused ? "paused" : ""}`}
                  onAnimationEnd={goNext}
                />
              </svg>
            </div>

            <div className="ns-feat-body">
              <h3 className="ns-feat-title">{featured.title}</h3>
              <p className="ns-feat-excerpt">{featured.excerpt}</p>

              <Link href={`/blogs/${featured.slug}`} className="btn-explore">
                Read More →
              </Link>
            </div>
          </div>

          {/* Side */}
          <div className="ns-side">
            {side.map((p) => {
              const realIdx = posts.indexOf(p);

              return (
                <div
                  key={p._id}
                  className="ns-side-card"
                  onClick={() => goTo(realIdx)}
                >
                  <img
                    src={p.coverImage}
                    className="ns-side-img"
                    alt={p.title}
                  />

                  <div className="ns-side-body">
                    <span className="ns-side-cat">{p.category}</span>
                    <h4 className="ns-side-title">{p.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
