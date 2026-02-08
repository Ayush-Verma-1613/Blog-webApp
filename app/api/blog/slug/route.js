import { NextResponse as res } from "next/server";
import Blog from "@/Schema/blogSchema";
import { connectDB } from "@/lib/db";

export const GET = async () => {
  try {
    await connectDB();

    const titles = await Blog.distinct("title");

    const slugs = titles.map(title =>
      title.toLowerCase().trim().split(" ").join("-")
    );

    return res.json(slugs);
  } catch (err) {
    return res.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
