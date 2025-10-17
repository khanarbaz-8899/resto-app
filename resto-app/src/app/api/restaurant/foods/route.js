import { Food, foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";

export async function POST(request) {
  try {
    const payload = await request.json();
   
    let success=false
    await connectDb(); 
    const food = new foodSchema(payload); 
    const result = await food.save(); 
    if(result){
        success=true;
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
