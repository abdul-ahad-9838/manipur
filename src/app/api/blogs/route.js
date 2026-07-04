import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { protect } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      published,
    } = body;

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      published,
    });
    const created = await blog.save();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Invalid data" },
      { status: 400 },
    );
  }
}
