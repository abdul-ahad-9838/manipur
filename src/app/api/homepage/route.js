import { NextResponse } from "next/server";

import Settings from "@/models/Settings";
import Blog from "@/models/Blog";
import FAQ from "@/models/Faq";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
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

    return NextResponse.json(
      {
        hero: hero?.content || {},
        spotlight: spotlight?.content || {},
        campus: campus?.content || {},
        placements: placements?.content || {},
        ecosystem: ecosystem?.content || {},
        blogs,
        faqs,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
