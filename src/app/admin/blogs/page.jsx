"use client";

import React, { useState, useEffect, useContext, Activity } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import API from "@/lib/api";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});
import ImageUploader from "@/components/ImageUploader";
import SeoForm from "@/components/SeoForm";

const CATEGORIES = [
  "General",
  "Academics",
  "Research",
  "Campus Life",
  "Placements",
  "Events",
  "Announcements",
];

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "General",
  author: "MIU Staff",

  seo: {
    title: "",
    description: "",
    keywords: [],

    canonicalUrl: "",

    ogTitle: "",
    ogDescription: "",
    ogImage: "",

    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    structuredData: "",
  },

  published: false,
};

export default function AdminBlogs() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.push("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs/all");
      setBlogs(data);
    } catch {
      setBlogs([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const autoSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => {
      const newTitle = title;

      return {
        ...prev,
        title: newTitle,
        slug: editId ? prev.slug : autoSlug(newTitle),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) {
        await API.put(`/blogs/${editId}`, form);
        setMsg("Blog updated.");
      } else {
        await API.post("/blogs", form);
        setMsg("Blog created.");
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error saving blog.");
    }
    setSaving(false);
  };

  const handleEdit = (blog) => {
    setForm({
      ...blog,
      seo: {
        title: blog?.seo?.title || "",
        description: blog?.seo?.description || "",
        keywords: blog?.seo?.keywords || [],
        canonicalUrl: blog?.seo?.canonicalUrl || "",
        ogTitle: blog?.seo?.ogTitle || "",
        ogDescription: blog?.seo?.ogDescription || "",
        ogImage: blog?.seo?.ogImage || "",
        twitterTitle: blog?.seo?.twitterTitle || "",
        twitterDescription: blog?.seo?.twitterDescription || "",
        twitterImage: blog?.seo?.twitterImage || "",
        structuredData: blog?.seo?.structuredData || "",
      },
    });
    setEditId(blog._id);
    setShowForm(true);
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    await API.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    setMsg("");
  };

  if (authLoading || !user)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Loading...
      </div>
    );

  return (
    <div
      style={{
        padding: "clamp(100px,15vw,160px) 20px 60px",
        minHeight: "80vh",
        background: "#f8f9fa",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: "900" }}
          >
            📝 Manage Blogs
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditId(null);
                setForm(emptyForm);
              }}
              className="btn btn-orange"
            >
              {showForm ? "Cancel" : "+ New Post"}
            </button>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="btn btn-black"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {msg && (
          <p
            style={{
              background: msg.includes("Error") ? "#fee" : "#efe",
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {msg}
          </p>
        )}

        <Activity mode={showForm ? "visible" : "hidden"}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ marginBottom: "25px", fontSize: "1.4rem" }}>
              {editId ? "Edit Post" : "New Blog Post"}
            </h2>

            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  required
                  style={inputStyle}
                  placeholder="Post title"
                />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Slug *</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Author</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <ImageUploader
                label="Cover Image"
                value={form.coverImage}
                onChange={(url) =>
                  setForm((prev) => ({ ...prev, coverImage: url }))
                }
                placeholder="https://..."
                height={140}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Excerpt *</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Short summary shown on listing page"
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Content *</label>

              <TextEditor
                value={form.content}
                onChange={(data) =>
                  setForm((prev) => ({
                    ...prev,
                    content: data,
                  }))
                }
              />
            </div>

            {/* seo title, description and keywords goes here */}
            <SeoForm
              form={form}
              setForm={setForm}
              labelStyle={labelStyle}
              inputStyle={inputStyle}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "25px",
              }}
            >
              <input
                type="checkbox"
                name="published"
                id="published"
                checked={form.published}
                onChange={handleChange}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label
                htmlFor="published"
                style={{ fontWeight: "600", cursor: "pointer" }}
              >
                Publish immediately
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-orange"
              >
                {saving ? "Saving..." : editId ? "Update Post" : "Create Post"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </Activity>

        {/* Blog list */}
        {blogs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              background: "white",
              borderRadius: "12px",
            }}
          >
            <p style={{ color: "#888", fontSize: "1.1rem" }}>
              No blog posts yet. Create your first one above.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  background: "white",
                  padding: "20px 25px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "4px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: "700",
                        textTransform: "none",
                      }}
                    >
                      {blog.title}
                    </h3>
                    <span
                      style={{
                        background: blog.published ? "#d4edda" : "#fff3cd",
                        color: blog.published ? "#155724" : "#856404",
                        padding: "2px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                      }}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.85rem" }}>
                    {blog.category} · {blog.author} ·{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="btn btn-orange"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-black"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
  flexWrap: "wrap",
};
const fieldStyle = { flex: 1, minWidth: "200px" };
const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "6px",
  fontSize: "0.9rem",
};
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};
