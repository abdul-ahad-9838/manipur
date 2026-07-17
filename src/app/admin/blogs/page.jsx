"use client";

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Activity,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

import ImageUploader from "@/components/ImageUploader";
import SeoForm from "@/components/SeoForm";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

/* ---------------------------------------------------------
   Shared fetch helper
   - Reads token from localStorage
   - Sets JSON headers
   - Normalizes error handling
   - Returns parsed JSON (or null for empty responses)
--------------------------------------------------------- */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};

  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token ? { Authorization: `Bearer ${userInfo.token}` } : {};
  } catch {
    return {};
  }
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
    cache: "no-store",
  });

  let data = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json().catch(() => null);
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

async function getBlogs() {
  try {
    return await apiFetch("/api/blogs/all", { method: "GET" });
  } catch (error) {
    console.error("Blogs fetch failed:", error);
    return [];
  }
}

async function createBlog(payload) {
  return apiFetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateBlog(id, payload) {
  return apiFetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

async function deleteBlog(id) {
  return apiFetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
}

export default function AdminBlogs() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push("/admin/login");
  }, [user, authLoading, router]);

  const fetchBlogs = async () => {
    const data = await getBlogs();
    setBlogs(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

  const autoSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setForm((prev) => ({
      ...prev,
      title,
      slug: editId ? prev.slug : autoSlug(title),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editId) {
        await updateBlog(editId, form);
        toast.success("Blog updated successfully.");
        // setMsg({ text: "Blog updated.", type: "success" });
      } else {
        await createBlog(form);
        toast.success("Blog created successfully.");
        // setMsg({ text: "Blog created.", type: "success" });
      }

      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      await fetchBlogs();
    } catch (err) {
      toast.error(err.message || "Error saving blog.");
      // setMsg({ text: err.message || "Error saving blog.", type: "error" });
    } finally {
      setSaving(false);
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;

    setDeletingId(id);
    try {
      await deleteBlog(id);
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error deleting blog.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  if (authLoading || !user) {
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

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
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>📝 Manage Blogs</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                setShowForm((p) => !p);
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
                  setForm((prev) => ({ ...prev, content: data }))
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

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3>{blog.title}</h3>
                <p style={{ color: "#777", fontSize: 13 }}>
                  {blog.category} · {blog.author}{" "}
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
                </p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => handleEdit(blog)}
                  className="btn btn-orange"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-black"
                  disabled={deletingId === blog._id}
                >
                  {deletingId === blog._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
  marginBottom: 20,
};

const fieldStyle = { flex: 1, minWidth: 200 };

const labelStyle = {
  display: "block",
  fontWeight: 600,
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: 8,
  outline: "none",
};
