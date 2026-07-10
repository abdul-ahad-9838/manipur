"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NewsSlider({ blogs = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cropBlog = blogs.slice(0, 6);
  const posts = Array.isArray(cropBlog) ? cropBlog : [];

  const total = posts?.length;

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

  // Carry the original index through instead of re-deriving it later with
  // findIndex (which was O(n) per card => O(n^2) per render).
  const side = useMemo(() => {
    return posts
      .map((post, i) => ({ post, i }))
      .filter(({ i }) => i !== active)
      .slice(0, 5);
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
          <div
            className="ns-ticker-inner"
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
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
            <div className="ns-feat-img-wrap">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="25vw"
                className="ns-feat-img"
                placeholder="empty"
              />
              <span className="ns-feat-cat">{featured.category}</span>
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
            {side?.map(({ post, i }) => (
              <div
                key={post._id || post.slug}
                className="ns-side-card"
                onClick={() => goTo(i)}
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={75}
                  height={75}
                  className="ns-side-img"
                />

                <div className="ns-side-body">
                  <span className="ns-side-cat">{post.category}</span>

                  <h4 className="ns-side-title">{post.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
