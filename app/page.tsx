import Link from "next/link";
import BookCard from "./components/BookCard";
import { OpenLibraryDoc } from "./types";

interface HomepageCategory {
  id: string;
  displayName: string;
  apiSearchSlug: string;
}

const LITERARY_CATEGORIES: HomepageCategory[] = [
  {
    id: "thriller",
    displayName: "Thriller & Suspense",
    apiSearchSlug: "thriller",
  },
  {
    id: "comedy",
    displayName: "Humor & Comedy",
    apiSearchSlug: "comedy",
  },
  {
    id: "romance",
    displayName: "Romance & Love",
    apiSearchSlug: "romance",
  },
  {
    id: "drama",
    displayName: "Drama & Classics",
    apiSearchSlug: "drama",
  },
];

async function fetchTopBooksByCategory(
  subject: string,
): Promise<OpenLibraryDoc[]> {
  try {
    const endpointUrl = `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=5`;
    const response = await fetch(endpointUrl, { next: { revalidate: 3600 } });

    if (!response.ok) return [];

    const payload = await response.json();
    const works: OpenLibraryDoc[] = payload.works || [];
    return works;
  } catch (error) {
    console.error(
      `Failed to gather subject data records for: ${subject}`,
      error,
    );
    return [];
  }
}

export default async function HomePage() {
  const fetchedCategoryData = await Promise.all(
    LITERARY_CATEGORIES.map(async (category) => {
      const booksList = await fetchTopBooksByCategory(category.apiSearchSlug);
      return {
        ...category,
        books: booksList,
      };
    }),
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-20 bg-white text-slate-900 antialiased animate-slide-up">
      <section className="w-full bg-[#040b3b] rounded-2xl text-white relative overflow-hidden shadow-lg border border-slate-900/50">
        <div className="px-6 py-14 sm:px-12 sm:py-20 max-w-4xl space-y-6 relative ">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-md uppercase tracking-widest text-[#fe6a45] text-xl">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            Global Book Repository Index
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
            Stories that <br />
            <span className="italic font-extralight text-slate-300">
              shape perspectives.
            </span>
          </h1>

          <p className="text-[#34a6b3] text-xl sm:text-xl font-sans leading-relaxed max-w-2xl">
            Search millions of historical and contemporary volumes via the
            open-source OpenLibrary catalog. Track real-time logs, reviews, and
            personal reading metrics cleanly in one minimal interface.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/books"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 text-lg font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm"
            >
              Search Catalog 🔍
            </Link>
            <Link
              href="/reading-list"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-lg font-semibold uppercase tracking-wider rounded-lg transition-all duration-200"
            >
              My Reading Queue →
            </Link>
          </div>
        </div>
      </section>

      {fetchedCategoryData.map((category) => (
        <section key={category.id} className="space-y-6">
          <div className="flex justify-between items-end border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-700 tracking-tight">
                {category.displayName}
              </h2>
              <p className=" sm:text-lg text-[#34598b] text-xl font-bold">
                Trending collections requested in{" "}
                {category.displayName.toLowerCase()}
              </p>
            </div>

            <Link
              href={`/books?search=${encodeURIComponent(category.apiSearchSlug)}&page=1`}
              className="group flex items-center gap-1 text-md font-bold text-[#02698b] hover:text-indigo-700 transition-colors duration-150"
            >
              Show all
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          {category.books.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl text-[#34598b] text-lg  font-sans italic">
              Synchronizing library records...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8">
              {category.books.map((book) => {
                return (
                  <div
                    key={book.key}
                    className="flex flex-col group justify-between"
                  >
                    <Link
                      href={`/books?search=${encodeURIComponent(book.title)}`}
                      className="block focus:outline-hidden"
                    >
                      <BookCard
                        key={book.key}
                        openLibraryKey={book.key}
                        title={book.title}
                        author={
                          book.author_name
                            ? book.author_name[0]
                            : "Unknown Author"
                        }
                        publishYear={book.first_publish_year || 0}
                        coverId={book.cover_id}
                        showAddToReadingList={false}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
