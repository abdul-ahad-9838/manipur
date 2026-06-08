import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { protect } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    // Support lookup by slug or _id
    const blog =
      (await Blog.findOne({ slug: id }).catch(() => null)) ||
      (await Blog.findById(id).catch(() => null));
    if (!blog)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const body = await request.json();

    const blog = await Blog.findByIdAndUpdate(id, body);

    if (!blog)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
