import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    admissionSession: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    subCourse: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
