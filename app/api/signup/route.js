import { NextResponse } from "next/server";
import User from "@/Schema/userSchema";
import { connectDB } from "@/lib/db";

export async function POST(request) {
  try {
    await connectDB();

    const { fullName, emailId, password } = await request.json();

    if (!fullName || !emailId || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ emailId });

    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // ❌ DO NOT HASH HERE
    const user = await User.create({
      fullName,
      emailId,
      password, // plain password
    });

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
        user: {
          id: user._id,
          emailId: user.emailId,
        },
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("SIGNUP ERROR 👉", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
