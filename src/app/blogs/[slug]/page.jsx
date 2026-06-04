'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import API from '@/lib/api';
import '@/styles/Blog.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    API.get(`/blogs/${slug}`)
      .then(({ data }) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="blog-detail-loading">Loading...</div>;
  if (!blog) return (
    <div className="blog-detail-loading">
      <p>Post not found.</p>
      <Link href="/blog" className="btn btn-orange" style={{ marginTop: '20px', display: 'inline-block' }}>← Back to Blog</Link>
    </div>
  );

  return (
    <div className="blog-detail-page">
      {blog.coverImage && (
        <div className="blog-detail-cover">
          <img src={blog.coverImage} alt={blog.title} />
          <div className="blog-detail-cover-overlay" />
        </div>
      )}

      <div className="container blog-detail-container">
        <Link href="/blog" className="blog-back-link">← Back to Blog</Link>

        <div className="blog-detail-header">
          <span className="blog-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <span>By {blog.author}</span>
            <span>·</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
        />
      </div>
    </div>
  );
}
