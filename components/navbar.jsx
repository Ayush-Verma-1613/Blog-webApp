"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getClass = (path) =>
    pathname === path
      ? "text-amber-400 font-bold underline hover:text-amber-400 transition-colors"
      : "text-gray-100 font-bold hover:text-amber-400 transition-colors";

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (loading) return null;

  return (
    <nav className="z-[20000] py-4 md:py-8 px-4 md:px-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold text-gray-600">
          BlogiFy
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex bg-gray-900 gap-4 xl:gap-6 shadow-lg absolute left-1/2 transform -translate-x-1/2 items-center border border-gray-200 px-6 xl:px-8 py-3 rounded-full">
          <Link href="/" className={`${getClass("/")} text-base xl:text-xl whitespace-nowrap`}>
            Home
          </Link>

          <Link href="/blog" className={`${getClass("/blog")} text-base xl:text-xl whitespace-nowrap`}>
            Blog
          </Link>

          <Link href="/contact-us" className={`${getClass("/contact-us")} text-base xl:text-xl whitespace-nowrap`}>
            Contact
          </Link>

          {isAuth ? (
            <Link href="/admin" className={`${getClass("/admin")} text-base xl:text-xl whitespace-nowrap`}>
              Admin
            </Link>
          ) : (
            <Link href="/login" className={`${getClass("/login")} text-base xl:text-xl whitespace-nowrap`}>
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-gray-900 rounded-2xl shadow-xl border border-gray-200 py-4 px-2 space-y-2">
          <Link
            href="/"
            className={`${getClass("/")} block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-base`}
          >
            Home
          </Link>

          <Link
            href="/blog"
            className={`${getClass("/blog")} block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-base`}
          >
            Blog
          </Link>

          <Link
            href="/contact-us"
            className={`${getClass("/contact-us")} block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-base`}
          >
            Contact
          </Link>

          {isAuth ? (
            <Link
              href="/admin"
              className={`${getClass("/admin")} block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-base`}
            >
              Admin
            </Link>
          ) : (
            <Link
              href="/login"
              className={`${getClass("/login")} block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-base`}
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;