"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import API from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";
import toast from "react-hot-toast";

const CATEGORIES = [
  "General",
  "Academic",
  "Exam",
  "Admission",
  "Events",
  "Urgent",
  "Other",
];

const emptyForm = {
  title: "",
  category: "General",
  description: "",
  date: "",
  time: "",
  attachment: "",
  author: "Admin",
  isPinned: false,
  attachmentType: "",
  published: false,
};

export default function AdminNoticesPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchNotices();
  }, [user]);

  const fetchNotices = async () => {
    try {
      const { data } = await API.get("/notices/all");
      setNotices(data);
    } catch {
      setNotices([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        date:
          form.date && form.time
            ? new Date(`${form.date}T${form.time}`).toISOString()
            : form.date,
      };

      if (editId) {
        await API.put(`/notices/${editId}`, payload);
        toast.success("Notice updated successfully.");
      } else {
        await API.post("/notices", payload);
        toast.success("Notice created successfully.");
      }

      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      await fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving notice.");
    }

    setSaving(false);
  };

  const handleEdit = (notice) => {
    const d = notice.date ? new Date(notice.date) : null;

    setForm({
      ...notice,
      date: d ? d.toISOString().slice(0, 10) : "",
      time: d ? d.toTimeString().slice(0, 5) : "",
    });

    setEditId(notice._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await API.delete(`/notices/${id}`);
      fetchNotices();
      toast.success("Notice deleted successfully.");
    } catch (err) {
      toast.error("Error deleting notice.");
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

  // ==============================
  // ✅ ONLY ADDED CODE (NO REMOVAL)
  // ==============================

  const isImage = (n) =>
    n.attachmentType?.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(n.attachment || "");

  const isPdf = (n) =>
    n.attachmentType === "application/pdf" ||
    /\.pdf$/i.test(n.attachment || "");

  return (
    <div
      style={{
        padding: "clamp(100px,15vw,160px) 20px 60px",
        minHeight: "80vh",
        background: "#f8f9fa",
      }}
    >
      <div className="container">
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "900" }}>
            📢 Manage Notices
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
              {showForm ? "Cancel" : "+ New Notice"}
            </button>

            <button
              onClick={() => router.push("/admin/dashboard")}
              className="btn btn-black"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {/* FORM (UNCHANGED) */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "40px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              {editId ? "Edit Notice" : "Create Notice"}
            </h2>

            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

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
            </div>

            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={rowStyle}>
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

            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                style={inputStyle}
              />
            </div>

            {/* Attachment (UNCHANGED) */}
            <ImageUploader
              label="Attachment (Image/PDF)"
              value={form.attachment}
              mimeType={form.attachmentType}
              type={["image", "pdf"]}
              onChange={(url, mimeType) =>
                setForm((prev) => ({
                  ...prev,
                  attachment: url,
                  attachmentType: mimeType,
                }))
              }
              height={120}
            />

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <label>
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={form.isPinned}
                  onChange={handleChange}
                />{" "}
                Pinned
              </label>

              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                />{" "}
                Published
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button disabled={saving} className="btn btn-orange">
                {saving
                  ? "Saving..."
                  : editId
                    ? "Update Notice"
                    : "Create Notice"}
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
        )}

        {/* ==============================
            LIST (ONLY MODIFIED HERE)
            ============================== */}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {notices.map((n) => (
            <div
              key={n._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontWeight: "700" }}>{n.title}</h3>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleEdit(n)}
                      className="btn btn-orange"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(n._id)}
                      className="btn btn-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {n.category} · {n.author}
                </p>

                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {n.date ? new Date(n.date).toLocaleString() : ""}
                </p>

                {/* ✅ ATTACHMENT PREVIEW ADDED */}
                {n.attachment && (
                  <div style={{ marginTop: "10px" }}>
                    {isImage(n.attachment) && (
                      <img
                        src={n.attachment}
                        alt="attachment"
                        style={{
                          maxWidth: "200px",
                          borderRadius: "8px",
                          border: "1px solid #eee",
                        }}
                      />
                    )}

                    {isPdf(n.attachment) && (
                      <iframe
                        src={n.attachment}
                        style={{
                          width: "200px",
                          height: "250px",
                          border: "1px solid #eee",
                          borderRadius: "8px",
                        }}
                      />
                    )}

                    {!isImage(n.attachment) && !isPdf(n.attachment) && (
                      <a href={n.attachment} target="_blank">
                        📎 Open Attachment
                      </a>
                    )}
                  </div>
                )}

                <div style={{ marginTop: "5px" }}>
                  {n.isPinned && <span>📌 Pinned</span>}{" "}
                  {n.published ? "✅ Published" : "🟡 Draft"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* styles (UNCHANGED) */
const rowStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "15px",
};

const fieldStyle = { flex: 1, minWidth: "200px" };

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};
