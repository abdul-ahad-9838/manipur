import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { protect } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    // No populate needed since attachment is a direct string field
    const notices = await Notice.find({ published: true }).sort({ date: -1 });
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const {
      title,
      category,
      description,
      date,
      attachment,
      author,
      isPinned,
      published,
    } = body;

    const notice = new Notice({
      title,
      category,
      description,
      date,
      attachment, // Direct base64 string here (e.g. "data:application/pdf;base64,...")
      author,
      isPinned,
      published,
      seo,
    });

    const created = await notice.save();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Invalid data" },
      { status: 400 },
    );
  }
}
