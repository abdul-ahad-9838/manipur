
import Link from "next/link";
import { notFound } from "next/navigation";
import navbarItems from "@/data/navbarItems";
import "@/styles/LeadershipDetail.css";

export default function LeadershipDetail({ leader }) {
  const leaders =
    navbarItems
      .find((item) => item.label === "About Us")
      ?.subItems?.find((item) => item.label === "Leadership")
      ?.subItems || [];

  if (!leader) notFound();

  if (!leader.active) {
    return (
      <div className="coming-soon">
        <h1>Coming Soon</h1>
      </div>
    );
  }

  return (
    <section className="leader-section">
      <div className="leader-container">
        <div className="leader-card">
          {leader.image && (
            <aside className="leader-sidebar">
              <img src={leader.image ?? "/images/leader-placeholder.jpg"} alt={leader.name} />

              <h3>{leader.signature?.name}</h3>
              <p>{leader.role}</p>
              <small>Manipur International University</small>
            </aside>
          )}

          <div className="leader-content">
            {!leader.image && <span>{leader.role}</span>}

            <h2>{leader.title}</h2>

            {(leader.message || []).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="other-leaders">
          <h3>Other Leadership Messages</h3>

          <div className="leaders-grid">
            {leaders.map((item) => (
              <Link
                key={item.href || item.slug}
                href={item.href || item.slug}
                className="leader-link"
              >
                <img
                  src={item.image || "/images/leader-placeholder.jpg"}
                  alt={item.label}
                />

                <div>
                  <strong>{item.label}</strong>
                  <p>Read message →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
