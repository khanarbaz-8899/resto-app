import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";
import User from "@/app/lib/UserModel"; // ✅ default import since model uses "export default"
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // 1️⃣ Connect to database
    await connectDb();

    // 2️⃣ Parse the request body
    const { name, email, password, city, address, contact } = await req.json();

    // 3️⃣ Validate all required fields
    if (!name || !email || !password || !city || !address || !contact) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 5️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      city,
      address,
      contact,
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
