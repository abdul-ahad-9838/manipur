import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "General" },
    description: String,
    date: { type: Date, default: Date.now },

    // Storing the base64 string directly, exactly like your coverImage format
    attachment: { type: String, default: "" },

    author: { type: String, default: "MIU Admin" },
    attachmentType: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
