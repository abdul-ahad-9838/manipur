import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { slug } = await params;

    // vice-chancellor => Vice Chancellor
    const role = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const settings = await Settings.findOne({ type: "leadership" });

    if (!settings) {
      return NextResponse.json(
        { message: "Leadership data not found" },
        { status: 404 },
      );
    }

    const leader = settings.content?.leaders?.find(
      (item) => item.role.toLowerCase() === role.toLowerCase(),
    );

    if (!leader) {
      return NextResponse.json(
        { message: "Leader not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(leader);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
