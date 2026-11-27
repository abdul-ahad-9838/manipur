import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Settings from "@/models/Settings";

// Normalize school names
const normalize = (str = "") =>
  String(str).toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();

// Convert MongoDB documents into cache-safe plain JSON
const toPlainJSON = (data) => JSON.parse(JSON.stringify(data));

// ---------------------------------------
// 1. Get all courses (cached for 60 sec)
// ---------------------------------------

const getCachedCourses = unstable_cache(
  async () => {
    await dbConnect();

    const courses = await Course.find({})
      .select(
        "_id title specialisation duration eligibility icon slug coverImage cardImage description school isActive order createdAt",
      )
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return toPlainJSON(courses);
  },
  ["school-page-courses"],
  {
    revalidate: 60,
    tags: ["school-courses"],
  },
);

// ---------------------------------------
// 2. Get school settings (cached 60 sec)
// ---------------------------------------

const getCachedSettings = unstable_cache(
  async (type) => {
    await dbConnect();

    const settings = await Settings.findOne({ type }).lean();

    return toPlainJSON(
      settings || {
        type,
        content: {},
      },
    );
  },
  ["school-page-settings"],
  {
    revalidate: 60,
    tags: ["school-settings"],
  },
);

// ---------------------------------------
// 3. Get school and its courses
// ---------------------------------------

export async function getSchoolAndCourses(slug) {
  const [details, allCourses] = await Promise.all([
    getCachedSettings("school-details"),
    getCachedCourses(),
  ]);

  const school = details?.content?.[slug] || null;

  if (!school) {
    return {
      school: null,
      courses: [],
    };
  }

  const target = normalize(school.name);

  const filtered = allCourses
    .filter(
      (course) =>
        normalize(course.school) === target && course.isActive !== false,
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return {
    school,
    courses: filtered,
  };
}
