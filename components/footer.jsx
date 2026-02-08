'use client'
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 md:py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        
        {/* Brand */}
        <div className="text-xl md:text-2xl font-bold">
          BlogiFy
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
          <Link href="/" className="hover:text-purple-200 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-purple-200 transition-colors">
            Blog
          </Link>
          <Link href="/contact-us" className="hover:text-purple-200 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-purple-200">
          © {new Date().getFullYear()} BlogiFy
        </div>
      </div>
    </footer>
  );
};

export default Footer;