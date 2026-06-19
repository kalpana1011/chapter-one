import { Suspense } from "react";
import SearchForm from "../components/SearchForm";
import BookResultsSkeleton from "../components/BookResultsSkeleton";
import { SearchPageProps } from "../types";
import BookDataFetcher from "./BookDataFetcher";

export default async function BookPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const currentSearch = resolvedParams.search || "";
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const itemsLimit = Math.max(5, Number(resolvedParams.limit) || 10);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8 bg-white text-slate-900 antialiased">
      <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-slate-900">
            Discover Global Literature
          </h2>
          <p className="text-lg text-[#f35c05] font-bold mt-1">
            Query collections from Open Library.
          </p>
        </div>
      </div>

      <SearchForm />

      {currentSearch ? (
        <Suspense
          key={`${currentSearch}-${currentPage}-${itemsLimit}`}
          fallback={<BookResultsSkeleton />}
        >
          <BookDataFetcher
            currentSearch={currentSearch}
            currentPage={currentPage}
            itemsLimit={itemsLimit}
          />
        </Suspense>
      ) : (
        <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-medium text-md">
          🔍 Type a keyword above to scan the global book index.
        </div>
      )}
    </div>
  );
}
