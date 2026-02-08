import { NextResponse } from "next/server";
import Blog from "@/Schema/blogSchema";
import { connectDB } from "@/lib/db";

// CREATE BLOG
export async function POST(request) {
  try {
    await connectDB();

    // parse the request JSON
    const body = await request.json();
    const { title, description, image } = body; // <-- image comes from frontend

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      description,
      image: image || null, // <-- use the image from frontend, optional
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error("POST ERROR 👉", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


// GET ALL BLOGS
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("GET ERROR 👉", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
