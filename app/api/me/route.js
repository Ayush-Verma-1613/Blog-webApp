import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("AccessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { loggedIn: false },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN
    );

    return NextResponse.json({
      loggedIn: true,
      user: decoded,
    });

  } catch {
    return NextResponse.json(
      { loggedIn: false },
      { status: 401 }
    );
  }
}
