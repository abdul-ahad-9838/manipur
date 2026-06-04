'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import '@/styles/Blog.css';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/blogs')
      .then(({ data }) => setBlogs(data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <span className="section-badge">MIU BLOG</span>
          <h1 className="blog-hero-title">Insights & Updates</h1>
          <p className="blog-hero-sub">Stories, research highlights, and campus life from Manipur International University.</p>
        </div>
      </div>

      <div className="container blog-container">
        {loading && <p className="blog-loading">Loading posts...</p>}

        {!loading && blogs.length === 0 && (
          <div className="blog-empty">
            <p>No blog posts yet. Check back soon.</p>
          </div>
        )}

        <div className="blog-grid">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id} className="blog-card">
              <div className="blog-card-img">
                {blog.coverImage
                  ? <img src={blog.coverImage} alt={blog.title} onError={e => { e.target.style.display='none'; e.target.parentNode.classList.add('blog-img-fallback'); }} />
                  : null
                }
                {!blog.coverImage && <div className="blog-img-placeholder"><span>📰</span></div>}
              </div>
              <div className="blog-card-body">
                <span className="blog-category">{blog.category}</span>
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{blog.author}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
