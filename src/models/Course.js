import mongoose from "mongoose";
import seoSchema from "./Seo";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    specialisation: { type: String, default: "" }, // Specialisation (e.g., Computer Science, Finance)
    icon: { type: String, default: "🎓" },
    description: { type: String, required: true },
    highlight: { type: String },
    duration: { type: String, default: "3 Years" },
    eligibility: { type: String, default: "10+2 / Equivalent" },
    school: {
      type: String,
      default: "School Of Commerce",
    },
    category: { type: String },
    order: { type: Number, default: 0 }, // Order within school for sorting
    isActive: { type: Boolean, default: true }, // Active/Inactive status

    // ── Detailed page fields ──────────────────────────────────
    slug: { type: String }, // URL slug e.g. bca-bachelor-of-computer-application
    coverImage: { type: String, default: "" }, // Hero image URL for detail page
    cardImage: { type: String, default: "" }, // Card/thumbnail image for program listings
    overview: { type: String, default: "" }, // Full overview paragraph
    objectives: { type: [String], default: [] }, // Learning objectives list
    careerProspects: { type: [String], default: [] }, // Career options
    syllabus: { type: String, default: "" }, // Semester-wise syllabus (text/HTML)
    fee: { type: String, default: "" }, // Fee details
    seats: { type: String, default: "" }, // Number of seats
    mode: { type: String, default: "Full Time" }, // Full Time / Part Time / Online
    affiliation: { type: String, default: "Manipur International University" },
    seo: seoSchema,
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
