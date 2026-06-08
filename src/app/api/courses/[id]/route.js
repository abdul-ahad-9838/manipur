import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { protect } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    console.log(await params);
    await dbConnect();
    const { id } = await params;
    // Support lookup by _id or slug
    const course =
      (await Course.findById(id).catch(() => null)) ||
      (await Course.findOne({ slug: id }));
    if (!course)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await dbConnect();
    const course = await Course.findById(id);

    if (course) {
      Object.assign(course, body);
      const updatedCourse = await course.save();
      return NextResponse.json(updatedCourse);
    } else {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await protect(request);
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const course = await Course.findById(id);

    if (course) {
      await Course.deleteOne({ _id: id });
      return NextResponse.json({ message: "Course removed" });
    } else {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
