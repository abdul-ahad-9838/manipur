"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: "▦",
    },
  ];

  return (
    <aside
      style={{
        width: "240px",
        height: "auto",
        background: "#f9fafb",
        borderRight: "1px solid #e5e7eb",
        padding: "24px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 10px 20px",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "21px",
            fontWeight: "700",
            color: "#1f2937",
            margin: 0,
          }}
        >
          Student Portal
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            margin: "6px 0 0",
          }}
        >
          Manage your account
        </p>
      </div>

      {/* Navigation */}
      <nav>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#9ca3af",
            margin: "0 10px 12px",
            letterSpacing: "0.5px",
          }}
        >
          MENU
        </p>

        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/student/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                marginBottom: "6px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "#ffffff" : "#4b5563",
                background: isActive ? "#374151" : "transparent",
                transition: "background 0.2s ease",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout at Bottom */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <form action="/api/student/logout" method="POST">
          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              background: "#e5e7eb",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: "18px" }}>↪</span>
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
