import { NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";
export async function GET(request) {
  try {
    const user = await protect(request);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const students = await Student.find().sort({ createdAt: -1 });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch students" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const {
      enrollmentNo,
      rollNumber,
      admissionSession,
      name,
      dob,
      course,
      subCourse,
      fatherName,
      motherName,
      emailAddress,
      phone,
      aadharNumber,
    } = await request.json();

    const student = new Student({
      enrollmentNo,
      rollNumber,
      admissionSession,
      name,
      dob,
      course,
      subCourse,
      fatherName,
      motherName,
      emailAddress,
      phone,
      aadharNumber,
    });

    const created = await student.save();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Invalid data" },
      { status: 400 },
    );
  }
}
