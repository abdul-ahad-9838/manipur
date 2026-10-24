
"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const adminCards = [
  {
    href: "/admin/courses",
    icon: "🎓",
    title: "Manage Courses",
    description: "Add, edit, or delete university programs and disciplines.",
  },
  {
    href: "/admin/results",
    icon: "📊",
    title: "Manage Results",
    description: "Add, edit, or delete examination results and links.",
  },
  {
    href: "/admin/academic-calendar",
    icon: "📅",
    title: "Academic Calendar",
    description: "Update academic calendar and semester schedules.",
  },
  {
    href: "/admin/content",
    icon: "🖼️",
    title: "Site Content",
    description: "Update Hero text, images, and other website sections.",
  },
  {
    href: "/admin/blogs",
    icon: "📝",
    title: "Manage Blogs",
    description: "Create, edit, publish or delete blog posts.",
  },
  {
    href: "/admin/enquiries",
    icon: "📋",
    title: "Enquiries",
    description: "View and manage student admission enquiries.",
  },
  {
    href: "/admin/job-applications",
    icon: "💼",
    title: "Job Applications",
    description: "Review, shortlist and manage career applications.",
  },
  {
    href: "/admin/student",
    icon: "👨‍🎓",
    title: "Manage Students",
    description: "View and manage student profiles and details.",
  },
];

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

  if (authLoading) {
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Authenticating...
      </div>
    );
  }

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
            Welcome, {user.name}
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
          {adminCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="admin-card"
              style={cardStyle}
            >
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                {card.icon}
              </div>

              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
