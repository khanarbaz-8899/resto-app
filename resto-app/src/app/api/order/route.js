import { connectDb, connectionStr } from "@/app/lib/db";
import orderSchema from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// ✅ POST: Place new order
export async function POST(request) {
  try {
    const payload = await request.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error in POST /api/order:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    await connectDb();
    const orders = await orderSchema.find({ user_id: userId });

    if (!orders || orders.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No orders found for this user.",
      });
    }

    const resultWithResto = await Promise.all(
      orders.map(async (order) => {
        const restoId = order.restaurantId || order.resto_id; // ✅ FIXED
        const restoInfo = restoId
          ? await restaurantSchema.findOne({ _id: restoId })
          : null;

        return {
          ...order._doc,
          restaurant: restoInfo,
        };
      })
    );

    return NextResponse.json({ success: true, data: resultWithResto });
  } catch (error) {
    console.error("Error in GET /api/order:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
