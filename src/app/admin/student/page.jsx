"use client";

import { Activity, useEffect, useState } from "react";
import API from "@/lib/api";
import toast from "react-hot-toast";
import "@/styles/AdminStudent.css";
import * as XLSX from "xlsx";


const emptyForm = {
    enrollmentNo: "",
    rollNumber: "",
    admissionSession: "",
    name: "",
    dob: "",
    course: "",
    subCourse: "",
    fatherName: "",
    motherName: "",
    emailAddress: "",
    phone: "",
    aadharNumber: "",
};

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [importing, setImporting] = useState(false);

    // Filtering states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCourse, setFilterCourse] = useState("");

    const fetchStudents = async () => {
        try {
            const { data } = await API.get("/students", {
                params: { _t: Date.now() },
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            });

            setStudents(Array.isArray(data) ? data : []);
        } catch {
            setStudents([]);
            toast.error("Error fetching students.");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...form,
                dob: form.dob,
            };

            if (editId) {
                await API.put(`/students/${editId}`, payload);
                toast.success("Student updated successfully.");
            } else {
                await API.post("/students", payload);
                toast.success("Student added successfully.");
            }

            setForm(emptyForm);
            setEditId(null);
            setShowForm(false);

            await fetchStudents();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Error saving student."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (student) => {
        setForm({
            enrollmentNo: student.enrollmentNo || "",
            rollNumber: student.rollNumber || "",
            admissionSession: student.admissionSession || "",
            name: student.name || "",
            dob: student.dob ? student.dob.slice(0, 10) : "",
            course: student.course || "",
            subCourse: student.subCourse || "",
            fatherName: student.fatherName || "",
            motherName: student.motherName || "",
            emailAddress: student.emailAddress || "",
            phone: student.phone || "",
            aadharNumber: student.aadharNumber || "",
        });

        setEditId(student._id);
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this student?")) return;

        try {
            await API.delete(`/students/${id}`);
            await fetchStudents();
            toast.success("Student deleted successfully.");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Error deleting student."
            );
        }
    };

    const handleCancel = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowForm(false);
    };

    // Filter logic for searching
    // Filter logic for searching
    const filteredStudents = students.filter((student) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            (student.name || "").toLowerCase().includes(search) ||
            (student.enrollmentNo || "").toLowerCase().includes(search) ||
            (student.emailAddress || "").toLowerCase().includes(search) ||
            (student.phone || "").includes(search);

        const matchesCourse = filterCourse
            ? student.course === filterCourse
            : true;

        return matchesSearch && matchesCourse;
    });

    // Unique courses list for the course filter dropdown
    const uniqueCourses = [
        ...new Set(students.map((student) => student.course).filter(Boolean)),
    ];

    const fields = [
        { name: "enrollmentNo", label: "Enrollment No", type: "text" },
        { name: "rollNumber", label: "Roll Number", type: "text" },
        {
            name: "admissionSession",
            label: "Admission Session",
            type: "text",
            placeholder: "2026-27",
        },
        { name: "name", label: "Student Name", type: "text" },
        { name: "fatherName", label: "Father Name", type: "text" },
        { name: "motherName", label: "Mother Name", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "course", label: "Course", type: "text" },
        { name: "subCourse", label: "Sub Course", type: "text" },
        { name: "emailAddress", label: "Email Address", type: "email" },
        { name: "phone", label: "Contact Number", type: "tel" },
        { name: "aadharNumber", label: "Aadhar Number", type: "text" },
    ];



    const handleExcelImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImporting(true);

        try {
            const buffer = await file.arrayBuffer();

            const workbook = XLSX.read(buffer, {
                type: "array",
                cellDates: true,
            });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            if (!sheet) {
                toast.error("Excel sheet not found.");
                return;
            }

            const rows = XLSX.utils.sheet_to_json(sheet, {
                defval: "",
                raw: false,
            });

            if (!rows.length) {
                toast.error("Excel file is empty.");
                return;
            }

            // Normalize Excel headers
            const normalizeHeader = (value) =>
                String(value ?? "")
                    .replace(/^\uFEFF/, "")
                    .trim()
                    .toLowerCase()
                    .replace(/[\s_-]+/g, "");

            // Normalize dates
            const normalizeDate = (value) => {
                if (!value) return "";

                if (
                    value instanceof Date &&
                    !Number.isNaN(value.getTime())
                ) {
                    const year = value.getFullYear();
                    const month = String(value.getMonth() + 1).padStart(2, "0");
                    const day = String(value.getDate()).padStart(2, "0");

                    return `${year}-${month}-${day}`;
                }

                const text = String(value).trim();

                // YYYY-MM-DD
                if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
                    const [year, month, day] = text.split("-").map(Number);
                    const date = new Date(year, month - 1, day);

                    if (
                        date.getFullYear() === year &&
                        date.getMonth() === month - 1 &&
                        date.getDate() === day
                    ) {
                        return text;
                    }

                    return "";
                }

                // DD/MM/YYYY or DD-MM-YYYY
                const match = text.match(
                    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
                );

                if (match) {
                    const [, dd, mm, yyyy] = match;
                    const day = Number(dd);
                    const month = Number(mm);
                    const year = Number(yyyy);

                    const date = new Date(year, month - 1, day);

                    if (
                        date.getFullYear() === year &&
                        date.getMonth() === month - 1 &&
                        date.getDate() === day
                    ) {
                        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    }
                }

                return "";
            };

            // Map Excel columns to model fields
            const payload = rows
                .map((row) => {
                    const normalizedRow = {};

                    Object.keys(row).forEach((key) => {
                        normalizedRow[normalizeHeader(key)] = row[key];
                    });

                    const get = (...keys) => {
                        for (const key of keys) {
                            const normalizedKey = normalizeHeader(key);

                            if (
                                Object.prototype.hasOwnProperty.call(
                                    normalizedRow,
                                    normalizedKey
                                )
                            ) {
                                return normalizedRow[normalizedKey];
                            }
                        }

                        return "";
                    };

                    return {
                        enrollmentNo: String(get("Enrollment No") ?? "").trim(),
                        admissionSession: String(
                            get("Adm Session", "Admission Session") ?? ""
                        ).trim(),
                        name: String(get("Student Name") ?? "").trim(),
                        rollNumber: String(get("Roll Number") ?? "").trim(),
                        dob: get("DOB") ?? normalizeDate(get("DOB")),
                        course: String(get("Course") ?? "").trim(),
                        subCourse: String(get("Sub Course") ?? "").trim(),
                        fatherName: String(get("Father Name") ?? "").trim(),
                        motherName: String(get("Mother Name") ?? "").trim(),
                        emailAddress: String(get("Email") ?? "").trim(),
                        phone: String(get("Contact") ?? "").trim(),
                        aadharNumber: String(get("Aadhar Number") ?? "").trim(),
                    };
                })
                .filter((student) =>
                    Object.values(student).some(
                        (value) => String(value ?? "").trim() !== ""
                    )
                );;


            // Import students
            const { data } = await API.post("/students/import", {
                students: payload,
            });

            toast.success(
                data.message || "Students imported successfully."
            );

            await fetchStudents();
        } catch (err) {
            console.error("Excel import error:", err);

            toast.error(
                err.response?.data?.message ||
                "Excel import failed."
            );
        } finally {
            setImporting(false);
            e.target.value = "";
        }
    };


    return (
        <div className="admin-students-page">
            <div className="admin-students-container">
                <div className="admin-students-header">
                    <div className="admin-students-heading">
                        <h1>🎓 Manage Students</h1>
                        <p>Manage student records and admission details.</p>
                    </div>

                    <div className="admin-students-header-actions">
                        <button
                            type="button"
                            className="admin-students-btn admin-students-btn-primary"
                            onClick={() => {
                                if (showForm) {
                                    handleCancel();
                                } else {
                                    setForm(emptyForm);
                                    setEditId(null);
                                    setShowForm(true);
                                }
                            }}
                        >
                            {showForm ? "Cancel" : "+ Add Student"}
                        </button>

                        <button
                            type="button"
                            className="admin-students-btn admin-students-btn-dark"
                            onClick={() => window.history.back()}
                        >
                            ← Back
                        </button>
                        <label className="admin-students-btn admin-students-btn-outline">
                            {importing ? "Importing..." : "📥 Import Excel"}

                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleExcelImport}
                                disabled={importing}
                                hidden
                            />
                        </label>
                    </div>
                </div>

                <Activity mode={showForm ? "visible" : "hidden"}>
                    <form
                        className="admin-students-form-card"
                        onSubmit={handleSubmit}
                    >
                        <div className="admin-students-section-heading">
                            <div>
                                <span className="admin-students-section-label">
                                    STUDENT DETAILS
                                </span>
                                <h2>
                                    {editId ? "Edit Student" : "Add New Student"}
                                </h2>
                                <p>Enter the student's information below.</p>
                            </div>
                        </div>

                        <div className="admin-students-form-grid">
                            {fields.map((field) => (
                                <div
                                    className="admin-students-field"
                                    key={field.name}
                                >
                                    <label htmlFor={`student-${field.name}`}>
                                        {field.label}
                                        <span className="admin-students-required">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id={`student-${field.name}`}
                                        name={field.name}
                                        type={field.type}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        placeholder={
                                            field.placeholder ||
                                            `Enter ${field.label}`
                                        }
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="admin-students-form-footer">
                            <p>
                                <span className="admin-students-required">*</span>{" "}
                                Required fields
                            </p>

                            <div className="admin-students-form-actions">
                                <button
                                    type="button"
                                    className="admin-students-btn admin-students-btn-outline"
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-students-btn admin-students-btn-primary"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editId
                                            ? "Update Student"
                                            : "Create Student"}
                                </button>
                            </div>
                        </div>
                    </form>
                </Activity>

                <div className="admin-students-list-card">
                    <div className="admin-students-list-header">
                        <div>
                            <span className="admin-students-section-label">
                                RECORDS
                            </span>
                            <h2>All Students</h2>
                            <p>View and manage registered student records.</p>
                        </div>

                        <span className="admin-students-count">
                            {filteredStudents.length} of {students.length}{" "}
                            {students.length === 1 ? "Student" : "Students"}
                        </span>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="admin-students-filter-bar">
                        <div className="admin-students-search-box">
                            <input
                                type="text"
                                placeholder="🔍 Search by name, enrollment no, email or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {uniqueCourses.length > 0 && (
                            <div className="admin-students-course-filter">
                                <select
                                    value={filterCourse}
                                    onChange={(e) => setFilterCourse(e.target.value)}
                                >
                                    <option value="">All Courses</option>
                                    {uniqueCourses.map((course) => (
                                        <option key={course} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {students.length === 0 ? (
                        <div className="admin-students-empty">
                            <h3>No students found</h3>
                            <p>Add your first student to get started.</p>

                            {!showForm && (
                                <button
                                    type="button"
                                    className="admin-students-btn admin-students-btn-primary"
                                    onClick={() => {
                                        setForm(emptyForm);
                                        setEditId(null);
                                        setShowForm(true);
                                    }}
                                >
                                    + Add First Student
                                </button>
                            )}
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="admin-students-empty">
                            <h3>No matching students</h3>
                            <p>Try adjusting your search or course filter.</p>
                        </div>
                    ) : (
                        <div className="admin-students-table-wrapper">
                            <table className="admin-students-table">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Enrollment No.</th>
                                        <th>Student Name</th>
                                        <th>Admission Session</th>
                                        <th>Date of Birth</th>
                                        <th>Course</th>
                                        <th>Sub Course</th>
                                        <th>Father Name</th>
                                        <th>Email Address</th>
                                        <th>Phone</th>
                                        <th className="admin-students-actions-heading">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.map((student, index) => (
                                        <tr key={student._id}>
                                            <td className="admin-students-serial">
                                                {index + 1}
                                            </td>

                                            <td>
                                                <span className="admin-students-enrollment">
                                                    {student.enrollmentNo || "-"}
                                                </span>
                                            </td>

                                            <td className="admin-students-name">
                                                {student.name || "-"}
                                            </td>

                                            <td>
                                                {student.admissionSession || "-"}
                                            </td>

                                            <td>
                                                {student.dob
                                                    ? new Date(
                                                        student.dob
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </td>



                                            <td>{student.course || "-"}</td>

                                            <td>{student.subCourse || "-"}</td>

                                            <td>{student.fatherName || "-"}</td>

                                            <td className="admin-students-email">
                                                {student.emailAddress || "-"}
                                            </td>

                                            <td className="admin-students-phone">
                                                {student.phone || "-"}
                                            </td>

                                            <td>
                                                <div className="admin-students-row-actions">
                                                    <button
                                                        type="button"
                                                        className="admin-students-action-btn admin-students-edit-btn"
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-students-action-btn admin-students-delete-btn"
                                                        onClick={() =>
                                                            handleDelete(student._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                    {console.log(students)}
                    {filteredStudents.length > 0 && (
                        <div className="admin-students-list-footer">
                            Showing <strong>{filteredStudents.length}</strong>{" "}
                            {filteredStudents.length === 1
                                ? "student record"
                                : "student records"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}