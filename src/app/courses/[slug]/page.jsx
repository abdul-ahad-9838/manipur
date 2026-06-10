// app/courses/[slug]/page.jsx

import { headers } from "next/headers";
import Link from "next/link";
import "@/styles/CourseDetail.css";

async function getCourse(slug) {
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/courses/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const course = await getCourse(slug);

  console.log(course);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The course you're looking for doesn't exist.",
    };
  }

  const seo = course.seo || {};

  return {
    title: seo.title || course.title,
    description: seo.description || course.description,
    keywords: seo.keywords || [],

    openGraph: {
      title: seo.ogTitle || seo.title || course.title,
      description: seo.ogDescription || seo.description || course.description,
      images: seo.ogImage
        ? [{ url: seo.ogImage }]
        : course.coverImage
          ? [{ url: course.coverImage }]
          : [],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.title || course.title,
      description:
        seo.twitterDescription || seo.description || course.description,
      images: seo.twitterImage || seo.ogImage || course.coverImage,
    },

    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
  };
}

export default async function CourseDetail({ params }) {
  const { slug } = await params;

  const course = await getCourse(slug);

  if (!course) {
    return (
      <div className="cd-loading">
        <p>Course not found.</p>

        <Link
          href="/information-cell"
          className="btn btn-orange"
          style={{
            marginTop: "20px",
            display: "inline-block",
          }}
        >
          ← All Programs
        </Link>
      </div>
    );
  }

  const schoolSlug =
    course.school?.toLowerCase().replace(/\s+/g, "-") || "school-of-commerce";

  return (
    <div className="cd-page">
      {/* Hero */}
      <div
        className="cd-hero"
        style={{
          backgroundImage: course.coverImage
            ? `url(${course.coverImage})`
            : "linear-gradient(135deg, var(--lpu-black) 0%, #1a2a4a 100%)",
        }}
      >
        {course.coverImage && <div className="cd-hero-overlay" />}

        <div className="container cd-hero-content">
          <nav className="cd-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>

            <Link href="/information-cell">Schools</Link>
            <span>›</span>

            <Link href={`/schools/${schoolSlug}`}>{course.school}</Link>
            <span>›</span>

            <span>{course.title}</span>
          </nav>

          <div className="cd-hero-icon">{course.icon || "🎓"}</div>

          <h1>{course.title}</h1>

          <p className="cd-hero-sub">{course.description}</p>

          <div className="cd-hero-tags">
            {course.duration && <span>⏱ {course.duration}</span>}

            {course.mode && <span>📋 {course.mode}</span>}

            {course.eligibility && <span>✅ {course.eligibility}</span>}

            {course.seats && <span>🪑 {course.seats} Seats</span>}
          </div>

          <div className="cd-hero-btns">
            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-orange"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>

      <div className="container cd-body">
        <div className="cd-main">
          {/* Overview */}
          {course.overview && (
            <div className="cd-section">
              <h2>Program Overview</h2>
              <p>{course.overview}</p>
            </div>
          )}

          {/* Objectives */}
          {course.objectives?.length > 0 && (
            <div className="cd-section">
              <h2>Learning Objectives</h2>

              <ul className="cd-list">
                {course.objectives.map((obj, i) => (
                  <li key={i}>
                    <span>✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Syllabus */}
          {course.syllabus && (
            <div className="cd-section">
              <h2>Syllabus</h2>

              <div
                className="cd-syllabus"
                dangerouslySetInnerHTML={{
                  __html: course.syllabus.replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}

          {/* Career Prospects */}
          {course.careerProspects?.length > 0 && (
            <div className="cd-section">
              <h2>Career Prospects</h2>

              <div className="cd-career-grid">
                {course.careerProspects.map((career, i) => (
                  <div key={i} className="cd-career-tag">
                    💼 {career}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="cd-sidebar">
          <div className="cd-info-card">
            <h3>Program Details</h3>

            <ul className="cd-info-list">
              {course.duration && (
                <li>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </li>
              )}

              {course.eligibility && (
                <li>
                  <span>Eligibility</span>
                  <strong>{course.eligibility}</strong>
                </li>
              )}

              {course.mode && (
                <li>
                  <span>Mode</span>
                  <strong>{course.mode}</strong>
                </li>
              )}

              {course.seats && (
                <li>
                  <span>Seats</span>
                  <strong>{course.seats}</strong>
                </li>
              )}

              {course.fee && (
                <li>
                  <span>Fee</span>
                  <strong>{course.fee}</strong>
                </li>
              )}

              {/* {course.affiliation && (
                <li>
                  <span>Affiliation</span>
                  <strong>{course.affiliation}</strong>
                </li>
              )}

              {course.school && (
                <li>
                  <span>School</span>
                  <strong>{course.school}</strong>
                </li>
              )} */}
            </ul>

            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-orange"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "14px",
              }}
            >
              Apply Now
            </a>
          </div>

          {course.highlight && (
            <div className="cd-highlight-card">
              <span>🏆</span>
              <p>{course.highlight}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
