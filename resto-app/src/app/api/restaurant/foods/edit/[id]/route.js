import { connectDb } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        let success = false;
        await connectDb();
        const result = await foodSchema.findOne({ _id: id });
        if (result) {
            success = true;
        }
        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const payload = await request.json();
        console.log("PUT request received for ID:", id);
        console.log("Payload:", payload);
        
        let success = false;
        await connectDb();
        const result = await foodSchema.findOneAndUpdate(
            { _id: id }, 
            payload,
            { new: true } // Returns the updated document
        );
        
        console.log("Update result:", result);
        
        if (result) {
            success = true;
        }
        
        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}