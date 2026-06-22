// app/courses/[slug]/page.jsx

import BannerSection from "@/components/BannerSection";
import "@/styles/CourseDetail.css";
import Link from "next/link";

async function getCourse(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${slug}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const course = await getCourse(slug);

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
          ← Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="cd-page">
      <BannerSection data={course} url="https://admission.miu.edu.in" />

      <div className="container cd-body">
        <div className="cd-main">
          {/* Overview */}
          {course.overview && (
            <div className="cd-section">
              <h2>Program Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: course.overview }} />
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

          {/* eligibility Criteria */}

          {course.eligibilityCriteria && (
            <div className="cd-section">
              <h2>Eligibility Criteria</h2>

              <div
                className="cd-syllabus"
                dangerouslySetInnerHTML={{
                  __html: course.eligibilityCriteria,
                }}
              />
            </div>
          )}

          {course.whyChooseThisProgram && (
            <div className="cd-section">
              <h2>Why Choose MIU for {course.title}</h2>

              <div
                className="cd-syllabus"
                dangerouslySetInnerHTML={{
                  __html: course.whyChooseThisProgram,
                }}
              />
            </div>
          )}

          {/* Career Prospects */}
          {course.careerProspects?.length > 0 && (
            <div className="cd-section">
              <h2>Career Prospects</h2>

              <div className="cd-career-grid">
                {course.careerProspects.map((career, i) => {
                  const [boldText, regularText] = career.split(":");
                  return (
                    <div key={i} className="cd-career-tag">
                      <span>
                        {boldText}
                        {regularText && " →"}
                      </span>
                      <span>{regularText}</span>
                    </div>
                  );
                })}
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
        </aside>
      </div>
    </div>
  );
}
