"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (authLoading)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Authenticating...
      </div>
    );
  if (!user) return null;

  return (
    <div
      className="admin-dashboard"
      style={{
        padding: "160px 20px",
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
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900" }}>
            Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="btn btn-black"
            style={{ padding: "10px 25px" }}
          >
            Logout
          </button>
        </div>

        <div
          className="admin-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          <Link href="/admin/courses" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🎓</div>
            <h3>Manage Courses</h3>
            <p>Add, edit, or delete university programs and disciplines.</p>
          </Link>

          <Link href="/admin/results" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📊</div>
            <h3>Manage Results</h3>
            <p>Add, edit, or delete examination results and links.</p>
          </Link>

          <Link
            href="/admin/academic-calendar"
            className="admin-card"
            style={cardStyle}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📅</div>
            <h3>Academic Calendar</h3>
            <p>Update academic calendar and semester schedules.</p>
          </Link>

          <Link href="/admin/content" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🖼️</div>
            <h3>Site Content</h3>
            <p>Update Hero text, images, and other website sections.</p>
          </Link>

          <Link href="/admin/blogs" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📝</div>
            <h3>Manage Blogs</h3>
            <p>Create, edit, publish or delete blog posts.</p>
          </Link>

          <Link
            href="/admin/enquiries"
            className="admin-card"
            style={cardStyle}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📋</div>
            <h3>Enquiries</h3>
            <p>View and manage student admission enquiries.</p>
          </Link>

          <Link
            href="/admin/job-applications"
            className="admin-card"
            style={cardStyle}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>💼</div>
            <h3>Job Applications</h3>
            <p>Review, shortlist and manage career applications.</p>
          </Link>

          <Link href="/admin/pages" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📄</div>
            <h3>Page Content</h3>
            <p>Edit text, stats, and content for all website pages.</p>
          </Link>

          <Link href="/admin/seo" className="admin-card" style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🔍</div>
            <h3>SEO & Meta</h3>
            <p>Optimize page titles, descriptions and metadata.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  textDecoration: "none",
  color: "inherit",
  textAlign: "center",
  transition: "transform 0.3s ease",
  display: "block",
};

export default Dashboard;
