import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    const session = jwt.verify(token, process.env.ACCESS_TOKEN);

    return NextResponse.json({
      success: true,
      user: session
    });

  } catch (err) {
    console.error("JWT VERIFY ERROR 👉", err.message);

    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
};
