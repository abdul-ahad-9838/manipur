const base = "https://miu.edu.in";

const staticRoutes = [
  { url: base, priority: 1.0, changeFrequency: "daily" },
  { url: `${base}/about`, priority: 0.9, changeFrequency: "weekly" },
  {
    url: `${base}/about/governance`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/about/academic-council`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { url: `${base}/about/iqac`, priority: 0.8, changeFrequency: "monthly" },
  {
    url: `${base}/about/affiliations-accreditation`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/about/public-self-disclosure`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/about/ugc-performance`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/about/leadership/chancellor`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/about/leadership/vice-chancellor`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  // {
  //   url: `${base}/about/leadership/pro-vice-chancellor`,
  //   priority: 0.7,
  //   changeFrequency: "monthly",
  // },
  {
    url: `${base}/about/leadership/registrar`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  // {
  //   url: `${base}/about/leadership/director-admissions`,
  //   priority: 0.7,
  //   changeFrequency: "monthly",
  // },
  {
    url: `${base}/about/leadership/controller-of-examinations`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  { url: `${base}/admissions`, priority: 0.9, changeFrequency: "weekly" },
  {
    url: `${base}/admissions/process`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/admissions/fee-structure`,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/admissions/rules`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/academics/academic-calendar`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/academics/brochure`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/academics/academic-collaborations`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/academics/academic-leadership`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/apprenticeship`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/credit-transfer-policy`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/examination/results`,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    url: `${base}/research/overview`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/research/publications`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/research/projects`,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/student-life/sports`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/student-life/hostel`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/student-life/anti-ragging`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/student-life/grievance-cell`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/student-life/ncc-nss`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/notices-and-announcements`,
    priority: 0.8,
    changeFrequency: "daily",
  },
  { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" },
  {
    url: `${base}/reservation-roster`,
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { url: `${base}/refund-policy`, priority: 0.5, changeFrequency: "yearly" },
  { url: `${base}/privacy-policy`, priority: 0.5, changeFrequency: "yearly" },
  { url: `${base}/miunest`, priority: 0.7, changeFrequency: "monthly" },
];

/**
 * Fetch all schools from your API/database.
 * Adjust the endpoint URL and the response shape (e.g. `school.slug`,
 * `school.updatedAt`) to match your actual data source.
 */
async function getSchoolRoutes() {
  try {
    const res = await fetch(`${base}/api/schools-section`, {
      // If this data rarely changes, cache it instead of refetching on every build/request
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch schools: ${res.status}`);
    }

    const schools = await res.json();

    return schools?.content?.schools?.map((school) => ({
      url: `${base}/schools/${school.slug}`,
      lastModified: school.updatedAt
        ? new Date(school.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap: error fetching schools:", error);
    return [];
  }
}

/**
 * Fetch all courses from your API/database.
 * Adjust the endpoint URL and the response shape (e.g. `course.slug`,
 * `course.updatedAt`) to match your actual data source.
 */
async function getCourseRoutes() {
  try {
    const res = await fetch(`${base}/api/courses`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch courses: ${res.status}`);
    }

    const courses = await res.json();

    return courses.map((course) => ({
      url: `${base}/courses/${course.slug}`,
      lastModified: course.updatedAt
        ? new Date(course.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: error fetching courses:", error);
    return [];
  }
}
export default async function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = staticRoutes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [schoolEntries, courseEntries] = await Promise.all([
    getSchoolRoutes(),
    getCourseRoutes(),
  ]);

  return [...staticEntries, ...schoolEntries, ...courseEntries];
}
