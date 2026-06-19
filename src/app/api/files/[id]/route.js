// files / [id]
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await dbConnect();

    const file = await Image.findById(id);

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // convert base64 -> buffer
    const buffer = Buffer.from(file.data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": file.mimeType || "application/octet-stream",
        "Content-Length": buffer.length.toString(),

        // IMPORTANT: inline lets browser preview PDF/image
        "Content-Disposition": `inline; filename="${file.filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("File fetch error:", error);

    return NextResponse.json(
      { message: "Failed to load file" },
      { status: 500 },
    );
  }
}
