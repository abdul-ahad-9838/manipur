import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { protect } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();
    // No populate needed since attachment is a direct string field
    const notices = await Notice.aggregate([
      {
        $sort: { sortDate: -1 },
      },
    ]);
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
