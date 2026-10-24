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
    dob: {
      type: Date,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
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
  },
  { timestamps: true },
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
