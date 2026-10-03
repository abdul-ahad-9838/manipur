import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { protect } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await protect(req);
    if (!user)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    await dbConnect();
    // No populate needed since attachment is a direct string field
    const notices = await Notice.aggregate([
      {
        $sort: { sortDate: -1 },
      },
    ]);
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//  user management routes for CRUD operations
export async function POST(req) {
  try {
    const mongoUri =
      "mongodb://abdulahadansari8100:<password>@ac-vh9lkon-shard-00-00.6bne8a1.mongodb.net:27017,ac-vh9lkon-shard-00-01.6bne8a1.mongodb.net:27017,ac-vh9lkon-shard-00-02.6bne8a1.mongodb.net:27017/?ssl=true&replicaSet=atlas-5bw7i1-shard-0&authSource=admin&appName=MIU";

    await mongoose.disconnect();

    await mongoose.connect(mongoUri);

    return Response.json({
      message: "MongoDB connection changed successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to change MongoDB connection",
      },
      { status: 500 },
    );
  }
}
