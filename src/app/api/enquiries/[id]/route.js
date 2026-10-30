import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { protect } from "@/lib/auth";

// Update status
export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const enquiry = await Enquiry.findByIdAndUpdate(id, body, { new: true });
    if (!enquiry)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Delete
// export async function DELETE(request, { params }) {
//   try {
//     const user = await protect(request);
//     if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
//     const { id } = await params;
//     await dbConnect();
//     await Enquiry.findByIdAndDelete(id);
//     return NextResponse.json({ message: 'Deleted' });
//   } catch (error) {
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
