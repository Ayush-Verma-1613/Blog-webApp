import { connectDB } from "@/lib/db";
import Blog from "@/Schema/blogSchema";
import { NextResponse } from "next/server";

// UPDATE BLOG
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.error("PUT error 👉", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

// DELETE BLOG
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", blog },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error 👉", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

// GET SINGLE BLOG
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.error("GET error 👉", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
