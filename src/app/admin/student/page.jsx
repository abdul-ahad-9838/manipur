"use client";

import { Activity, useEffect, useState } from "react";
import API from "@/lib/api";
import toast from "react-hot-toast";
import "@/styles/AdminStudent.css";

const emptyForm = {
    enrollmentNo: "",
    admissionSession: "",
    name: "",
    dob: "",
    courseName: "",
    specialization: "",
    fatherName: "",
    emailAddress: "",
    phone: "",
};

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

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
            admissionSession: student.admissionSession || "",
            name: student.name || "",
            dob: student.dob ? student.dob.slice(0, 10) : "",
            courseName: student.courseName || "",
            specialization: student.specialization || "",
            fatherName: student.fatherName || "",
            emailAddress: student.emailAddress || "",
            phone: student.phone || "",
        });

        setEditId(student._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (student.enrollmentNo && student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (student.emailAddress && student.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (student.phone && student.phone.includes(searchTerm));

        const matchesCourse = filterCourse ? student.courseName === filterCourse : true;

        return matchesSearch && matchesCourse;
    });

    // Unique courses list for the course filter dropdown
    const uniqueCourses = [...new Set(students.map(s => s.courseName).filter(Boolean))];

    const fields = [
        { name: "enrollmentNo", label: "Enrollment No", type: "text" },
        { name: "admissionSession", label: "Admission Session", type: "text", placeholder: "2026-27" },
        { name: "name", label: "Student Name", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "courseName", label: "Course Name", type: "text" },
        { name: "specialization", label: "Specialization", type: "text" },
        { name: "fatherName", label: "Father Name", type: "text" },
        { name: "emailAddress", label: "Email Address", type: "email" },
        { name: "phone", label: "Phone Number", type: "tel" },
    ];

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
                                        <th>Specialization</th>
                                        <th>Father Name</th>
                                        <th>Email Address</th>
                                        <th>Phone</th>
                                        <th className="admin-students-actions-heading">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.widgets || filteredStudents.map((student, index) => (
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

                                            <td>{student.courseName || "-"}</td>

                                            <td>
                                                {student.specialization || "-"}
                                            </td>

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