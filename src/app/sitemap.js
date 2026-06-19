export default function sitemap() {
  const base = "https://miu.edu.in";
  const now = new Date().toISOString();

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
    {
      url: `${base}/about/leadership/pro-vice-chancellor`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/about/leadership/registrar`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/about/leadership/director-admissions`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
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
      url: `${base}/schools/school-of-commerce`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/schools/school-of-information-technology`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/schools/school-of-engineering`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/schools/school-of-management`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/schools/school-of-science`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/schools/school-of-humanities`,
      priority: 0.8,
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

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
