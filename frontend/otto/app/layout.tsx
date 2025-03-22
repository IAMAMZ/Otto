import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Otto - AI Mechanical Engineer",
  description: "Your futuristic AI assistant for automotive manufacturing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gradient-to-br from-gray-950 via-red-950/10 to-gray-950 text-white font-sans antialiased">
        {/* Enhanced Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-700/80 via-red-600/100 to-red-700/80 backdrop-blur-lg border-b border-red-800/30 py-5 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-red-200 to-red-200 bg-clip-text text-transparent hover:from-red-100 hover:to-red-100 transition-all duration-300"
            >
              Otto
            </Link>
            <div className="flex space-x-10">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/car-view">Car View</NavLink>
              <NavLink href="/drawing-canvas">Drawing</NavLink>
              <NavLink href="/pdf-viewer">Docs</NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-15 ">
          <div className="relative">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,white),linear-gradient(to_right,transparent_19px,white_19px)] [mask-size:20px_20px] -z-10" />
            {children}
          </div>
        </main>

        {/* Radial gradient background */}
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-gray-950 to-gray-950" />
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-medium font-semibold text-red-100/90 hover:text-white transition-colors duration-300 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-red-400 to-red-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}