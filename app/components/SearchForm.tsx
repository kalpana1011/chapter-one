"use inline";
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState<string>(searchParams.get("search") || "");

  const handleSearchSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(() => {
      router.push(`/books?search=${encodeURIComponent(query.trim())}&page=1`);
    });
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="w-full max-w-3xl mx-auto mb-10"
    >
      <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, keywords..."
          className="w-full px-3 py-2 bg-transparent text-lg focus:outline-hidden text-slate-800 placeholder:text-[#75879f]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs disabled:opacity-50 cursor-pointer shrink-0"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
