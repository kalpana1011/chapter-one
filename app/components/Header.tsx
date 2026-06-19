"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-hidden"
        >
          <div className="w-9 h-9 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white font-sans font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            CO
          </div>
          <div>
            <h1 className="font-sans font-black tracking-tight text-slate-700 leading-none text-lg">
              ChapterOne
            </h1>
            <p className="text-md font-semibold text-indigo-500 tracking-wider uppercase mt-0.5 text-lg">
              Catalog. Track. Read.
            </p>
          </div>
        </Link>

        <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/40">
          <Link
            href="/books"
            className={`px-4 py-1.5 text-lg font-bold rounded-lg transition-all ${
              isActive("/books")
                ? "bg-white text-[#02698b] shadow-xs"
                : "text-[#75879f] hover:text-slate-900"
            }`}
          >
            Search Books
          </Link>
          <Link
            href="/reading-list"
            className={`px-4 py-1.5 text-lg font-bold rounded-lg transition-all ${
              isActive("/reading-list")
                ? "bg-white text-[#02698b] shadow-xs"
                : "text-[#75879f] hover:text-slate-900"
            }`}
          >
            My Reading List
          </Link>
        </nav>
      </div>
    </header>
  );
}
