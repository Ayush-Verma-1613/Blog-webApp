'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";



const Blacklist = ["/login", "/signUp"];


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = Blacklist.includes(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {!hideNavbar && <header><Navbar/></header>}
        <main className="flex-grow">
          {children}
        </main>
        {!hideNavbar &&<footer><Footer/></footer>}
      </body>
    </html>
  );
}
