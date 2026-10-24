import { NextResponse } from "next/server";
import studentLoginData from "@/data/studentLoginData";

export async function POST(request) {
  try {
    const { enrollment_no, dob } = await request.json();

    if (!enrollment_no || !dob) {
      return NextResponse.json(
        { message: "Enrollment number and DOB are required" },
        { status: 400 },
      );
    }

    const student = studentLoginData.find(
      (item) =>
        String(item.enrollmentNumber) === String(enrollment_no).trim() &&
        item.dob === dob,
    );

    if (!student) {
      return NextResponse.json(
        { message: "Invalid enrollment number or date of birth" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("student_auth", String(student.enrollmentNumber), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
