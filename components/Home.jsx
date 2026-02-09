'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    handleResize(); // initial check

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blog");

      

      setBlogs(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // Truncate title for mobile
  const getTruncatedTitle = (title, maxLength = 40) => {
    if (!title) return "";
    if (title.length <= maxLength) return title;

    return title.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Hero Section */}
      <section
        className="relative text-white text-center px-6 py-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to My Blog
          </h2>

          <p className="text-sm sm:text-base">
            Read articles about web development, programming tips, and tech insights.
          </p>
        </div>

      </section>


      {/* Blog Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Latest Blogs
        </h2>


        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">

          {blogs
            .slice(0, isMobile ? 2 : 3) // ✅ Responsive limit
            .map((blog) => (

              <div
                key={blog._id}
                className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition h-full flex flex-col"
              >

                {/* Image */}
                <div className="w-full h-40 md:h-60 overflow-hidden rounded-t-xl md:rounded-t-2xl flex items-center justify-center bg-gray-100">
                  <img
                    src={blog.image || "https://via.placeholder.com/400x200"}
                    alt={blog.title}
                    className="w-full h-full object-contain"
                  />
                </div>


                {/* Content */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">

                  {/* Title */}
                  <h3 className="font-semibold text-sm md:text-lg mb-2">

                    {/* Mobile */}
                    <span className="md:hidden">
                      {getTruncatedTitle(blog.title, 40)}
                    </span>

                    {/* Desktop */}
                    <span className="hidden md:block">
                      {blog.title}
                    </span>

                  </h3>


                  {/* Read More */}
                  <Link
                    href={`/blog/${blog.title.split(" ").join("-")}`}
                    className="inline-flex items-center gap-1 text-blue-500 text-xs md:text-sm font-medium hover:underline mt-auto"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>

                </div>

              </div>

            ))}

        </div>


        {/* View All */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/blog"
            className="text-gray-900 text-sm md:text-base font-semibold hover:underline"
          >
            View All Blogs →
          </Link>
        </div>

      </section>

    </div>
  );
};

export default Home;
