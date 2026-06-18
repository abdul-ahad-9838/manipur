import Link from "next/link";
import "@/styles/SimplePage.css";

/**
 * Server-side data fetch
 */
async function getPageData(settingsKey) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${settingsKey}`,
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("Page fetch failed:", err);
    return null;
  }
}

export default async function DynamicPage({
  settingsKey,
  badge,
  title,
  subtitle,
  breadcrumb,
  defaultSections,
}) {
  const data = await getPageData(settingsKey);

  const c = data?.content || {};

  const pageTitle = c.title || c.heroTitle || title;
  const pageSubtitle = c.subtitle || c.heroSubtitle || subtitle;
  const pageBadge = c.badge || badge;
  const heroImage = c.heroImage || "";

  let sections = defaultSections || [];

  if (Array.isArray(c.sections) && c.sections.length) {
    sections = c.sections;
  }

  if (typeof c.sections === "string") {
    try {
      const parsed = JSON.parse(c.sections);
      if (Array.isArray(parsed)) sections = parsed;
    } catch {}
  }

  return (
    <div className="simple-page">
      <div
        className="simple-hero"
        style={
          heroImage
            ? {
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {heroImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 0,
            }}
          />
        )}

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
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

          {pageBadge && <span className="simple-badge">{pageBadge}</span>}

          <h1>{pageTitle}</h1>

          {pageSubtitle && <p className="simple-subtitle">{pageSubtitle}</p>}
        </div>
      </div>

      <div className="container simple-body">
        {sections.map((sec, i) => (
          <div key={i} className="simple-section">
            {sec.title && <h2 className="simple-sec-title">{sec.title}</h2>}

            {sec.content && (
              <p
                className="simple-sec-content"
                style={{ whiteSpace: "pre-line" }}
              >
                {sec.content}
              </p>
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
