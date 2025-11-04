import { connectDb } from "@/app/lib/db";
import orderSchema from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Delivery Boy ID is required" },
        { status: 400 }
      );
    }

    await connectDb();
    const orders = await orderSchema.find({ deliveryBoyId: id });

    if (!orders || orders.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No orders found for this delivery boy.",
      });
    }

    const resultWithResto = await Promise.all(
      orders.map(async (order) => {
        const restoId = order.restaurantId || order.resto_id;
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
    console.error("Error in GET /api/deliveryPartners/orders/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const { status } = await req.json();

    await connectDb();
    const updated = await orderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error in PUT /api/deliveryPartners/orders/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}

