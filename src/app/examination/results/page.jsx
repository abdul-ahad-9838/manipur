import "@/styles/ResultsPage.css";
import Link from "next/link";

async function getResults() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/results`, {
      revalidate: 60, // or use revalidate for caching
    });

    if (!res.ok) {
      throw new Error("Failed to fetch results");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading results:", error);
    return [];
  }
}

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <nav className="simple-breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep">›</span>
            <span>Examination</span>
            <span className="bc-sep">›</span>
            <span>Results</span>
          </nav>

          <span className="simple-badge">EXAMINATION</span>

          <h1>Examination Results</h1>

          <p className="simple-subtitle">
            Access your examination results and announcements
          </p>
        </div>
      </div>

      <div className="container simple-body">
        {results.length === 0 ? (
          <div
            className="simple-section"
            style={{ textAlign: "center", padding: "60px 35px" }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "20px",
                opacity: 0.5,
              }}
            >
              📋
            </div>

            <h2 className="simple-sec-title">No Results Available</h2>

            <p className="simple-sec-content">
              Examination results will be published here once available.
            </p>
          </div>
        ) : (
          <>
            <div className="simple-section">
              <h2 className="simple-sec-title">Available Results</h2>

              <div className="results-button-list">
                {results.map((result) => (
                  <a
                    key={result._id}
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-button"
                  >
                    <span className="result-button-text">{result.title}</span>

                    <span className="result-button-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="simple-section">
              <h2 className="simple-sec-title">Important Information</h2>

              <ul className="simple-list">
                <li>
                  <span>🔔</span>
                  <div>
                    <strong>Stay Updated</strong>
                    <p>
                      Results are published as soon as they are available. Check
                      back regularly for updates.
                    </p>
                  </div>
                </li>

                <li>
                  <span>📧</span>
                  <div>
                    <strong>Need Help?</strong>
                    <p>
                      For queries regarding results, contact the Controller of
                      Examinations office.
                    </p>
                  </div>
                </li>

                <li>
                  <span>📱</span>
                  <div>
                    <strong>Mobile Access</strong>
                    <p>
                      Access results on any device - desktop, tablet, or mobile
                      phone.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
