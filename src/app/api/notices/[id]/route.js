import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { protect } from "@/lib/auth";

/**
 * GET single notice by ID
 */
export async function GET_BY_ID(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return NextResponse.json(
        { message: "Notice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/**
 * PUT update notice by ID
 */
export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedNotice) {
      return NextResponse.json(
        { message: "Notice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedNotice);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Update failed" },
      { status: 400 },
    );
  }
}

/**
 * DELETE notice by ID
 */
export async function DELETE(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });

    await dbConnect();

    const { id } = await params;

    const deleted = await Notice.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Notice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
