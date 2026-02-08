import { NextResponse } from "next/server";
import User from "@/Schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";

// Generate Tokens
const getToken = (payload) => {
  if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
    throw new Error("JWT secrets are missing in .env");
  }

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export async function POST(request) {
  try {
    // ✅ Connect DB
    await connectDB();

    const body = await request.json();

const email = body.emailId.trim().toLowerCase();
const password = body.password.trim();

    // ✅ Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email & password required" },
        { status: 400 }
      );
    }

    // ✅ Find user
   const user = await User.findOne({ emailId: email });




    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

   

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

   

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Generate tokens (minimal payload)
    const token = getToken({
      id: user._id.toString(),
    });

    // ✅ Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          emailId: user.emailId,
        },
      },
      { status: 200 }
    );

    // ✅ Cookie Options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    };

    // ✅ Set cookies
    response.cookies.set("AccessToken", token.accessToken, cookieOptions);
    response.cookies.set("RefreshToken", token.refreshToken, cookieOptions);

    return response;

  } catch (err) {
    console.error("LOGIN ERROR 👉", err.message);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
