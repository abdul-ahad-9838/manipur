import Link from "next/link";
import "@/styles/LeadershipDetail.css";
import navbarItems from "@/data/navbarItems";
import { notFound } from "next/navigation";

export default async function LeadershipDetail({ leader }) {
  const LEADERS_DATA =
    navbarItems
      .find((item) => item.label === "About Us")
      ?.subItems?.find((item) => item.label === "Leadership")?.subItems || [];

  if (!leader) {
    notFound();
  }

  if (!leader.active) {
    return (
      <div className="coming-soon-wrapper">
        <h1 className="coming-soon">Coming Soon</h1>
      </div>
    );
  }

  return (
    <section className="leader-section">
      <div className="leader-container">
        <div className="leader-card">
          {leader.image && (
            <div className="leader-image-side">
              <img
                src={leader.image}
                alt={leader.name}
                className="leader-image"
              />

              <div className="leader-info">
                <p className="leader-name">{leader.signature?.name}</p>
                <p className="leader-role">{leader.role}</p>
                <p className="leader-university">
                  Manipur International University
                </p>
              </div>
            </div>
          )}

          <div className="leader-content">
            {!leader.image && (
              <span className="leader-role-badge">{leader.role}</span>
            )}

            <h2 className="leader-title">{leader.title}</h2>

            <div className="leader-message">
              {(leader.message || []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="other-leaders">
          <h3>Other Leadership Messages</h3>

          <div className="other-leaders-grid">
            {LEADERS_DATA.map((l) => (
              <Link
                key={l.href}
                href={l.href || l.slug}
                className="leader-link"
              >
                <img
                  src={
                    l.image ||
                    "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
                  }
                  alt={l.label}
                />

                <div>
                  <p className="leader-link-title">{l.label}</p>
                  <p className="leader-link-text">Read message →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
