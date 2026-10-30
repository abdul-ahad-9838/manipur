import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { protect } from "@/lib/auth";

// Public: submit application
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      jobTitle,
      department,
      name,
      email,
      phone,
      qualification,
      experience,
      message,
    } = body;
    if (!name || !email || !phone || !jobTitle) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 },
      );
    }
    const app = await JobApplication.create({
      jobTitle,
      department,
      name,
      email,
      phone,
      qualification,
      experience,
      message,
    });
    return NextResponse.json(app, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Admin: get all applications
export async function GET(request) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();
    const apps = await JobApplication.find({}).sort({ createdAt: -1 });
    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
