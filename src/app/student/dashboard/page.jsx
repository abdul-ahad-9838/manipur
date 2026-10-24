
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export default async function StudentDashboard() {
    const cookieStore = await cookies();
    const enrollmentNo = cookieStore.get("student_auth")?.value;

    // Login cookie missing hai
    if (!enrollmentNo) {
        redirect("/student-login");
    }

    await connectDB();

    // Logged-in student ka record fetch karein
    const student = await Student.findOne({
        enrollmentNo,
    })
        .select(
            "enrollmentNo rollNumber admissionSession name dob course subCourse fatherName motherName emailAddress phone"
        )
        .lean();

    // Cookie mein enrollment number hai, lekin record nahi mila
    if (!student) {
        redirect("/student-login");
    }

    // MongoDB Date ko timezone-safe format mein display karein
    const formatDate = (date) => {
        if (!date) return "";

        const value = new Date(date);

        if (Number.isNaN(value.getTime())) return "";

        const day = String(value.getUTCDate()).padStart(2, "0");
        const month = String(value.getUTCMonth() + 1).padStart(2, "0");
        const year = value.getUTCFullYear();

        return `${day}-${month}-${year}`;
    };

    const fields = [
        { label: "Student Name", value: student.name },
        { label: "Enrollment Number", value: student.enrollmentNo },
        { label: "Roll Number", value: student.rollNumber },
        { label: "Admission Session", value: student.admissionSession },
        { label: "Date of Birth", value: formatDate(student.dob) },
        { label: "Course", value: student.course },
        { label: "Sub Course", value: student.subCourse },
        { label: "Father Name", value: student.fatherName },
        { label: "Mother Name", value: student.motherName },
        { label: "Email Address", value: student.emailAddress },
        { label: "Contact Number", value: student.phone },
    ];

    return (
        <main
            style={{
                fontFamily: "Arial, sans-serif",
                color: "#1e293b",
                backgroundColor: "#f1f5f9",
            }}
        >
            {/* Header */}
            <div>
                <h1
                    style={{
                        margin: "0 0 8px",
                        fontSize: "28px",
                        fontWeight: "700",
                    }}
                >
                    Dashboard
                </h1>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px",
                    }}
                >
                    Welcome, {student.name}
                </p>
            </div>

            {/* Profile Section */}
            <section
                style={{
                    margin: "25px 0",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dbe3ee",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
            >
                <div
                    style={{
                        padding: "18px 20px",
                        backgroundColor: "#f8fafc",
                        borderBottom: "1px solid #dbe3ee",
                    }}
                >
                    <h2
                        style={{
                            margin: "0 0 5px",
                            fontSize: "21px",
                            fontWeight: "600",
                            color: "#1e293b",
                        }}
                    >
                        Student Details
                    </h2>
                </div>

                <div
                    style={{
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {fields.map((field, index) => (
                        <div
                            key={field.label}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                padding: "16px 0",
                                borderBottom:
                                    index !== fields.length - 1
                                        ? "1px solid #dbe3ee"
                                        : "none",
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: "#64748b",
                                }}
                            >
                                {field.label}
                            </label>

                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    color: "#0f172a",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {field.value || "Not Available"}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
