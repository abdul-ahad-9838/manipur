// Admin-only: returns all blogs including unpublished
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { protect } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
