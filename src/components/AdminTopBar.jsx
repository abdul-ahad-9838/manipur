"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const AdminTopBar = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  // Only show on admin pages, not login
  if (!user || pathname === "/admin/login") return null;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "🏠 Dashboard" },
    { href: "/admin/enquiries", label: "📋 Enquiries" },
    { href: "/admin/job-applications", label: "💼 Job Applications" },
    { href: "/admin/blogs", label: "📝 Blogs" },
    { href: "/admin/courses", label: "🎓 Courses" },
    { href: "/admin/faq", label: "❓Faq" },
    { href: "/admin/content", label: "🖼️ Content" },
    { href: "/admin/pages", label: "📄 Pages" },
    { href: "/admin/seo", label: "🔍 SEO" },
    {
      href: "/admin/notice-and-announcement",
      label: "📢 Notice & Announcement",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#111",
        color: "white",
        zIndex: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "50px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        fontSize: "0.85rem",
        fontFamily: "var(--font-body)",
        overflowX: "auto",
      }}
    >
      {/* Left: nav links */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              textDecoration: "none",
              color: pathname === link.href ? "#111" : "#ccc",
              background:
                pathname === link.href ? "var(--lpu-orange)" : "transparent",
              fontWeight: "600",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: user + logout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#aaa", fontSize: "0.8rem" }}>
          👤 {user?.name || "Admin"}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: "#e53e3e",
            color: "white",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "0.8rem",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopBar;
