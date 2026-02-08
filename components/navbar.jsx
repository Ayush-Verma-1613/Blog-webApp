"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const getClass = (path) =>
    pathname === path
      ? "text-amber-400 text-sm sm:text-base md:text-lg lg:text-xl font-bold underline hover:text-amber-400 transition-colors whitespace-nowrap"
      : "text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:text-amber-400 transition-colors whitespace-nowrap";

  // Check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/me");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return (
    <nav className="z-[20000] py-4 md:py-8 px-4 md:px-8">
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        {/* Logo */}
<div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-600">
  BlogiFy
</div>

        {/* Menu - Same style for all screens */}
        <div className="bg-gray-900 flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 shadow-lg absolute left-1/2 transform -translate-x-1/2 items-center border border-gray-200 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-full">
          <Link href="/" className={getClass("/")}>
            Home
          </Link>

          <Link href="/blog" className={getClass("/blog")}>
            Blog
          </Link>

          <Link href="/contact-us" className={getClass("/contact-us")}>
            Contact
          </Link>

          {/* Auth Based */}
          {isAuth ? (
            <Link href="/admin" className={getClass("/admin")}>
              Admin
            </Link>
          ) : (
            <Link href="/login" className={getClass("/login")}>
              Admin
            </Link>
          )}
        </div>

        {/* Empty div for layout balance */}
        <div className="w-0"></div>
      </div>
    </nav>
  );
};

export default Navbar;