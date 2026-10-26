
"use client";

import React, { useEffect, useRef, useState } from "react";

const ROW_HEIGHT = 52;
const BUFFER = 8;
const CONTAINER_HEIGHT = 600;

export default function AdminStudentsTable({
    students = [],
    filteredStudents = [],
    showForm,
    onAddStudent,
    onEdit,
    onDelete,
    onToggleActive
}) {
    const containerRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);



    const totalRows = filteredStudents.length;

    const visibleCount =
        Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT) + BUFFER * 2;

    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
    );

    const endIndex = Math.min(
        totalRows,
        startIndex + visibleCount
    );

    const visibleStudents = filteredStudents.slice(
        startIndex,
        endIndex
    );

    const topPadding = startIndex * ROW_HEIGHT;
    const bottomPadding = Math.max(
        0,
        (totalRows - endIndex) * ROW_HEIGHT
    );

    // Search/filter change hone par scroll reset karein.
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }

        setScrollTop(0);
    }, [filteredStudents]);

    if (students.length === 0) {
        return (
            <div className="admin-students-empty">
                <h3>No students found</h3>
                <p>Add your first student to get started.</p>

                {!showForm && (
                    <button
                        type="button"
                        className="admin-students-btn admin-students-btn-primary"
                        onClick={onAddStudent}
                    >
                        + Add First Student
                    </button>
                )}
            </div>
        );
    }

    if (totalRows === 0) {
        return (
            <div className="admin-students-empty">
                <h3>No matching students</h3>
                <p>Try adjusting your search or course filter.</p>
            </div>
        );
    }

    const headers = [
        "S.No.",
        "Enrollment No.",
        "Student Name",
        "Admission Session",
        "Date of Birth",
        "Course",
        "Sub Course",
        "Father Name",
        "Email Address",
        "Phone",
        "Actions",
    ];

    return (
        <div
            ref={containerRef}
            className="admin-students-table-wrapper"
            style={{
                height: CONTAINER_HEIGHT,
                overflow: "auto",
                position: "relative",
            }}
            onScroll={(event) => {
                setScrollTop(event.currentTarget.scrollTop);
            }}
        >
            <table
                className="admin-students-table"
                style={{
                    width: "auto",
                    tableLayout: "fixed",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                }}
            >
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className={
                                    header === "Actions"
                                        ? "admin-students-actions-heading"
                                        : ""
                                }
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 2,
                                    background: "#f3f3f3",
                                    color: "#000"
                                }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {topPadding > 0 && (
                        <tr aria-hidden="true">
                            <td
                                colSpan={11}
                                style={{
                                    height: topPadding,
                                    padding: 0,
                                    border: 0,
                                }}
                            />
                        </tr>
                    )}

                    {visibleStudents.map((student, index) => (
                        <tr
                            key={student._id}
                            style={{ height: ROW_HEIGHT }}
                        >
                            <td className="admin-students-serial">
                                {startIndex + index + 1}
                            </td>

                            <td>
                                <span className="admin-students-enrollment">
                                    {student.enrollmentNo || "-"}
                                </span>
                            </td>

                            <td className="admin-students-name">
                                {student.name || "-"}
                            </td>

                            <td>{student.admissionSession || "-"}</td>

                            <td>
                                {student.dob
                                    ? new Date(student.dob).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
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

                            <div className="admin-students-row-actions">

                                <label className="admin-students-toggle">
                                    <input
                                        type="checkbox"
                                        checked={student.isActive !== false}
                                        onChange={() => onToggleActive(student)}
                                        aria-label="Toggle active status"
                                    />
                                    <span className="admin-students-slider"></span>
                                </label>

                                <button
                                    type="button"
                                    className="admin-students-action-btn admin-students-edit-btn"
                                    onClick={() => onEdit(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="admin-students-action-btn admin-students-delete-btn"
                                    onClick={() => onDelete(student._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </tr>
                    ))}

                    {bottomPadding > 0 && (
                        <tr aria-hidden="true">
                            <td
                                colSpan={11}
                                style={{
                                    height: bottomPadding,
                                    padding: 0,
                                    border: 0,
                                }}
                            />
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
