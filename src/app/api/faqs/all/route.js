import { NextResponse } from "next/server";
import Faq from "@/models/Faq";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    await dbConnect();

    const faqs = await Faq.find({}).lean();

    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}
