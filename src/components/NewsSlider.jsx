"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import "@/styles/NewsSlider.css";

export default function NewsSlider({ blogs = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const posts = Array.isArray(blogs) ? blogs : [];

  const total = posts.length;

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActive((p) => (p + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActive((p) => (p - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i) => {
    setActive(i);
  }, []);

  const featured = posts[active];

  const side = useMemo(() => {
    return posts.filter((_, i) => i !== active).slice(0, 5);
  }, [posts, active]);

  const tickerItems = useMemo(() => {
    return [...posts, ...posts];
  }, [posts]);

  if (!posts.length || !featured) {
    return null;
  }

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
              <span
                key={`${p._id || p.slug || i}-${i}`}
                className="ns-ticker-item"
              >
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
            <button type="button" className="ns-btn" onClick={goPrev}>
              ‹
            </button>

            <div className="ns-counter">
              {active + 1} / {total}
            </div>

            <button type="button" className="ns-btn" onClick={goNext}>
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
            {side.map((post) => {
              const realIdx = posts.findIndex((item) => item._id === post._id);

              return (
                <div
                  key={post._id || post.slug}
                  className="ns-side-card"
                  onClick={() => goTo(realIdx)}
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="ns-side-img"
                  />

                  <div className="ns-side-body">
                    <span className="ns-side-cat">{post.category}</span>

                    <h4 className="ns-side-title">{post.title}</h4>
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
