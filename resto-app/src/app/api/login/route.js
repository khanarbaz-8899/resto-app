import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDb } from "@/app/lib/db";
import User from "@/app/lib/UserModel";

export async function POST(req) {
  try {
    await connectDb();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found. Please sign up first!" },
        { status: 404 }
      );
    }

    // ✅ Compare passwords
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password!" },
        { status: 401 }
      );
    }

    // ✅ Return user info (excluding password)
    const userData = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      city: existingUser.city,
      address: existingUser.address,
      contact: existingUser.contact,
    };

    return NextResponse.json(
      { message: "Login successful!", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
