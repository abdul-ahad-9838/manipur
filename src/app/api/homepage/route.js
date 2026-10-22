import { NextResponse } from "next/server";
import { getHomepageData } from "@/lib/getHomepageData";

export async function GET() {
  try {
    const data = await getHomepageData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Homepage API error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
