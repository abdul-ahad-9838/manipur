"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/NewsSlider.css";

const INTERVAL = 5000;

export default function NewsSlider({ fallback = [] }) {
  const [posts, setPosts] = useState(fallback);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pct, setPct] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Fetch
  useEffect(() => {
    API.get("/blogs")
      .then(({ data }) => {
        if (data?.length) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const total = posts.length;

  const goTo = useCallback((i) => {
    setActive(i);
    setPct(0);
    startRef.current = null;
  }, []);

  const goNext = useCallback(() => {
    setActive((p) => (p + 1) % total);
    setPct(0);
    startRef.current = null;
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((p) => (p - 1 + total) % total);
    setPct(0);
    startRef.current = null;
  }, [total]);

  // Auto slider
  useEffect(() => {
    if (paused || total === 0) return;

    const tick = (t) => {
      if (!startRef.current) startRef.current = t;

      const progress = ((t - startRef.current) / INTERVAL) * 100;
      const clamped = Math.min(progress, 100);

      setPct(clamped);

      if (clamped >= 100) {
        goNext();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paused, goNext, total]);

  const featured = posts[active];
  const side = useMemo(
    () => posts.filter((_, i) => i !== active).slice(0, 4),
    [posts, active],
  );

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
            {posts.concat(posts).map((p, i) => (
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
            <div className="ns-feat-img-wrap">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="ns-feat-img"
              />

              <span className="ns-feat-cat">{featured.category}</span>

              {/* progress */}
              <svg className="ns-ring" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" className="ns-ring-bg" />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="ns-ring-fill"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={2 * Math.PI * 18 * (1 - pct / 100)}
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
            {side.map((p, i) => {
              const realIdx = posts.indexOf(p);

              return (
                <div
                  key={p._id}
                  className="ns-side-card"
                  onClick={() => goTo(realIdx)}
                >
                  <img src={p.coverImage} className="ns-side-img" />

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
