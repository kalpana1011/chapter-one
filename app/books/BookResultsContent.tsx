"use client";

import Link from "next/link";
import BookCard from "../components/BookCard";
import { OpenLibraryDoc } from "../types";
import PageLimitSelector from "../components/PageLimitSelector";

interface BookResultsContentProps {
  currentSearch: string;
  currentPage: number;
  currentLimit: number;
  totalPages: number;
  totalFound: number;
  books: OpenLibraryDoc[];
  errorMsg: string;
}

export default function BookResultsContent({
  currentSearch,
  currentPage,
  currentLimit,
  totalPages,
  totalFound,
  books,
  errorMsg,
}: BookResultsContentProps) {
  if (errorMsg) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 text-rose-900 rounded-xl text-lg font-semibold max-w-xl mx-auto text-center">
        ⚠️ {errorMsg}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-8">
        <div className="text-md text-[#75879f] font-semibold uppercase tracking-wider">
          Found <span className="text-[#02698b] font-bold">{totalFound}</span>{" "}
          results for &ldquo;{currentSearch}&rdquo;
        </div>

        <div className="flex items-center justify-end">
          <PageLimitSelector currentLimit={currentLimit} baseUrl="/books" />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-xl text-[#75879f] text-lg text-md">
          No matching records identified inside the registry catalogs.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8 mb-12">
          {books.map((book) => (
            <BookCard
              key={book.key}
              openLibraryKey={book.key}
              title={book.title}
              author={book.author_name ? book.author_name[0] : "Unknown Author"}
              publishYear={book.first_publish_year || 0}
              coverId={book.cover_i}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 border-t border-slate-100 pt-8 mt-4">
          <Link
            href={`/books?search=${encodeURIComponent(currentSearch)}&page=${currentPage - 1}&limit=${currentLimit}`}
            className={`px-4 py-2 bg-white border border-slate-200 text-lg font-bold text-slate-700 rounded-lg transition-all hover:bg-slate-50 ${
              currentPage === 1
                ? "pointer-events-none opacity-40 shadow-none"
                : "shadow-2xs"
            }`}
          >
            ← Previous
          </Link>

          <span className="text-lg text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200/50">
            Page {currentPage} of {totalPages}
          </span>

          <Link
            href={`/books?search=${encodeURIComponent(currentSearch)}&page=${currentPage + 1}&limit=${currentLimit}`}
            className={`px-4 py-2 bg-white border border-slate-200 text-lg font-bold text-slate-700 rounded-lg transition-all hover:bg-slate-50 ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-40 shadow-none"
                : "shadow-2xs"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  );
}
