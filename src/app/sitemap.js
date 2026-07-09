const BASE_URL = "https://miu.edu.in";

// Revalidate the sitemap route itself at most once per hour.
// This is a route segment config (App Router), separate from the
// per-fetch `next.revalidate` options below.
export const revalidate = 3600;

const VALID_CHANGE_FREQUENCIES = new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

// A stable "site content last touched" date for static pages that have no
// real per-page modification date available. Using a fixed date (rather
// than `new Date()` evaluated on every regeneration) avoids falsely
// signalling to crawlers that every static page changes every hour.
// Update this manually when you make a meaningful content pass over the
// static pages, or wire it up to your CMS/deploy metadata if available.
const STATIC_CONTENT_LAST_MODIFIED = "2025-01-01T00:00:00.000Z";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "daily" },

  // About
  { path: "/about", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about/governance", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/about/academic-council",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/about/iqac", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/about/affiliations-accreditation",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/about/public-self-disclosure",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/about/ugc-performa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/leadership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/faqs", priority: 0.6, changeFrequency: "monthly" },

  // Admissions
  { path: "/admissions", priority: 0.9, changeFrequency: "weekly" },
  {
    path: "/admissions/process",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/admissions/fee-structure",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/admissions/rules", priority: 0.7, changeFrequency: "monthly" },

  // Academics
  {
    path: "/academics/academic-calendar",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  { path: "/academics/brochure", priority: 0.7, changeFrequency: "monthly" },

  // Examination
  { path: "/examination", priority: 0.8, changeFrequency: "monthly" },

  // Research
  {
    path: "/research/overview",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/research/publications",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  { path: "/research/projects", priority: 0.7, changeFrequency: "monthly" },
  {
    path: "/research/development-cell",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/research/degree-awarded",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  // Student Life
  {
    path: "/student-life/sports",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/student-life/hostel",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/student-life/anti-ragging",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/student-life/grievance-cell",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  // {
  //   path: "/student-life/ncc-nss",
  //   priority: 0.6,
  //   changeFrequency: "monthly",
  // },
  { path: "/student-life/icc", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/student-life/health-facilities",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/student-life/awards", priority: 0.6, changeFrequency: "monthly" },
  { path: "/student-life/cpio", priority: 0.5, changeFrequency: "monthly" },
  {
    path: "/student-life/equal-opportunity-cell",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  // {
  //   path: "/student-life/incubation-center",
  //   priority: 0.6,
  //   changeFrequency: "monthly",
  // },
  {
    path: "/student-life/ombudsperson",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/student-life/project-development-cell",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/student-life/sedg-cell",
    priority: 0.5,
    changeFrequency: "monthly",
  },

  // Miscellaneous
  {
    path: "/notices-and-announcements",
    priority: 0.8,
    changeFrequency: "daily",
  },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/jobs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
  { path: "/miunest", priority: 0.7, changeFrequency: "monthly" },
  // { path: "/miu-cell", priority: 0.6, changeFrequency: "monthly" },
  // { path: "/apprenticeship", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/reservation-roster",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/credit-transfer-policy",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  { path: "/refund-policy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.5, changeFrequency: "yearly" },
  { path: "/student-login", priority: 0.4, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.4, changeFrequency: "weekly" },
];

/**
 * Safely joins the base URL with a path/slug segment and percent-encodes
 * it, guarding against spaces, unicode characters, or stray query-breaking
 * characters producing an invalid <loc> entry.
 */
function buildUrl(pathOrSegments) {
  const cleanPath = Array.isArray(pathOrSegments)
    ? pathOrSegments
        .map((segment) => encodeURIComponent(String(segment).trim()))
        .join("/")
    : String(pathOrSegments)
        .split("/")
        .map((segment) => (segment ? encodeURIComponent(segment) : segment))
        .join("/");

  return `${BASE_URL}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;
}

/** Clamps a priority value into the valid Sitemap Protocol range of 0.0–1.0. */
function clampPriority(priority) {
  if (typeof priority !== "number" || Number.isNaN(priority)) return 0.5;
  return Math.min(1, Math.max(0, priority));
}

/** Ensures changeFrequency is one of the values the Sitemap Protocol allows. */
function safeChangeFrequency(freq) {
  return VALID_CHANGE_FREQUENCIES.has(freq) ? freq : "monthly";
}

/** Converts any date-ish value into a valid ISO string, with a safe fallback. */
function safeDate(value) {
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

async function fetchJson(
  path,
  { timeoutMs = 10000, revalidateSeconds = 3600 } = {},
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Request to ${path} failed with status ${res.status}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function getSchoolRoutes() {
  try {
    const data = await fetchJson("/api/settings/schools-section");
    const schools = data?.content?.schools;

    if (!Array.isArray(schools)) {
      console.error("Sitemap: schools response was not an array, skipping.");
      return [];
    }

    return schools
      .filter((school) => Boolean(school?.slug))
      .map((school) => ({
        url: buildUrl(["schools", school.slug]),
        lastModified: safeDate(school.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Sitemap: error fetching schools:", error);
    return [];
  }
}

async function getCourseRoutes() {
  try {
    const courses = await fetchJson("/api/courses");

    if (!Array.isArray(courses)) {
      console.error("Sitemap: courses response was not an array, skipping.");
      return [];
    }

    return courses
      .filter((course) => Boolean(course?.slug))
      .map((course) => ({
        url: buildUrl(["courses", course.slug]),
        lastModified: safeDate(course.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Sitemap: error fetching courses:", error);
    return [];
  }
}

async function getBlogRoutes() {
  try {
    const blogs = await fetchJson("/api/blogs");

    if (!Array.isArray(blogs)) {
      console.error("Sitemap: blogs response was not an array, skipping.");
      return [];
    }

    return blogs
      .filter((blog) => Boolean(blog?.slug))
      .map((blog) => ({
        url: buildUrl(["blogs", blog.slug]),
        lastModified: safeDate(blog.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Sitemap: error fetching blogs:", error);
    return [];
  }
}

/** @type {() => Promise<import('next').MetadataRoute.Sitemap>} */
export default async function sitemap() {
  const staticEntries = staticRoutes.map((route) => ({
    url: buildUrl(route.path),
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
    changeFrequency: safeChangeFrequency(route.changeFrequency),
    priority: clampPriority(route.priority),
  }));

  const [schoolEntries, courseEntries, blogEntries] = await Promise.all([
    getSchoolRoutes(),
    getCourseRoutes(),
    getBlogRoutes(),
  ]);

  return [...staticEntries, ...schoolEntries, ...courseEntries, ...blogEntries];
}
