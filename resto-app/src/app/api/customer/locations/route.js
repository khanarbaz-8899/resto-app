import { connectDb } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        let result = await restaurantSchema.find();
        
        // Extract cities, filter out invalid values, capitalize, and remove duplicates
        result = result
            .map((item) => item?.city)
            .filter((city) => city && typeof city === 'string')
            .map((city) => city.charAt(0).toUpperCase() + city.slice(1))
        
        result = [...new Set(result)];
        
        return NextResponse.json({ success: true, result });
        
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}