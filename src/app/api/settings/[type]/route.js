import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { protect } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { type } = await params;
    await dbConnect();
    const settings = await Settings.findOne({ type }).lean();
    return NextResponse.json(settings || { type, content: {} }, {
      headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const user = await protect(request);
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { type } = await params;
    const body = await request.json();

    await dbConnect();
    let settings = await Settings.findOne({ type });

    if (settings) {
      settings.content = body.content;
      await settings.save();
    } else {
      settings = new Settings({
        type,
        content: body.content,
      });
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}
