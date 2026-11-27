import BannerSection from "@/components/BannerSection";
import ProgramCard from "@/components/ProgramCard";
import groupedPrograms from "@/lib/groupProgram";
import "@/styles/SchoolPage.css";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

// Apne backend ka base URL (server side ke liye absolute URL chahiye)
const API_URL = process.env.NEXT_PUBLIC_BASE_URL; // e.g. https://api.miu.edu.in/api

const normalize = (str = "") =>
  str.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();


async function getJSON(path) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
  }

  const baseURL = API_URL.replace(/\/+$/, "");
  const endpoint = `${baseURL}/api${path}`;

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();

    console.error("API Error:", {
      endpoint,
      status: res.status,
      response: errorText,
    });

    throw new Error(
      `API failed: ${endpoint} | Status: ${res.status}`
    );
  }

  return res.json();
}

// Dono request parallel; Next same URL ka fetch dedupe karta hai,
// isliye generateMetadata aur Page dono call karein to bhi ek hi baar jata hai
async function getSchoolAndCourses(slug) {
  const [details, courses] = await Promise.all([
    getJSON("/settings/school-details"),
    getJSON("/courses"),
  ]);

  console.log(details)

  const school = details?.content?.[slug] || null;
  if (!school) return { school: null, courses: [] };

  const target = normalize(school.name);
  const filtered = (courses || [])
    .filter((c) => normalize(c.school) === target && c.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return { school, courses: filtered };
}

export async function generateMetadata({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug || "");

  let title;
  try {
    const { school } = await getSchoolAndCourses(slug);
    title = school?.name;
  } catch { }

  return {
    ...(title && { title }),
    alternates: { canonical: `/schools/${slug}` },
  };
}

export default async function Page({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug || "");

  // Server-side redirect: turant, bina kuch load kiye
  if (slug === "school-of-vocational-studies") {
    redirect("https://vocational.miu.edu.in/");
  }

  let school, courses;
  try {
    ({ school, courses } = await getSchoolAndCourses(slug));
  } catch (e) {
    console.error("SchoolPage load error:", e);
    notFound();
  }

  if (!school) {
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        <h2>School not found</h2>
        <Link
          href="/"
          className="btn btn-orange"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          ← All Schools
        </Link>
      </div>
    );
  }

  const programs = courses.map((c) => ({
    _id: c._id,
    title: c.title,
    specialisation: c.specialisation || "",
    duration: c.duration || "3 Years",
    eligibility: c.eligibility || "10+2",
    icon: c.icon || "🎓",
    slug: c.slug || "",
    coverImage: c.coverImage || "",
    cardImage: c.cardImage || "",
    description: c.description || "",
  }));

  const { categories, grouped } = groupedPrograms(programs);

  return (
    <div className="school-page">
      <BannerSection data={school} />

      <section className="sp-section">
        <div className="container">
          <div className="sp-section-header">
            <span className="section-badge">ACADEMICS</span>
            <h2 className="sp-section-title">Programs Offered</h2>
          </div>

          {programs.length > 0 ? (
            categories
              .filter((c) => grouped[c.key].length)
              .map((cat) => (
                <div key={cat.key} className="sp-program-category">
                  <h3
                    className="sp-category-title"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    {cat.label}
                    <span className="sp-category-count">
                      {grouped[cat.key].length}
                    </span>
                  </h3>

                  <div className="programs-grid">
                    {grouped[cat.key].map((prog, i) => {
                      const titleMatch = prog.title.match(/^(.*?)\s*\((.*?)\)$/);
                      const programName = titleMatch
                        ? titleMatch[1].trim()
                        : prog.title;
                      const specialization =
                        prog.specialisation ||
                        (titleMatch ? titleMatch[2].trim() : "");

                      return (
                        <ProgramCard
                          key={prog._id ?? i}
                          program={prog}
                          programName={programName}
                          specialization={specialization}
                        />
                      );
                    })}
                  </div>
                </div>
              ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                background: "white",
                borderRadius: "12px",
                color: "#888",
              }}
            >
              <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                No programs listed yet.
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Programs will appear here once added from the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="sp-cta" style={{ background: school.color }}>
        <div className="container sp-cta-inner">
          <div>
            <h2>Ready to Join {school.name}?</h2>
            <p>
              Take the first step towards a rewarding career. Apply for
              admissions today.
            </p>
          </div>
          <div className="sp-cta-btns">
            <Link
              href="/contact"
              className="btn"
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid white",
              }}
            >
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}