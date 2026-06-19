"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import API from "@/lib/api";

// All pages in the system organized by category
const ALL_PAGES = {
  About: [
    { name: "About Overview", path: "/about" },
    { name: "Governing Body", path: "/about/governance" },
    { name: "Academic Council", path: "/about/academic-council" },
    { name: "IQAC", path: "/about/iqac" },
    { name: "Chancellor", path: "/about/leadership/chancellor" },
    { name: "Vice Chancellor", path: "/about/leadership/vice-chancellor" },
    {
      name: "Pro Vice Chancellor",
      path: "/about/leadership/pro-vice-chancellor",
    },
    { name: "Registrar", path: "/about/leadership/registrar" },
    {
      name: "Director of Admissions",
      path: "/about/leadership/director-admissions",
    },
    {
      name: "Controller of Examinations",
      path: "/about/leadership/controller-of-examinations",
    },
    {
      name: "Affiliations & Accreditation",
      path: "/about/affiliations-accreditation",
    },
    { name: "Public Self Disclosure", path: "/about/public-self-disclosure" },
    { name: "UGC Performa", path: "/about/ugc-performance" },
  ],
  Academics: [
    { name: "Academic Calendar", path: "/academics/academic-calendar" },
    { name: "Brochure Download", path: "/academics/brochure" },
  ],
  Admissions: [
    { name: "Admission Process", path: "/admissions/process" },
    { name: "Programs", path: "/information-cell" },
    { name: "Fee Structure", path: "/admissions/fee-structure" },
    { name: "Rules for Admission", path: "/admissions/rules" },
  ],
  "Student Life": [
    { name: "Sports", path: "/student-life/sports" },
    { name: "Hostel", path: "/student-life/hostel" },
    { name: "NCC/NSS", path: "/student-life/ncc-nss" },
    { name: "Internal Complaints Committee", path: "/student-life/icc" },
    { name: "Anti-Ragging Cell", path: "/student-life/anti-ragging" },
    { name: "Incubation Center", path: "/student-life/incubation-center" },
    { name: "CPIO", path: "/student-life/cpio" },
    { name: "Grievance Cell", path: "/student-life/grievance-cell" },
    {
      name: "Equal Opportunity Cell",
      path: "/student-life/equal-opportunity-cell",
    },
    {
      name: "Research & Development Cell",
      path: "/student-life/research-development-cell",
    },
    { name: "Ombudsperson", path: "/student-life/ombudsperson" },
    {
      name: "Project Development Cell",
      path: "/student-life/project-development-cell",
    },
    { name: "SEDG Cell", path: "/student-life/sedg-cell" },
    { name: "Awards", path: "/student-life/awards" },
    {
      name: "Constituent Colleges",
      path: "/student-life/constituent-colleges",
    },
    { name: "Health Facilities", path: "/student-life/health-facilities" },
  ],
  Other: [
    { name: "Contact Us", path: "/contact" },
    { name: "Notices & Announcements", path: "/notices-and-announcements" },
    { name: "Jobs", path: "/jobs" },
    { name: "MIUNEST", path: "/miunest" },
  ],
};

