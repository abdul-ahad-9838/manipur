import { NextResponse } from "next/server";
import Faq from "@/models/Faq";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    const faqs = await Faq.find();

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
