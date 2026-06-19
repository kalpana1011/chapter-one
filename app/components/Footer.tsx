import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-lg text-stone-500">
        <div className="space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="w-9 h-9 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white font-sans font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              CO
            </div>
            <div>
              <h1 className="font-sans font-black text-md tracking-tight text-slate-900 leading-none">
                ChapterOne
              </h1>
              <p className="text-md font-semibold text-indigo-500 tracking-wider uppercase mt-0.5">
                Catalog. Track. Read.
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-stone-500 text-lg border-l border-stone-200 md:pl-6">
          <span className="hover:text-[#8B1E1E] cursor-pointer transition-colors text-lg">
            ©2006, All rights reserved; | Don't try to look at code!
          </span>
        </div>
      </div>
    </footer>
  );
}
