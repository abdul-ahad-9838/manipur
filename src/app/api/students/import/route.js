import { NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { protect } from "@/lib/auth";

function parseExcelDate(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  // Excel serial date
  if (typeof value === "number" && Number.isFinite(value)) {
    const excelEpoch = Date.UTC(1899, 11, 30);
    const date = new Date(excelEpoch + value * 86400000);

    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === "string") {
    const input = value.trim();

    if (!input) return null;

    // DD/MM/YYYY or DD-MM-YYYY
    const match = input.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

    if (match) {
      const day = Number(match[1]);
      const month = Number(match[2]);
      const year = Number(match[3]);

      const date = new Date(Date.UTC(year, month - 1, day));

      if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
      ) {
        return null;
      }

      return date;
    }

    // YYYY-MM-DD
    const isoMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]);
      const day = Number(isoMatch[3]);

      const date = new Date(Date.UTC(year, month - 1, day));

      if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
      ) {
        return null;
      }

      return date;
    }

    // Other date formats
    const date = new Date(input);

    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

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

    const requiredFields = [
      "enrollmentNo",
      "admissionSession",
      "name",
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

      // Normalize roll number
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

      // Normalize email
      normalized.emailAddress = normalized.emailAddress.toLowerCase();

      // Parse and validate DOB
      const parsedDob = parseExcelDate(normalized.dob);

      if (parsedDob === null) {
        return NextResponse.json(
          {
            message: `Invalid or missing DOB at Excel row ${row}. Expected DD/MM/YYYY format.`,
          },
          { status: 400 },
        );
      }

      normalized.dob = parsedDob;

      // Check duplicate enrollment numbers in Excel
      if (enrollmentSet.has(normalized.enrollmentNo)) {
        return NextResponse.json(
          {
            message: `Duplicate enrollment number in Excel: ${normalized.enrollmentNo}`,
          },
          { status: 400 },
        );
      }

      // Check duplicate roll numbers in Excel
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

    // Find existing students
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

    // Skip records that already exist
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
