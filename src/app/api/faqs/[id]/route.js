import { protect } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const faq = await Faq.findById(id);

    if (!faq) {
      return NextResponse.json({ message: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch FAQ" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const faq = await Faq.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update FAQ" },
      { status: 400 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;

    await Faq.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete FAQ" },
      { status: 400 },
    );
  }
}
