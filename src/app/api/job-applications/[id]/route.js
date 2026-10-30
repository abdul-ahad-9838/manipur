import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { protect } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const app = await JobApplication.findByIdAndUpdate(id, body, { new: true });
    if (!app)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(app);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// export async function DELETE(request, { params }) {
//   try {
//     const user = await protect(request);
//     if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
//     const { id } = await params;
//     await dbConnect();
//     await JobApplication.findByIdAndDelete(id);
//     return NextResponse.json({ message: 'Deleted' });
//   } catch (error) {
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
