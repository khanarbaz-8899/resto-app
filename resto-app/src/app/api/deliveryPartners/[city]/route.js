import { connectDb } from "@/app/lib/db";
import deliveryPartnersModel from "@/app/lib/deliveryPartnersModel";
import { NextResponse } from "next/server"

export async function GET(request,content){
    let city= content.params.city
    let success=false;
    await connectDb();
    let filter={city:{$regex:new RegExp(city,'i')}}
    const result =await deliveryPartnersModel.find(filter)
   return NextResponse.json({result})
}