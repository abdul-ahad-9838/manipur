import Settings from "@/models/Settings";
import Blog from "@/models/Blog";
import FAQ from "@/models/Faq";
import dbConnect from "@/lib/mongodb";

export async function getHomepageData() {
  await dbConnect();

  const [hero, spotlight, campus, placements, ecosystem, blogs, faqs] =
    await Promise.all([
      Settings.findOne({ type: "hero" }).lean(),
      Settings.findOne({ type: "spotlight" }).lean(),
      Settings.findOne({ type: "campus" }).lean(),
      Settings.findOne({ type: "placements" }).lean(),
      Settings.findOne({ type: "ecosystem" }).lean(),
      Blog.find().sort({ createdAt: -1 }).lean(),
      FAQ.find().lean(),
    ]);

  const data = {
    hero: hero?.content ?? {},
    spotlight: spotlight?.content ?? {},
    campus: campus?.content ?? {},
    placements: placements?.content ?? {},
    ecosystem: ecosystem?.content ?? {},
    blogs: blogs ?? [],
    faqs: faqs ?? [],
  };

  // Convert MongoDB values into plain JSON-compatible values
  return JSON.parse(JSON.stringify(data));
}
