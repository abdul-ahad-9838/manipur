import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import studentLoginData from "@/data/studentLoginData";

export default async function StudentDashboard() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("student_auth")?.value;

    const student = studentLoginData.find(
        (item) =>
            String(item.enrollmentNumber) === authCookie
    );

    if (!student) {
        redirect("/student/login");
    }

    const studentDetails = student.data;

    const fields = [
        {
            label: "Registration Number",
            value: studentDetails.registrationNumber,
        },
        {
            label: "Enrollment Number",
            value: student.enrollmentNumber,
        },
        {
            label: "Student Name",
            value: studentDetails.name,
        },
        {
            label: "Course Name",
            value: studentDetails.courseName,
        },
        {
            label: "Specialization",
            value: studentDetails.specialization,
        },
        {
            label: "Father Name",
            value: studentDetails.fatherName,
        },
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
            <div
            >
                <h1
                    style={{
                        margin: "0 0 8px 0",
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
                    Student Dashboard
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
                {/* Form Header */}
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


                {/* Student Details Fields */}
                <div
                    style={{
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {fields.map((field, index) => (
                        <div
                            key={index}
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