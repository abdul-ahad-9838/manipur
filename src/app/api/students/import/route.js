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

    // Required fields (rollNumber is optional)
    const requiredFields = [
      "enrollmentNo",
      "admissionSession",
      "name",
      "dob",
      "course",
      "subCourse",
      "fatherName",
      "emailAddress",
      "phone",
    ];

    const enrollmentSet = new Set();
    const rollNumberSet = new Set();
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

      // Normalize fields
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

      // Validate required fields
      for (const field of requiredFields) {
        const value = normalized[field];

        if (
          value === undefined ||
          value === null ||
          String(value).trim() === ""
        ) {
          return NextResponse.json(
            {
              message: `Missing ${field} at Excel row ${row}.`,
            },
            { status: 400 },
          );
        }

        normalized[field] = String(value).trim();
      }

      // Roll number: convert NULL, "NULL", and empty values to null
      const rollNumber = normalized.rollNumber;

      if (
        rollNumber === undefined ||
        rollNumber === null ||
        String(rollNumber).trim() === "" ||
        String(rollNumber).trim().toUpperCase() === "NULL"
      ) {
        normalized.rollNumber = null;
      } else {
        normalized.rollNumber = String(rollNumber).trim();
      }

      // Normalize optional fields
      for (const field of ["motherName", "aadharNumber"]) {
        if (normalized[field] !== undefined && normalized[field] !== null) {
          normalized[field] = String(normalized[field]).trim();
        } else {
          normalized[field] = "";
        }
      }

      // Normalize email casing (duplicate emails are allowed)
      normalized.emailAddress = normalized.emailAddress.toLowerCase();

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.emailAddress)) {
        return NextResponse.json(
          { message: `Invalid email at Excel row ${row}.` },
          { status: 400 },
        );
      }

      // Validate and normalize DOB
      // Supports DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD,
      // and other JavaScript-supported date strings.
      const dobValue = String(normalized.dob).trim();
      let dob;

      const dateMatch = dobValue.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

      if (dateMatch) {
        // Excel date format: DD/MM/YYYY or DD-MM-YYYY
        const day = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        const year = Number(dateMatch[3]);

        dob = new Date(Date.UTC(year, month - 1, day));

        // Reject invalid calendar dates
        if (
          dob.getUTCFullYear() !== year ||
          dob.getUTCMonth() !== month - 1 ||
          dob.getUTCDate() !== day
        ) {
          return NextResponse.json(
            {
              message: `Invalid date of birth at Excel row ${row}.`,
            },
            { status: 400 },
          );
        }
      } else {
        // Handle ISO dates and other supported date strings
        dob = new Date(dobValue);

        if (Number.isNaN(dob.getTime())) {
          return NextResponse.json(
            {
              message: `Invalid date of birth at Excel row ${row}.`,
            },
            { status: 400 },
          );
        }
      }

      // Reject future DOBs
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      if (dob.getTime() > today.getTime()) {
        return NextResponse.json(
          {
            message: `Date of birth cannot be in the future at Excel row ${row}.`,
          },
          { status: 400 },
        );
      }

      normalized.dob = dob;

      // Check duplicate enrollment numbers within Excel
      if (enrollmentSet.has(normalized.enrollmentNo)) {
        return NextResponse.json(
          {
            message: `Duplicate enrollment number in Excel: ${normalized.enrollmentNo}`,
          },
          { status: 400 },
        );
      }

      // Check duplicate roll numbers only when provided
      if (
        normalized.rollNumber !== null &&
        rollNumberSet.has(normalized.rollNumber)
      ) {
        return NextResponse.json(
          {
            message: `Duplicate roll number in Excel: ${normalized.rollNumber}`,
          },
          { status: 400 },
        );
      }

      enrollmentSet.add(normalized.enrollmentNo);

      if (normalized.rollNumber !== null) {
        rollNumberSet.add(normalized.rollNumber);
      }

      normalizedStudents.push(normalized);
    }

    // Find existing students by enrollment number or provided roll number
    const conditions = [{ enrollmentNo: { $in: [...enrollmentSet] } }];

    if (rollNumberSet.size > 0) {
      conditions.push({
        rollNumber: { $in: [...rollNumberSet] },
      });
    }

    const existingStudents = await Student.find({
      $or: conditions,
    })
      .select("enrollmentNo rollNumber")
      .lean();

    const existingEnrollmentSet = new Set(
      existingStudents.map((student) => student.enrollmentNo),
    );

    const existingRollSet = new Set(
      existingStudents
        .map((student) => student.rollNumber)
        .filter(
          (rollNumber) => rollNumber !== undefined && rollNumber !== null,
        ),
    );

    // Skip records conflicting with existing unique fields
    const newStudents = normalizedStudents.filter((student) => {
      const enrollmentExists = existingEnrollmentSet.has(student.enrollmentNo);

      const rollNumberExists =
        student.rollNumber !== null && existingRollSet.has(student.rollNumber);

      return !enrollmentExists && !rollNumberExists;
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

    // Insert new students
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
