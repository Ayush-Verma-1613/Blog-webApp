import { NextResponse as res } from "next/server";
import Blog from "@/Schema/blogSchema";
import { connectDB } from "@/lib/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    // ✅ unwrap params
    const { slug } = await params;

    if (!slug) {
      return res.json(
        { success: false, message: "Slug missing" },
        { status: 400 }
      );
    }

    const title = slug.split("-").join(" ");

    const blog = await Blog.findOne({ title });
    (title)

    if (!blog) {
      return res.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return res.json(blog);
  } catch (error) {
    console.error("GET /api/blog/slug/[slug] error:", error);

    return res.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
