import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";

import bcrypt from "bcrypt";
import deliveryPartnersSchema from "@/app/lib/deliveryPartnersModel";

export async function POST(req) {
  try {
    // 1️⃣ Connect to database
    await connectDb();

    // 2️⃣ Parse the request body
    const { name, mobile, password, city, address, } = await req.json();

    // 3️⃣ Validate all required fields
    if (!name || !mobile || !password || !city || !address) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Check if user already exists
    const existingUser = await deliveryPartnersSchema.findOne({name});
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 5️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create and save the new user
    const newUser = new deliveryPartnersSchema({
      name,
      mobile,
      password: hashedPassword,
      city,
      address,
     
    });

    await newUser.save();

    // 7️⃣ Return success response
    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
