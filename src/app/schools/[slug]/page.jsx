
import BannerSection from "@/components/BannerSection";
import ProgramCard from "@/components/ProgramCard";
import groupedPrograms from "@/lib/groupProgram";
import { getSchoolAndCourses } from "@/lib/schoolService";

import "@/styles/SchoolPage.css";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";

// ---------------------------------------
// SEO Metadata
// ---------------------------------------

export async function generateMetadata({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug || "");

  try {
    const { school } = await getSchoolAndCourses(slug);

    return {
      ...(school?.name && {
        title: school.name,
      }),
      alternates: {
        canonical: `/schools/${slug}`,
      },
    };
  } catch (error) {
    console.error("School metadata error:", error);

    return {
      alternates: {
        canonical: `/schools/${slug}`,
      },
    };
  }
}

// ---------------------------------------
// School Page - Server Component
// ---------------------------------------

export default async function Page({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug || "");

  // Redirect vocational school
  if (slug === "school-of-vocational-studies") {
    redirect("https://vocational.miu.edu.in/");
  }

  let school;
  let courses;

  // Fetch school and courses directly from MongoDB service
  try {
    ({ school, courses } = await getSchoolAndCourses(slug));
  } catch (error) {
    console.error("SchoolPage load error:", error);
    notFound();
  }

  if (!school) {
    notFound();
  }

  // ---------------------------------------
  // Prepare Programs
  // ---------------------------------------

  const programs = (courses || []).map((c) => ({
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

  // Group programs by category
  const { categories, grouped } = groupedPrograms(programs);

  // ---------------------------------------
  // Render Page
  // ---------------------------------------

  return (
    <div className="school-page">

      <BannerSection data={school} />

      {/* Programs Section */}

      <section className="sp-section">
        <div className="container">

          <div className="sp-section-header">
            <span className="section-badge">
              ACADEMICS
            </span>

            <h2 className="sp-section-title">
              Programs Offered
            </h2>
          </div>

          {programs.length > 0 ? (

            categories
              .filter((c) => grouped[c.key]?.length > 0)
              .map((cat) => (

                <div
                  key={cat.key}
                  className="sp-program-category"
                >

                  <h3
                    className="sp-category-title"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {cat.label}

                    <span className="sp-category-count">
                      {grouped[cat.key].length}
                    </span>
                  </h3>

                  <div className="programs-grid">

                    {grouped[cat.key].map((prog, i) => {

                      const titleMatch = prog.title.match(
                        /^(.*?)\s*\((.*?)\)$/
                      );

                      const programName = titleMatch
                        ? titleMatch[1].trim()
                        : prog.title;

                      const specialization =
                        prog.specialisation ||
                        (titleMatch
                          ? titleMatch[2].trim()
                          : "");

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

              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                }}
              >
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

      {/* CTA Section */}

      <section
        className="sp-cta"
        style={{
          background: school.color,
        }}
      >

        <div className="container sp-cta-inner">

          <div>
            <h2>
              Ready to Join {school.name}?
            </h2>

            <p>
              Take the first step towards a rewarding career.
              Apply for admissions today.
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
