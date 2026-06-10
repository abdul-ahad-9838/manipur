"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import "@/styles/faq.css";

const emptyForm = {
  question: "",
  answer: "",
  published: true,
};

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchFaqs = async () => {
    try {
      const { data } = await API.get("/faq");
      setFaqs(data);
    } catch {
      setFaqs([]);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) {
        await API.put(`/faq/${editId}`, form);
        setMsg("FAQ updated.");
      } else {
        await API.post("/faq", form);
        setMsg("FAQ created.");
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchFaqs();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error saving FAQ.");
    }
    setSaving(false);
  };

  const handleEdit = (faq) => {
    setForm(faq);
    setEditId(faq._id);
    setShowForm(true);
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    await API.delete(`/faq/${id}`);
    fetchFaqs();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    setMsg("");
  };

  return (
    <div className="faq-page">
      <div className="container faq-container">
        <div className="faq-top-row">
          <h1>❓ Manage FAQs</h1>
          <div className="faq-actions-top">
            <button
              className="btn btn-orange"
              onClick={() => {
                setShowForm(!showForm);
                setEditId(null);
                setForm(emptyForm);
              }}
            >
              {showForm ? "Cancel" : "+ New FAQ"}
            </button>
            <button className="btn btn-black" onClick={() => history.back()}>
              ← Back
            </button>
          </div>
        </div>

        {msg && (
          <p className={`msg ${msg.includes("Error") ? "error" : "success"}`}>
            {msg}
          </p>
        )}

        {showForm && (
          <form className="faq-form" onSubmit={handleSubmit}>
            <h2>{editId ? "Edit FAQ" : "New FAQ"}</h2>

            <div className="row">
              <div className="field">
                <label>Question *</label>
                <input
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  required
                  placeholder="Enter the FAQ question"
                />
              </div>
            </div>

            <div className="field" style={{ marginBottom: "20px" }}>
              <label>Answer *</label>
              <textarea
                name="answer"
                rows={5}
                value={form.answer}
                onChange={handleChange}
                required
                placeholder="Enter the answer"
              />
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                name="published"
                id="faq-published"
                checked={form.published}
                onChange={handleChange}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label htmlFor="faq-published" style={{ cursor: "pointer" }}>
                Publish immediately
              </label>
            </div>

            <div className="btn-row">
              <button
                type="submit"
                className="btn btn-orange"
                disabled={saving}
              >
                {saving ? "Saving..." : editId ? "Update FAQ" : "Create FAQ"}
              </button>
              <button
                type="button"
                className="btn btn-black"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="faq-list">
          {faqs.length === 0 ? (
            <div className="empty-box">
              No FAQs yet. Create your first one above.
            </div>
          ) : (
            faqs.map((faq) => (
              <div className="faq-card" key={faq._id}>
                <div className="faq-content">
                  <div className="faq-card-title-row">
                    <h3>{faq.question}</h3>
                    <span
                      className={`faq-status-badge ${faq.published ? "published" : "draft"}`}
                    >
                      {faq.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p>{faq.answer}</p>
                </div>
                <div className="faq-actions">
                  <button
                    className="btn btn-orange"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                    onClick={() => handleEdit(faq)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-black"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                    onClick={() => handleDelete(faq._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
