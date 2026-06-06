import mongoose from "mongoose";
import seoSchema from "./Seo";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "General" },
    author: { type: String, default: "MIU Admin" },

    seo: seoSchema,

    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
