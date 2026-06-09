"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/NewsSlider.css";

const FALLBACK = [
  {
    _id: "1",
    category: "ACADEMICS",
    createdAt: new Date().toISOString(),
    title: "MIU Partners with Global Tech Consortium for AI Research",
    excerpt:
      "A landmark agreement that brings world-class AI resources and research opportunities to MIU students.",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
  {
    _id: "2",
    category: "PLACEMENT",
    createdAt: new Date().toISOString(),
    title: "Highest Record: 6 students secure 45 LPA + packages",
    excerpt:
      "The placement season kicks off with a bang as top tech giants recruit heavily from our engineering pool.",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
  {
    _id: "3",
    category: "CAMPUS LIFE",
    createdAt: new Date().toISOString(),
    title: 'MIU Annual Cultural Fest "Spectra 2026" Announced',
    excerpt:
      "Get ready for the biggest celebration of talent, art, and music in the North East India region.",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
  {
    _id: "4",
    category: "RESEARCH",
    createdAt: new Date().toISOString(),
    title: "Groundbreaking Study on Himalayan Biodiversity Published",
    excerpt:
      "MIU faculty and students publish an extensive report in the Journal of Biological Sciences.",
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
  {
    _id: "5",
    category: "ADMISSIONS",
    createdAt: new Date().toISOString(),
    title: "Scholarship Test registrations reach all-time high",
    excerpt:
      "Over 50,000 students across India have registered for the upcoming merit scholarship examination.",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
  {
    _id: "6",
    category: "EVENTS",
    createdAt: new Date().toISOString(),
    title: "International Conference on Sustainable Development 2026",
    excerpt:
      "MIU hosts leading researchers and policymakers for a two-day summit on sustainability and innovation.",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    slug: "",
  },
];

const INTERVAL = 5000;

export default function NewsSlider() {
  const [posts, setPosts] = useState(FALLBACK);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [paused, setPaused] = useState(false);
  const [pct, setPct] = useState(0);
  const rafRef = useRef(null);
  const t0Ref = useRef(null);

  useEffect(() => {
    API.get("/blogs")
      .then(({ data }) => {
        if (data?.length) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback(
    (idx) => {
      setPrev(active);
      setActive(idx);
      setPct(0);
      t0Ref.current = null;
    },
    [active],
  );

  const goNext = useCallback(
    () => goTo((active + 1) % posts.length),
    [active, posts.length, goTo],
  );
  const goPrev = useCallback(
    () => goTo((active - 1 + posts.length) % posts.length),
    [active, posts.length, goTo],
  );

  // Auto-advance with progress
  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (now) => {
      if (!t0Ref.current) t0Ref.current = now;
      const elapsed = now - t0Ref.current;
      const p = Math.min((elapsed / INTERVAL) * 100, 100);
      setPct(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
      else goNext();
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paused, goNext]);

  const featured = posts[active];
  const side = posts.filter((_, i) => i !== active).slice(0, 4);

  return (
    <section
      className="ns-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Ticker strip ── */}
      <div className="ns-ticker">
        <span className="ns-ticker-label">LIVE</span>
        <div className="ns-ticker-track">
          <div className="ns-ticker-inner">
            {[...posts, ...posts].map((p, i) => (
              <span key={i} className="ns-ticker-item">
                <span className="ns-ticker-cat">{p.category}</span> {p.title}
                <span className="ns-ticker-sep">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* ── Section header ── */}
        <div className="ns-header">
          <div>
            <h2 className="ns-title">
              Latest Happening <em>@ MIU</em>
            </h2>
            <p className="ns-sub">
              News, research breakthroughs &amp; campus highlights
            </p>
          </div>
          <div className="ns-controls">
            <button className="ns-btn" onClick={goPrev}>
              ‹
            </button>
            <div className="ns-counter">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(posts.length).padStart(2, "0")}
            </div>
            <button className="ns-btn" onClick={goNext}>
              ›
            </button>
            <Link
              href="/blog"
              className="btn btn-orange"
              style={{
                fontSize: "0.82rem",
                padding: "10px 20px",
                whiteSpace: "nowrap",
              }}
            >
              All Posts →
            </Link>
          </div>
        </div>

        {/* ── Magazine layout ── */}
        <div className="ns-magazine">
          {/* Featured */}
          <div className="ns-featured" key={active}>
            <div className="ns-feat-img-wrap">
              {featured.coverImage ? (
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="ns-feat-img"
                />
              ) : (
                <div className="ns-feat-img ns-img-placeholder">📰</div>
              )}
              <div className="ns-feat-overlay" />
              <span className="ns-feat-cat">{featured.category}</span>
              {/* Progress ring */}
              <svg className="ns-ring" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" className="ns-ring-bg" />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="ns-ring-fill"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
                />
              </svg>
            </div>
            <div className="ns-feat-body">
              <span className="ns-feat-date">
                {new Date(featured.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h3 className="ns-feat-title">{featured.title}</h3>
              <p className="ns-feat-excerpt">{featured.excerpt}</p>
              {featured.slug ? (
                <Link href={`/blogs/${featured.slug}`} className="ns-feat-link">
                  Read Full Story <span>→</span>
                </Link>
              ) : (
                <span className="ns-feat-link muted">Read Full Story →</span>
              )}
            </div>
          </div>

          {/* Side stack */}
          <div className="ns-side">
            {side.map((post, i) => {
              const realIdx = posts.indexOf(post);
              return (
                <div
                  key={post._id}
                  className="ns-side-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  onClick={() => goTo(realIdx)}
                >
                  <div className="ns-side-img">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <div className="ns-side-img-placeholder">📰</div>
                    )}
                  </div>
                  <div className="ns-side-body">
                    <span className="ns-side-cat">{post.category}</span>
                    <h4 className="ns-side-title">{post.title}</h4>
                    <span className="ns-side-date">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="ns-side-num">
                    {String(realIdx + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dot nav ── */}
        <div className="ns-dots">
          {posts.map((_, i) => (
            <button
              key={i}
              className={`ns-dot ${i === active ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
