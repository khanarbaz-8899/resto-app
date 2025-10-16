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
// export async function POST(request){
//   let payload= await request.json();
//    await connectDb();
//    const  restaurant =  new restaurantSchema(payload)
//    const result = restaurant.save();
//    return NextResponse.json({result,success:true})
// }


export async function POST(request) {
  try {
    const payload = await request.json();
    let result;
    await connectDb();
    if (payload.login) {
      result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
    } else {
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();

    }
    console.log("🚀 Received Payload in API:", payload);




    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error in POST /api/restaurant:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add restaurant", error: error.message },
      { status: 500 }
    );
  }
}
