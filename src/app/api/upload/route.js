// upload.js
import { NextResponse } from "next/server";
import { protect } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export async function POST(request) {
  try {
    const user = await protect(request);
    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 },
      );
    }

    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    // ✅ Allow images + PDFs
    const allowedTypes = ["image/", "application/pdf"];

    const isAllowed = allowedTypes.some((type) => file.type.startsWith(type));

    if (!isAllowed) {
      return NextResponse.json(
        { message: "Only images and PDFs are allowed" },
        { status: 400 },
      );
    }

    // 5MB limit (PDFs are usually larger than images)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "File too large (max 5MB)" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    await dbConnect();

    const extension = file.name.split(".").pop();

    const savedFile = await Image.create({
      filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
      mimeType: file.type,
      extension,
      data: base64,
      size: file.size,
      uploadedBy: user._id,
    });

    return NextResponse.json({
      url: `/api/files/${savedFile._id}`,
      id: savedFile._id,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Upload failed: " + error.message },
      { status: 500 },
    );
  }
}
