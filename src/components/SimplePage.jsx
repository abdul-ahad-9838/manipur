import React from "react";
import Link from "next/link";
import "@/styles/SimplePage.css";

export default function SimplePage({
  badge,
  title,
  subtitle,
  sections,
  breadcrumb,
}) {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          {breadcrumb && (
            <nav className="simple-breadcrumb">
              {breadcrumb.map((b, i) => (
                <span key={i}>
                  {b.href ? (
                    <Link href={b.href}>{b.label}</Link>
                  ) : (
                    <span>{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span className="bc-sep">›</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {badge && <span className="simple-badge">{badge}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="simple-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="container simple-body">
        {sections &&
          sections.map((sec, i) => (
            <div key={i} className="simple-section">
              {sec.title && <h2 className="simple-sec-title">{sec.title}</h2>}
              {sec.content && (
                <p className="simple-sec-content">{sec.content}</p>
              )}
              {sec.items && (
                <ul className="simple-list">
                  {sec.items.map((item, j) => (
                    <li key={j}>
                      {item.icon && <span>{item.icon}</span>}
                      <div>
                        {item.title && <strong>{item.title}</strong>}
                        {item.desc && <p>{item.desc}</p>}
                        {typeof item === "string" && item}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
