import { OpenLibraryDoc } from "../types";
import BookResultsContent from "./BookResultsContent";

interface BookDataFetcherProps {
  currentSearch: string;
  currentPage: number;
  itemsLimit: number;
}

export default async function BookDataFetcher({
  currentSearch,
  currentPage,
  itemsLimit,
}: BookDataFetcherProps) {
  let books: OpenLibraryDoc[] = [];
  let totalFound = 0;
  let errorMsg = "";

  try {
    const queryUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      currentSearch,
    )}&page=${currentPage}&limit=${itemsLimit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(queryUrl, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Registry network rejected query parameters.");
    }

    const data = await res.json();
    books = data.docs || [];
    totalFound = data.num_found || data.numFound || 0;
  } catch (err) {
    console.error("Open Library Fetch Error:", err);
    errorMsg =
      "The Open Library server is temporarily busy. Please try again in a moment.";
  }

  const totalPages = Math.ceil(totalFound / itemsLimit) || 1;

  return (
    <BookResultsContent
      currentSearch={currentSearch}
      currentPage={currentPage}
      currentLimit={itemsLimit}
      totalPages={totalPages}
      books={books}
      errorMsg={errorMsg}
      totalFound={totalFound}
    />
  );
}
