import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDb();

    // Fetch all restaurants
    const data = await restaurantSchema.find();
    console.log(data);

    // Return JSON response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in /api/restaurant:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Failed to fetch restaurants", error: error.message },
      { status: 500 }
    );
  }
}