export default function PagesManager() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [initializing, setInitializing] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchPages();
  }, [user]);

  const fetchPages = async () => {
    try {
      const { data } = await API.get("/pages");
      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
    setLoading(false);
  };

  const initializePages = async () => {
    setInitializing(true);
    setMsg("🔄 Initializing pages...");

    try {
      const allPages = [];
      Object.entries(ALL_PAGES).forEach(([category, pageList]) => {
        pageList.forEach((page, index) => {
          allPages.push({
            name: page.name,
            path: page.path,
            category,
            isActive: true,
            order: index,
          });
        });
      });

      await Promise.all(
        allPages.map((page) => API.post("/pages", page).catch(() => {})),
      );

      setMsg("✅ Pages initialized successfully!");
      fetchPages();
    } catch (error) {
      setMsg("❌ Error initializing pages.");
    }

    setInitializing(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleToggleActive = async (pageId, currentStatus) => {
    try {
      await API.put(`/pages/${pageId}`, { isActive: !currentStatus });
      setMsg(
        `✅ Page ${!currentStatus ? "activated" : "deactivated"} successfully!`,
      );
      fetchPages();
    } catch (error) {
      console.error("Error toggling page status:", error);
      setMsg("❌ Failed to update page status.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const handleEditPage = (page) => {
    setEditingPage({
      ...page,
      title: page.title || "",
      subtitle: page.subtitle || "",
      badge: page.badge || "",
      content: page.content || "",
      metaDescription: page.metaDescription || "",
      metaKeywords: page.metaKeywords || "",
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingPage) return;

    try {
      await API.put(`/pages/${editingPage._id}`, {
        title: editingPage.title,
        subtitle: editingPage.subtitle,
        badge: editingPage.badge,
        content: editingPage.content,
        metaDescription: editingPage.metaDescription,
        metaKeywords: editingPage.metaKeywords,
      });
      setMsg("✅ Page content updated successfully!");
      setShowEditModal(false);
      setEditingPage(null);
      fetchPages();
    } catch (error) {
      console.error("Error updating page:", error);
      setMsg("❌ Failed to update page content.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  if (authLoading || !user)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Loading...
      </div>
    );

  // Group pages by category
  const pagesByCategory = pages.reduce((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {});

  return (
    <div
      style={{
        padding: "clamp(100px,15vw,160px) 20px 60px",
        minHeight: "100vh",
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
            📄 Manage Pages
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            {pages.length === 0 && (
              <button
                onClick={initializePages}
                disabled={initializing}
                className="btn btn-orange"
              >
                {initializing ? "Initializing..." : "🔄 Initialize All Pages"}
              </button>
            )}
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
              background: msg.startsWith("✅") ? "#d4edda" : "#f8d7da",
              color: msg.startsWith("✅") ? "#155724" : "#721c24",
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {msg}
          </p>
        )}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              background: "white",
              borderRadius: "12px",
            }}
          >
            Loading pages...
          </div>
        ) : pages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              background: "white",
              borderRadius: "12px",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
              No pages found in database.
            </p>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Click "Initialize All Pages" to add all pages to the system.
            </p>
          </div>
        ) : (
          Object.entries(pagesByCategory).map(([category, categoryPages]) => (
            <div
              key={category}
              style={{
                marginBottom: "30px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  background:
                    "linear-gradient(135deg, var(--lpu-black) 0%, #1a2a4a 100%)",
                  color: "white",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.2rem",
                    fontWeight: "800",
                    color: "var(--lpu-orange)",
                  }}
                >
                  {category}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  {categoryPages.length}{" "}
                  {categoryPages.length === 1 ? "page" : "pages"}
                </p>
              </div>

              <div style={{ padding: "12px" }}>
                {categoryPages.map((page) => (
                  <div
                    key={page._id}
                    style={{
                      background: "#f8f9fa",
                      padding: "18px 20px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                      border: "1px solid #e0e0e0",
                      opacity: page.isActive ? 1 : 0.6,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div
                        style={{
                          fontWeight: "700",
                          fontSize: "1rem",
                          color: "#111",
                        }}
                      >
                        {page.name}
                        {!page.isActive && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "0.75rem",
                              color: "#999",
                            }}
                          >
                            (Hidden)
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#666",
                          marginTop: "4px",
                        }}
                      >
                        {page.path}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleToggleActive(page._id, page.isActive)
                        }
                        className="btn"
                        style={{
                          padding: "7px 14px",
                          fontSize: "0.82rem",
                          background: page.isActive ? "#28a745" : "#6c757d",
                          color: "white",
                          border: "none",
                        }}
                      >
                        {page.isActive ? "✓ Active" : "✕ Inactive"}
                      </button>
                      <button
                        onClick={() => handleEditPage(page)}
                        className="btn btn-orange"
                        style={{ padding: "7px 14px", fontSize: "0.82rem" }}
                      >
                        ✏️ Edit
                      </button>
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-black"
                        style={{ padding: "7px 14px", fontSize: "0.82rem" }}
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingPage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
              Edit Page Content: {editingPage.name}
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Page Badge (e.g., "ABOUT US")
              </label>
              <input
                type="text"
                value={editingPage.badge}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, badge: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                }}
                placeholder="Optional badge text"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Page Title
              </label>
              <input
                type="text"
                value={editingPage.title}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, title: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                }}
                placeholder="Main page title"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Page Subtitle
              </label>
              <textarea
                value={editingPage.subtitle}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, subtitle: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                  minHeight: "80px",
                  resize: "vertical",
                }}
                placeholder="Subtitle or description"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Page Content (HTML supported)
              </label>
              <textarea
                value={editingPage.content}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, content: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                  minHeight: "200px",
                  resize: "vertical",
                  fontFamily: "monospace",
                }}
                placeholder="Main page content (HTML allowed)"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Meta Description (SEO)
              </label>
              <textarea
                value={editingPage.metaDescription}
                onChange={(e) =>
                  setEditingPage({
                    ...editingPage,
                    metaDescription: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                  minHeight: "60px",
                  resize: "vertical",
                }}
                placeholder="Page description for search engines"
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  display: "block",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Meta Keywords (SEO)
              </label>
              <input
                type="text"
                value={editingPage.metaKeywords}
                onChange={(e) =>
                  setEditingPage({
                    ...editingPage,
                    metaKeywords: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "0.93rem",
                }}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleSaveEdit}
                className="btn btn-orange"
                style={{ flex: 1 }}
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPage(null);
                }}
                className="btn btn-black"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
