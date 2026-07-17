import { NextResponse } from "next/server";
import Faq from "@/models/Faq";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();

    const faqs = await Faq.find({ published: true }).lean();

    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();

    const body = await req.json();

    const faq = await Faq.create(body);

    return NextResponse.json(faq, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create FAQ" },
      { status: 400 },
    );
  }
}
