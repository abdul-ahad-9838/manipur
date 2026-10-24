import { NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";
import mongoose from "mongoose";

// PUT: Update student
export async function PUT(request, { params }) {
  try {
    const user = await protect(request);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid student ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const allowedFields = [
      "enrollmentNo",
      "admissionSession",
      "name",
      "dob",
      "courseName",
      "specialization",
      "fatherName",
      "emailAddress",
      "phone",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update student" },
      { status: 400 },
    );
  }
}

// DELETE: Delete student
export async function DELETE(request, { params }) {
  try {
    const user = await protect(request);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid student ID" },
        { status: 400 },
      );
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete student" },
      { status: 500 },
    );
  }
}
