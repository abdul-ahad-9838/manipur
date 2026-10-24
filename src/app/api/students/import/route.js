import { NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";

export async function POST(request) {
  try {
    const user = await protect(request);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { students } = body;

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { message: "Please provide student records." },
        { status: 400 },
      );
    }

    if (students.length > 1000) {
      return NextResponse.json(
        { message: "Maximum 1000 students can be imported at once." },
        { status: 400 },
      );
    }

    const requiredFields = [
      "enrollmentNo",
      "admissionSession",
      "name",
      "rollNumber",
      "dob",
      "course",
      "subCourse",
      "fatherName",
      "emailAddress",
      "phone",
    ];

    const enrollmentSet = new Set();
    const rollNumberSet = new Set();
    const emailSet = new Set();
    const normalizedStudents = [];

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const row = i + 2;

      if (!student || typeof student !== "object" || Array.isArray(student)) {
        return NextResponse.json(
          { message: `Invalid data at Excel row ${row}.` },
          { status: 400 },
        );
      }

      // Use field names exactly as defined in Student model
      const normalized = {
        enrollmentNo: student.enrollmentNo,
        admissionSession: student.admissionSession,
        name: student.name,
        rollNumber: student.rollNumber,
        dob: student.dob,
        course: student.course,
        subCourse: student.subCourse,
        fatherName: student.fatherName,
        motherName: student.motherName,
        emailAddress: student.emailAddress,
        phone: student.phone,
        aadharNumber: student.aadharNumber,
      };

      // Validate and normalize required fields
      for (const field of requiredFields) {
        const value = normalized[field];

        if (
          value === undefined ||
          value === null ||
          String(value).trim() === ""
        ) {
          return NextResponse.json(
            { message: `Missing ${field} at Excel row ${row}.` },
            { status: 400 },
          );
        }

        normalized[field] = String(value).trim();
      }

      // Normalize optional fields
      for (const field of ["motherName", "aadharNumber"]) {
        if (normalized[field] !== undefined && normalized[field] !== null) {
          normalized[field] = String(normalized[field]).trim();
        } else {
          normalized[field] = "";
        }
      }

      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.emailAddress)) {
        return NextResponse.json(
          { message: `Invalid email at Excel row ${row}.` },
          { status: 400 },
        );
      }

      // Validate DOB
      const dob = new Date(normalized.dob);

      if (Number.isNaN(dob.getTime())) {
        return NextResponse.json(
          { message: `Invalid date of birth at Excel row ${row}.` },
          { status: 400 },
        );
      }

      if (dob > new Date()) {
        return NextResponse.json(
          {
            message: `Date of birth cannot be in the future at Excel row ${row}.`,
          },
          { status: 400 },
        );
      }

      normalized.dob = dob;

      // Check duplicates within uploaded Excel
      if (enrollmentSet.has(normalized.enrollmentNo)) {
        return NextResponse.json(
          {
            message: `Duplicate enrollment number in Excel: ${normalized.enrollmentNo}`,
          },
          { status: 400 },
        );
      }

      if (rollNumberSet.has(normalized.rollNumber)) {
        return NextResponse.json(
          {
            message: `Duplicate roll number in Excel: ${normalized.rollNumber}`,
          },
          { status: 400 },
        );
      }

      if (emailSet.has(normalized.emailAddress.toLowerCase())) {
        return NextResponse.json(
          {
            message: `Duplicate email in Excel: ${normalized.emailAddress}`,
          },
          { status: 400 },
        );
      }

      enrollmentSet.add(normalized.enrollmentNo);
      rollNumberSet.add(normalized.rollNumber);
      emailSet.add(normalized.emailAddress.toLowerCase());

      normalizedStudents.push(normalized);
    }

    // Find existing students by unique fields
    const existingStudents = await Student.find({
      $or: [
        { enrollmentNo: { $in: [...enrollmentSet] } },
        { rollNumber: { $in: [...rollNumberSet] } },
        { emailAddress: { $in: [...emailSet] } },
      ],
    })
      .select("enrollmentNo rollNumber emailAddress")
      .lean();

    const existingEnrollmentSet = new Set(
      existingStudents.map((s) => s.enrollmentNo),
    );

    const existingRollSet = new Set(existingStudents.map((s) => s.rollNumber));

    const existingEmailSet = new Set(
      existingStudents.map((s) => s.emailAddress.toLowerCase()),
    );

    // Skip records that conflict with any existing unique field
    const newStudents = normalizedStudents.filter((student) => {
      return (
        !existingEnrollmentSet.has(student.enrollmentNo) &&
        !existingRollSet.has(student.rollNumber) &&
        !existingEmailSet.has(student.emailAddress.toLowerCase())
      );
    });

    const skipped = normalizedStudents.length - newStudents.length;

    if (newStudents.length === 0) {
      return NextResponse.json(
        {
          message:
            "No new students to import. All records already exist or conflict with existing unique fields.",
          imported: 0,
          skipped,
        },
        { status: 200 },
      );
    }

    const createdStudents = await Student.insertMany(newStudents, {
      ordered: true,
    });

    return NextResponse.json(
      {
        message: `${createdStudents.length} students imported successfully.`,
        imported: createdStudents.length,
        skipped,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Student Excel import error:", error);

    return NextResponse.json(
      {
        message: error.message || "Failed to import students.",
      },
      { status: 500 },
    );
  }
}
