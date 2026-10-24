import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    const { enrollmentNo, dob } = await request.json();

    console.log("Enrollment:", enrollmentNo);
    console.log("DOB from frontend:", dob);

    if (
      typeof enrollmentNo !== "string" ||
      typeof dob !== "string" ||
      !enrollmentNo.trim() ||
      !dob.trim()
    ) {
      return NextResponse.json(
        { message: "Enrollment number and DOB are required" },
        { status: 400 },
      );
    }

    // Frontend format: DD-MM-YYYY
    const dobMatch = dob.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (!dobMatch) {
      return NextResponse.json(
        { message: "DOB must be in DD-MM-YYYY format" },
        { status: 400 },
      );
    }

    const day = Number(dobMatch[1]);
    const month = Number(dobMatch[2]);
    const year = Number(dobMatch[3]);

    // Build a UTC date and validate the calendar date.
    const dobStart = new Date(Date.UTC(year, month - 1, day));

    if (
      dobStart.getUTCFullYear() !== year ||
      dobStart.getUTCMonth() !== month - 1 ||
      dobStart.getUTCDate() !== day
    ) {
      return NextResponse.json(
        { message: "Invalid date of birth" },
        { status: 400 },
      );
    }

    const dobEnd = new Date(dobStart.getTime() + 24 * 60 * 60 * 1000);

    await connectDB();

    const student = await Student.findOne({
      enrollmentNo: enrollmentNo.trim(),
      dob: {
        $gte: dobStart,
        $lt: dobEnd,
      },
    }).select("_id enrollmentNo name dob");

    console.log("Student found:", Boolean(student));

    if (!student) {
      return NextResponse.json(
        {
          message: "Invalid enrollment number or date of birth",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("student_auth", String(student.enrollmentNo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Student login error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
